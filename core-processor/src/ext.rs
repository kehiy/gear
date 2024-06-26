// This file is part of Gear.

// Copyright (C) 2021-2024 Gear Technologies Inc.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

use crate::{
    configs::{BlockInfo, PageCosts},
    context::SystemReservationContext,
};
use alloc::{
    collections::{BTreeMap, BTreeSet},
    vec::Vec,
};
use gear_core::{
    costs::{HostFnWeights, RuntimeCosts},
    env::{Externalities, PayloadSliceLock, UnlockPayloadBound},
    env_vars::{EnvVars, EnvVarsV1},
    gas::{
        ChargeError, ChargeResult, CounterType, CountersOwner, GasAllowanceCounter, GasAmount,
        GasCounter, GasLeft, Token, ValueCounter,
    },
    ids::{CodeId, MessageId, ProgramId, ReservationId},
    memory::{
        AllocError, AllocationsContext, GrowHandler, Memory, MemoryError, MemoryInterval, PageBuf,
    },
    message::{
        ContextOutcomeDrain, ContextStore, Dispatch, GasLimit, HandlePacket, InitPacket,
        MessageContext, Packet, ReplyPacket,
    },
    pages::{GearPage, PageNumber, PageU32Size, WasmPage},
    program::MemoryInfix,
    reservation::GasReserver,
};
use gear_core_backend::{
    error::{
        ActorTerminationReason, BackendAllocSyscallError, BackendSyscallError, RunFallibleError,
        TrapExplanation, UndefinedTerminationReason, UnrecoverableExecutionError,
        UnrecoverableExtError as UnrecoverableExtErrorCore, UnrecoverableWaitError,
    },
    BackendExternalities,
};
use gear_core_errors::{
    ExecutionError as FallibleExecutionError, ExtError as FallibleExtErrorCore, MessageError,
    ReplyCode, ReservationError, SignalCode,
};
use gear_lazy_pages_common::{GlobalsAccessConfig, LazyPagesWeights, ProcessAccessError, Status};
use gear_wasm_instrument::syscalls::SyscallName;

/// Processor context.
pub struct ProcessorContext {
    /// Gas counter.
    pub gas_counter: GasCounter,
    /// Gas allowance counter.
    pub gas_allowance_counter: GasAllowanceCounter,
    /// Reserved gas counter.
    pub gas_reserver: GasReserver,
    /// System reservation.
    pub system_reservation: Option<u64>,
    /// Value counter.
    pub value_counter: ValueCounter,
    /// Allocations context.
    pub allocations_context: AllocationsContext,
    /// Message context.
    pub message_context: MessageContext,
    /// Block info.
    pub block_info: BlockInfo,
    /// Performance multiplier.
    pub performance_multiplier: gsys::Percent,
    /// Max allowed wasm memory pages.
    pub max_pages: WasmPage,
    /// Allocations config.
    pub page_costs: PageCosts,
    /// Account existential deposit
    pub existential_deposit: u128,
    /// Current program id
    pub program_id: ProgramId,
    /// Map of code hashes to program ids of future programs, which are planned to be
    /// initialized with the corresponding code (with the same code hash).
    pub program_candidates_data: BTreeMap<CodeId, Vec<(MessageId, ProgramId)>>,
    /// Weights of host functions.
    pub host_fn_weights: HostFnWeights,
    /// Functions forbidden to be called.
    pub forbidden_funcs: BTreeSet<SyscallName>,
    /// Mailbox threshold.
    pub mailbox_threshold: u64,
    /// Cost for single block waitlist holding.
    pub waitlist_cost: u64,
    /// Cost of holding a message in dispatch stash.
    pub dispatch_hold_cost: u64,
    /// Reserve for parameter of scheduling.
    pub reserve_for: u32,
    /// Cost for reservation holding.
    pub reservation: u64,
    /// Output from Randomness.
    pub random_data: (Vec<u8>, u32),
    /// Gas multiplier.
    pub gas_multiplier: gsys::GasMultiplier,
}

#[cfg(any(feature = "mock", test))]
impl ProcessorContext {
    /// Create new mock [`ProcessorContext`] for usage in tests.
    pub fn new_mock() -> ProcessorContext {
        use gear_core::message::IncomingDispatch;

        ProcessorContext {
            gas_counter: GasCounter::new(0),
            gas_allowance_counter: GasAllowanceCounter::new(0),
            gas_reserver: GasReserver::new(
                &<IncomingDispatch as Default>::default(),
                Default::default(),
                Default::default(),
            ),
            system_reservation: None,
            value_counter: ValueCounter::new(0),
            allocations_context: AllocationsContext::new(
                Default::default(),
                Default::default(),
                Default::default(),
            ),
            message_context: MessageContext::new(
                Default::default(),
                Default::default(),
                Default::default(),
            )
            .unwrap(),
            block_info: Default::default(),
            performance_multiplier: gsys::Percent::new(100),
            max_pages: 512.into(),
            page_costs: Default::default(),
            existential_deposit: 0,
            program_id: Default::default(),
            program_candidates_data: Default::default(),
            host_fn_weights: Default::default(),
            forbidden_funcs: Default::default(),
            mailbox_threshold: 0,
            waitlist_cost: 0,
            dispatch_hold_cost: 0,
            reserve_for: 0,
            reservation: 0,
            random_data: ([0u8; 32].to_vec(), 0),
            gas_multiplier: gsys::GasMultiplier::from_value_per_gas(1),
        }
    }
}

#[derive(Debug)]
pub struct ExtInfo {
    pub gas_amount: GasAmount,
    pub gas_reserver: GasReserver,
    pub system_reservation_context: SystemReservationContext,
    pub allocations: BTreeSet<WasmPage>,
    pub pages_data: BTreeMap<GearPage, PageBuf>,
    pub generated_dispatches: Vec<(Dispatch, u32, Option<ReservationId>)>,
    pub awakening: Vec<(MessageId, u32)>,
    pub reply_deposits: Vec<(MessageId, u64)>,
    pub program_candidates_data: BTreeMap<CodeId, Vec<(MessageId, ProgramId)>>,
    pub context_store: ContextStore,
    pub reply_sent: bool,
}

/// Trait to which ext must have to work in processor wasm executor.
/// Currently used only for lazy-pages support.
pub trait ProcessorExternalities {
    /// Create new
    fn new(context: ProcessorContext) -> Self;

    /// Convert externalities into info.
    fn into_ext_info(self, memory: &impl Memory) -> Result<ExtInfo, MemoryError>;

    /// Protect and save storage keys for pages which has no data
    fn lazy_pages_init_for_program(
        mem: &mut impl Memory,
        prog_id: ProgramId,
        memory_infix: MemoryInfix,
        stack_end: Option<WasmPage>,
        globals_config: GlobalsAccessConfig,
        lazy_pages_weights: LazyPagesWeights,
    );

    /// Lazy pages program post execution actions
    fn lazy_pages_post_execution_actions(mem: &mut impl Memory);

    /// Returns lazy pages status
    fn lazy_pages_status() -> Status;
}

/// Infallible API error.
#[derive(Debug, Clone, Eq, PartialEq, derive_more::From)]
pub enum UnrecoverableExtError {
    /// Basic error
    Core(UnrecoverableExtErrorCore),
    /// Charge error
    Charge(ChargeError),
}

impl From<UnrecoverableExecutionError> for UnrecoverableExtError {
    fn from(err: UnrecoverableExecutionError) -> UnrecoverableExtError {
        Self::Core(UnrecoverableExtErrorCore::from(err))
    }
}

impl From<UnrecoverableWaitError> for UnrecoverableExtError {
    fn from(err: UnrecoverableWaitError) -> UnrecoverableExtError {
        Self::Core(UnrecoverableExtErrorCore::from(err))
    }
}

impl BackendSyscallError for UnrecoverableExtError {
    fn into_termination_reason(self) -> UndefinedTerminationReason {
        match self {
            UnrecoverableExtError::Core(err) => {
                ActorTerminationReason::Trap(TrapExplanation::UnrecoverableExt(err)).into()
            }
            UnrecoverableExtError::Charge(err) => err.into(),
        }
    }

    fn into_run_fallible_error(self) -> RunFallibleError {
        RunFallibleError::UndefinedTerminationReason(self.into_termination_reason())
    }
}

/// Fallible API error.
#[derive(Debug, Clone, Eq, PartialEq, derive_more::From)]
pub enum FallibleExtError {
    /// Basic error
    Core(FallibleExtErrorCore),
    /// An error occurs in attempt to call forbidden syscall.
    ForbiddenFunction,
    /// Charge error
    Charge(ChargeError),
}

impl From<MessageError> for FallibleExtError {
    fn from(err: MessageError) -> Self {
        Self::Core(FallibleExtErrorCore::Message(err))
    }
}

impl From<FallibleExecutionError> for FallibleExtError {
    fn from(err: FallibleExecutionError) -> Self {
        Self::Core(FallibleExtErrorCore::Execution(err))
    }
}

impl From<ReservationError> for FallibleExtError {
    fn from(err: ReservationError) -> Self {
        Self::Core(FallibleExtErrorCore::Reservation(err))
    }
}

impl From<FallibleExtError> for RunFallibleError {
    fn from(err: FallibleExtError) -> Self {
        match err {
            FallibleExtError::Core(err) => RunFallibleError::FallibleExt(err),
            FallibleExtError::ForbiddenFunction => {
                RunFallibleError::UndefinedTerminationReason(UndefinedTerminationReason::Actor(
                    ActorTerminationReason::Trap(TrapExplanation::ForbiddenFunction),
                ))
            }
            FallibleExtError::Charge(err) => {
                RunFallibleError::UndefinedTerminationReason(UndefinedTerminationReason::from(err))
            }
        }
    }
}

/// [`Ext`](Ext)'s memory management (calls to allocate and free) error.
#[derive(Debug, Clone, Eq, PartialEq, derive_more::Display, derive_more::From)]
pub enum AllocExtError {
    /// Charge error
    #[display(fmt = "{_0}")]
    Charge(ChargeError),
    /// Allocation error
    #[display(fmt = "{_0}")]
    Alloc(AllocError),
}

impl BackendAllocSyscallError for AllocExtError {
    type ExtError = UnrecoverableExtError;

    fn into_backend_error(self) -> Result<Self::ExtError, Self> {
        match self {
            Self::Charge(err) => Ok(err.into()),
            err => Err(err),
        }
    }
}

struct LazyGrowHandler {
    old_mem_addr: Option<u64>,
    old_mem_size: WasmPage,
}

impl GrowHandler for LazyGrowHandler {
    fn before_grow_action(mem: &mut impl Memory) -> Self {
        // New pages allocation may change wasm memory buffer location.
        // So we remove protections from lazy-pages
        // and then in `after_grow_action` we set protection back for new wasm memory buffer.
        let old_mem_addr = mem.get_buffer_host_addr();
        gear_lazy_pages_interface::remove_lazy_pages_prot(mem);
        Self {
            old_mem_addr,
            old_mem_size: mem.size(),
        }
    }

    fn after_grow_action(self, mem: &mut impl Memory) {
        // Add new allocations to lazy pages.
        // Protect all lazy pages including new allocations.
        let new_mem_addr = mem.get_buffer_host_addr().unwrap_or_else(|| {
            unreachable!("Memory size cannot be zero after grow is applied for memory")
        });
        gear_lazy_pages_interface::update_lazy_pages_and_protect_again(
            mem,
            self.old_mem_addr,
            self.old_mem_size,
            new_mem_addr,
        );
    }
}

/// Structure providing externalities for running host functions.
pub struct Ext {
    /// Processor context.
    pub context: ProcessorContext,
    /// Actual gas counter type within wasm module's global.
    pub current_counter: CounterType,
    // Counter of outgoing gasless messages.
    //
    // It's temporary field, used to solve `core-audit/issue#22`.
    outgoing_gasless: u64,
}

/// Empty implementation for non-substrate (and non-lazy-pages) using
impl ProcessorExternalities for Ext {
    fn new(context: ProcessorContext) -> Self {
        let current_counter = if context.gas_counter.left() <= context.gas_allowance_counter.left()
        {
            CounterType::GasLimit
        } else {
            CounterType::GasAllowance
        };

        Self {
            context,
            current_counter,
            outgoing_gasless: 0,
        }
    }

    fn into_ext_info(self, memory: &impl Memory) -> Result<ExtInfo, MemoryError> {
        let ProcessorContext {
            allocations_context,
            message_context,
            gas_counter,
            gas_reserver,
            system_reservation,
            program_candidates_data,
            ..
        } = self.context;

        let (static_pages, initial_allocations, allocations) = allocations_context.into_parts();

        // Accessed pages are all pages, that had been released and are in allocations set or static.
        let mut accessed_pages = gear_lazy_pages_interface::get_write_accessed_pages();
        accessed_pages.retain(|p| {
            let wasm_page = p.to_page();
            wasm_page < static_pages || allocations.contains(&wasm_page)
        });
        log::trace!("accessed pages numbers = {:?}", accessed_pages);

        let mut pages_data = BTreeMap::new();
        for page in accessed_pages {
            let mut buf = PageBuf::new_zeroed();
            memory.read(page.offset(), &mut buf)?;
            pages_data.insert(page, buf);
        }

        let (outcome, mut context_store) = message_context.drain();
        let ContextOutcomeDrain {
            outgoing_dispatches: generated_dispatches,
            awakening,
            reply_deposits,
            reply_sent,
        } = outcome.drain();

        let system_reservation_context = SystemReservationContext {
            current_reservation: system_reservation,
            previous_reservation: context_store.system_reservation(),
        };

        context_store.set_reservation_nonce(&gas_reserver);
        if let Some(reservation) = system_reservation {
            context_store.add_system_reservation(reservation);
        }

        let info = ExtInfo {
            gas_amount: gas_counter.to_amount(),
            gas_reserver,
            system_reservation_context,
            allocations: (allocations != initial_allocations)
                .then_some(allocations)
                .unwrap_or_default(),
            pages_data,
            generated_dispatches,
            awakening,
            reply_deposits,
            context_store,
            program_candidates_data,
            reply_sent,
        };
        Ok(info)
    }

    fn lazy_pages_init_for_program(
        mem: &mut impl Memory,
        prog_id: ProgramId,
        memory_infix: MemoryInfix,
        stack_end: Option<WasmPage>,
        globals_config: GlobalsAccessConfig,
        lazy_pages_weights: LazyPagesWeights,
    ) {
        gear_lazy_pages_interface::init_for_program(
            mem,
            prog_id,
            memory_infix,
            stack_end,
            globals_config,
            lazy_pages_weights,
        );
    }

    fn lazy_pages_post_execution_actions(mem: &mut impl Memory) {
        gear_lazy_pages_interface::remove_lazy_pages_prot(mem);
    }

    fn lazy_pages_status() -> Status {
        gear_lazy_pages_interface::get_status()
    }
}

impl BackendExternalities for Ext {
    fn gas_amount(&self) -> GasAmount {
        self.context.gas_counter.to_amount()
    }

    fn pre_process_memory_accesses(
        reads: &[MemoryInterval],
        writes: &[MemoryInterval],
        gas_counter: &mut u64,
    ) -> Result<(), ProcessAccessError> {
        gear_lazy_pages_interface::pre_process_memory_accesses(reads, writes, gas_counter)
    }
}

impl Ext {
    fn check_message_value(&mut self, message_value: u128) -> Result<(), FallibleExtError> {
        let existential_deposit = self.context.existential_deposit;
        // Sending value should apply the range {0} ∪ [existential_deposit; +inf)
        if message_value != 0 && message_value < existential_deposit {
            Err(MessageError::InsufficientValue.into())
        } else {
            Ok(())
        }
    }

    fn check_gas_limit(
        &mut self,
        gas_limit: Option<GasLimit>,
    ) -> Result<GasLimit, FallibleExtError> {
        let mailbox_threshold = self.context.mailbox_threshold;
        let gas_limit = gas_limit.unwrap_or(0);

        // Sending gas should apply the range {0} ∪ [mailbox_threshold; +inf)
        if gas_limit < mailbox_threshold && gas_limit != 0 {
            Err(MessageError::InsufficientGasLimit.into())
        } else {
            Ok(gas_limit)
        }
    }

    /// Checking that reservation could be charged for
    /// dispatch stash with given delay.
    fn check_reservation_gas_limit_for_delayed_sending(
        &mut self,
        reservation_id: &ReservationId,
        delay: u32,
    ) -> Result<(), FallibleExtError> {
        if delay != 0 {
            let limit = self
                .context
                .gas_reserver
                .limit_of(reservation_id)
                .ok_or(ReservationError::InvalidReservationId)?;

            // Take delay and get cost of block.
            // reserve = wait_cost * (delay + reserve_for).
            let cost_per_block = self.context.dispatch_hold_cost;
            let waiting_reserve = (self.context.reserve_for as u64)
                .saturating_add(delay as u64)
                .saturating_mul(cost_per_block);

            if limit < waiting_reserve {
                return Err(MessageError::InsufficientGasForDelayedSending.into());
            }
        }

        Ok(())
    }

    fn reduce_gas(&mut self, gas_limit: GasLimit) -> Result<(), FallibleExtError> {
        if self.context.gas_counter.reduce(gas_limit) != ChargeResult::Enough {
            Err(FallibleExecutionError::NotEnoughGas.into())
        } else {
            Ok(())
        }
    }

    fn charge_message_value(&mut self, message_value: u128) -> Result<(), FallibleExtError> {
        if self.context.value_counter.reduce(message_value) != ChargeResult::Enough {
            Err(FallibleExecutionError::NotEnoughValue.into())
        } else {
            Ok(())
        }
    }

    // It's temporary fn, used to solve `core-audit/issue#22`.
    fn safe_gasfull_sends<T: Packet>(
        &mut self,
        packet: &T,
        delay: u32,
    ) -> Result<(), FallibleExtError> {
        // In case of delayed sending from origin message we keep some gas
        // for it while processing outgoing sending notes so gas for
        // previously gasless sends should appear to prevent their
        // invasion for gas for storing delayed message.
        match (packet.gas_limit(), delay != 0) {
            // Zero gasfull instant.
            //
            // In this case there is nothing to do.
            (Some(0), false) => {}

            // Any non-zero gasfull or zero gasfull with delay.
            //
            // In case of zero gasfull with delay it's pretty similar to
            // gasless with delay case.
            //
            // In case of any non-zero gasfull we prevent stealing for any
            // previous gasless-es's thresholds from gas supposed to be
            // sent with this `packet`.
            (Some(_), _) => {
                let prev_gasless_fee = self
                    .outgoing_gasless
                    .saturating_mul(self.context.mailbox_threshold);

                self.reduce_gas(prev_gasless_fee)?;

                self.outgoing_gasless = 0;
            }

            // Gasless with delay.
            //
            // In this case we must give threshold for each uncovered gasless-es
            // sent, otherwise they will steal gas from this `packet` that was
            // supposed to pay for delay.
            //
            // It doesn't guarantee threshold for itself.
            (None, true) => {
                let prev_gasless_fee = self
                    .outgoing_gasless
                    .saturating_mul(self.context.mailbox_threshold);

                self.reduce_gas(prev_gasless_fee)?;

                self.outgoing_gasless = 1;
            }

            // Gasless instant.
            //
            // In this case there is no need to give any thresholds for previous
            // gasless-es: only counter should be increased.
            (None, false) => self.outgoing_gasless = self.outgoing_gasless.saturating_add(1),
        };

        Ok(())
    }

    fn charge_expiring_resources<T: Packet>(
        &mut self,
        packet: &T,
        check_gas_limit: bool,
    ) -> Result<(), FallibleExtError> {
        self.check_message_value(packet.value())?;
        // Charge for using expiring resources. Charge for calling syscall was done earlier.
        let gas_limit = if check_gas_limit {
            self.check_gas_limit(packet.gas_limit())?
        } else {
            packet.gas_limit().unwrap_or(0)
        };
        self.reduce_gas(gas_limit)?;
        self.charge_message_value(packet.value())?;
        Ok(())
    }

    fn check_forbidden_destination(&mut self, id: ProgramId) -> Result<(), FallibleExtError> {
        if id == ProgramId::SYSTEM {
            Err(FallibleExtError::ForbiddenFunction)
        } else {
            Ok(())
        }
    }

    fn charge_sending_fee(&mut self, delay: u32) -> Result<(), ChargeError> {
        if delay == 0 {
            self.charge_gas_if_enough(self.context.message_context.settings().sending_fee)
        } else {
            self.charge_gas_if_enough(
                self.context
                    .message_context
                    .settings()
                    .scheduled_sending_fee,
            )
        }
    }

    fn charge_for_dispatch_stash_hold(&mut self, delay: u32) -> Result<(), FallibleExtError> {
        if delay != 0 {
            // Take delay and get cost of block.
            // reserve = wait_cost * (delay + reserve_for).
            let cost_per_block = self.context.dispatch_hold_cost;
            let waiting_reserve = (self.context.reserve_for as u64)
                .saturating_add(delay as u64)
                .saturating_mul(cost_per_block);

            // Reduce gas for block waiting in dispatch stash.
            if self.context.gas_counter.reduce(waiting_reserve) != ChargeResult::Enough {
                return Err(MessageError::InsufficientGasForDelayedSending.into());
            }
        }

        Ok(())
    }

    fn charge_gas_if_enough(
        gas_counter: &mut GasCounter,
        gas_allowance_counter: &mut GasAllowanceCounter,
        amount: u64,
    ) -> Result<(), ChargeError> {
        if gas_counter.charge_if_enough(amount) != ChargeResult::Enough {
            return Err(ChargeError::GasLimitExceeded);
        }
        if gas_allowance_counter.charge_if_enough(amount) != ChargeResult::Enough {
            // Here might be refunds for gas counter, but it's meaningless since
            // on gas allowance exceed we totally roll up the message and give
            // it another try in next block with the same initial resources.
            return Err(ChargeError::GasAllowanceExceeded);
        }
        Ok(())
    }
}

impl CountersOwner for Ext {
    fn charge_gas_runtime(&mut self, cost: RuntimeCosts) -> Result<(), ChargeError> {
        let token = cost.token(&self.context.host_fn_weights);
        let common_charge = self.context.gas_counter.charge(token);
        let allowance_charge = self.context.gas_allowance_counter.charge(token);
        match (common_charge, allowance_charge) {
            (ChargeResult::NotEnough, _) => Err(ChargeError::GasLimitExceeded),
            (ChargeResult::Enough, ChargeResult::NotEnough) => {
                Err(ChargeError::GasAllowanceExceeded)
            }
            (ChargeResult::Enough, ChargeResult::Enough) => Ok(()),
        }
    }

    fn charge_gas_runtime_if_enough(&mut self, cost: RuntimeCosts) -> Result<(), ChargeError> {
        let amount = cost.token(&self.context.host_fn_weights).weight();
        self.charge_gas_if_enough(amount)
    }

    fn charge_gas_if_enough(&mut self, amount: u64) -> Result<(), ChargeError> {
        Ext::charge_gas_if_enough(
            &mut self.context.gas_counter,
            &mut self.context.gas_allowance_counter,
            amount,
        )
    }

    fn gas_left(&self) -> GasLeft {
        (
            self.context.gas_counter.left(),
            self.context.gas_allowance_counter.left(),
        )
            .into()
    }

    fn current_counter_type(&self) -> CounterType {
        self.current_counter
    }

    fn decrease_current_counter_to(&mut self, amount: u64) {
        // For possible cases of non-atomic charges on backend side when global
        // value is less than appropriate at the backend.
        //
        // Example:
        // * While executing program calls some syscall.
        // * Syscall ends up with unrecoverable error - gas limit exceeded.
        // * We have to charge it so we leave backend and whole execution with 0 inner counter.
        // * Meanwhile global is not zero, so for this case we have to skip decreasing.
        if self.current_counter_value() <= amount {
            log::trace!("Skipped decrease to global value");
            return;
        }

        let GasLeft { gas, allowance } = self.gas_left();

        let diff = match self.current_counter_type() {
            CounterType::GasLimit => gas.checked_sub(amount),
            CounterType::GasAllowance => allowance.checked_sub(amount),
        }
        .unwrap_or_else(|| unreachable!("Checked above"));

        if self.context.gas_counter.charge(diff) == ChargeResult::NotEnough {
            unreachable!("Tried to set gas limit left bigger than before")
        }

        if self.context.gas_allowance_counter.charge(diff) == ChargeResult::NotEnough {
            unreachable!("Tried to set gas allowance left bigger than before")
        }
    }

    fn define_current_counter(&mut self) -> u64 {
        let GasLeft { gas, allowance } = self.gas_left();

        if gas <= allowance {
            self.current_counter = CounterType::GasLimit;
            gas
        } else {
            self.current_counter = CounterType::GasAllowance;
            allowance
        }
    }
}

impl Externalities for Ext {
    type UnrecoverableError = UnrecoverableExtError;
    type FallibleError = FallibleExtError;
    type AllocError = AllocExtError;

    fn alloc(
        &mut self,
        pages_num: u32,
        mem: &mut impl Memory,
    ) -> Result<WasmPage, Self::AllocError> {
        let pages = WasmPage::new(pages_num).map_err(|_| AllocError::ProgramAllocOutOfBounds)?;

        self.context
            .allocations_context
            .alloc::<LazyGrowHandler>(pages, mem, |pages| {
                Ext::charge_gas_if_enough(
                    &mut self.context.gas_counter,
                    &mut self.context.gas_allowance_counter,
                    self.context.page_costs.mem_grow.calc(pages),
                )
            })
            .map_err(Into::into)
    }

    fn free(&mut self, page: WasmPage) -> Result<(), Self::AllocError> {
        self.context
            .allocations_context
            .free(page)
            .map_err(Into::into)
    }

    fn free_range(&mut self, start: WasmPage, end: WasmPage) -> Result<(), Self::AllocError> {
        let page_count: u32 = end
            .checked_sub(start)
            .ok_or(AllocExtError::Alloc(AllocError::InvalidFreeRange(
                start.into(),
                end.into(),
            )))?
            .into();

        Ext::charge_gas_if_enough(
            &mut self.context.gas_counter,
            &mut self.context.gas_allowance_counter,
            self.context
                .host_fn_weights
                .free_range_per_page
                .saturating_mul(page_count as u64),
        )?;

        self.context
            .allocations_context
            .free_range(start..=end)
            .map_err(Into::into)
    }

    fn env_vars(&self, version: u32) -> Result<EnvVars, Self::UnrecoverableError> {
        match version {
            1 => Ok(EnvVars::V1(EnvVarsV1 {
                performance_multiplier: self.context.performance_multiplier,
                existential_deposit: self.context.existential_deposit,
                mailbox_threshold: self.context.mailbox_threshold,
                gas_multiplier: self.context.gas_multiplier,
            })),
            _ => Err(UnrecoverableExecutionError::UnsupportedEnvVarsVersion.into()),
        }
    }

    fn block_height(&self) -> Result<u32, Self::UnrecoverableError> {
        Ok(self.context.block_info.height)
    }

    fn block_timestamp(&self) -> Result<u64, Self::UnrecoverableError> {
        Ok(self.context.block_info.timestamp)
    }

    fn send_init(&mut self) -> Result<u32, Self::FallibleError> {
        let handle = self.context.message_context.send_init()?;
        Ok(handle)
    }

    fn send_push(&mut self, handle: u32, buffer: &[u8]) -> Result<(), Self::FallibleError> {
        self.context.message_context.send_push(handle, buffer)?;
        Ok(())
    }

    fn send_push_input(
        &mut self,
        handle: u32,
        offset: u32,
        len: u32,
    ) -> Result<(), Self::FallibleError> {
        let range = self.context.message_context.check_input_range(offset, len);
        self.charge_gas_runtime_if_enough(RuntimeCosts::SendPushInputPerByte(range.len()))?;

        self.context
            .message_context
            .send_push_input(handle, range)?;

        Ok(())
    }

    fn send_commit(
        &mut self,
        handle: u32,
        msg: HandlePacket,
        delay: u32,
    ) -> Result<MessageId, Self::FallibleError> {
        self.check_forbidden_destination(msg.destination())?;
        self.safe_gasfull_sends(&msg, delay)?;
        self.charge_expiring_resources(&msg, true)?;
        self.charge_sending_fee(delay)?;
        self.charge_for_dispatch_stash_hold(delay)?;

        let msg_id = self
            .context
            .message_context
            .send_commit(handle, msg, delay, None)?;

        Ok(msg_id)
    }

    fn reservation_send_commit(
        &mut self,
        id: ReservationId,
        handle: u32,
        msg: HandlePacket,
        delay: u32,
    ) -> Result<MessageId, Self::FallibleError> {
        self.check_forbidden_destination(msg.destination())?;
        self.check_message_value(msg.value())?;
        // TODO: unify logic around different source of gas (may be origin msg,
        // or reservation) in order to implement #1828.
        self.check_reservation_gas_limit_for_delayed_sending(&id, delay)?;
        // TODO: gasful sending (#1828)
        self.charge_message_value(msg.value())?;
        self.charge_sending_fee(delay)?;

        self.context.gas_reserver.mark_used(id)?;

        let msg_id = self
            .context
            .message_context
            .send_commit(handle, msg, delay, Some(id))?;
        Ok(msg_id)
    }

    fn reply_push(&mut self, buffer: &[u8]) -> Result<(), Self::FallibleError> {
        self.context.message_context.reply_push(buffer)?;
        Ok(())
    }

    // TODO: Consider per byte charge (issue #2255).
    fn reply_commit(&mut self, msg: ReplyPacket) -> Result<MessageId, Self::FallibleError> {
        self.check_forbidden_destination(self.context.message_context.reply_destination())?;
        self.safe_gasfull_sends(&msg, 0)?;
        self.charge_expiring_resources(&msg, false)?;
        self.charge_sending_fee(0)?;

        let msg_id = self.context.message_context.reply_commit(msg, None)?;
        Ok(msg_id)
    }

    fn reservation_reply_commit(
        &mut self,
        id: ReservationId,
        msg: ReplyPacket,
    ) -> Result<MessageId, Self::FallibleError> {
        self.check_forbidden_destination(self.context.message_context.reply_destination())?;
        self.check_message_value(msg.value())?;
        // TODO: gasful sending (#1828)
        self.charge_message_value(msg.value())?;
        self.charge_sending_fee(0)?;

        self.context.gas_reserver.mark_used(id)?;

        let msg_id = self.context.message_context.reply_commit(msg, Some(id))?;
        Ok(msg_id)
    }

    fn reply_to(&self) -> Result<MessageId, Self::FallibleError> {
        self.context
            .message_context
            .current()
            .details()
            .and_then(|d| d.to_reply_details().map(|d| d.to_message_id()))
            .ok_or_else(|| FallibleExecutionError::NoReplyContext.into())
    }

    fn signal_from(&self) -> Result<MessageId, Self::FallibleError> {
        self.context
            .message_context
            .current()
            .details()
            .and_then(|d| d.to_signal_details().map(|d| d.to_message_id()))
            .ok_or_else(|| FallibleExecutionError::NoSignalContext.into())
    }

    fn reply_push_input(&mut self, offset: u32, len: u32) -> Result<(), Self::FallibleError> {
        let range = self.context.message_context.check_input_range(offset, len);
        self.charge_gas_runtime_if_enough(RuntimeCosts::ReplyPushInputPerByte(range.len()))?;

        self.context.message_context.reply_push_input(range)?;

        Ok(())
    }

    fn source(&self) -> Result<ProgramId, Self::UnrecoverableError> {
        Ok(self.context.message_context.current().source())
    }

    fn reply_code(&self) -> Result<ReplyCode, Self::FallibleError> {
        self.context
            .message_context
            .current()
            .details()
            .and_then(|d| d.to_reply_details().map(|d| d.to_reply_code()))
            .ok_or_else(|| FallibleExecutionError::NoReplyContext.into())
    }

    fn signal_code(&self) -> Result<SignalCode, Self::FallibleError> {
        self.context
            .message_context
            .current()
            .details()
            .and_then(|d| d.to_signal_details().map(|d| d.to_signal_code()))
            .ok_or_else(|| FallibleExecutionError::NoSignalContext.into())
    }

    fn message_id(&self) -> Result<MessageId, Self::UnrecoverableError> {
        Ok(self.context.message_context.current().id())
    }

    fn program_id(&self) -> Result<ProgramId, Self::UnrecoverableError> {
        Ok(self.context.program_id)
    }

    fn debug(&self, data: &str) -> Result<(), Self::UnrecoverableError> {
        let program_id = self.program_id()?;
        let message_id = self.message_id()?;

        log::debug!(target: "gwasm", "DEBUG: [handle({message_id:.2?})] {program_id:.2?}: {data}");

        Ok(())
    }

    fn lock_payload(&mut self, at: u32, len: u32) -> Result<PayloadSliceLock, Self::FallibleError> {
        let end = at
            .checked_add(len)
            .ok_or(FallibleExecutionError::TooBigReadLen)?;
        self.charge_gas_runtime_if_enough(RuntimeCosts::ReadPerByte(len))?;
        PayloadSliceLock::try_new((at, end), &mut self.context.message_context)
            .ok_or_else(|| FallibleExecutionError::ReadWrongRange.into())
    }

    fn unlock_payload(&mut self, payload_holder: &mut PayloadSliceLock) -> UnlockPayloadBound {
        UnlockPayloadBound::from((&mut self.context.message_context, payload_holder))
    }

    fn size(&self) -> Result<usize, Self::UnrecoverableError> {
        Ok(self.context.message_context.current().payload_bytes().len())
    }

    fn reserve_gas(
        &mut self,
        amount: u64,
        duration: u32,
    ) -> Result<ReservationId, Self::FallibleError> {
        self.charge_gas_if_enough(self.context.message_context.settings().reservation_fee)?;

        if duration == 0 {
            return Err(ReservationError::ZeroReservationDuration.into());
        }

        if amount < self.context.mailbox_threshold {
            return Err(ReservationError::ReservationBelowMailboxThreshold.into());
        }

        let reserve = u64::from(self.context.reserve_for.saturating_add(duration))
            .saturating_mul(self.context.reservation);
        let reduce_amount = amount.saturating_add(reserve);
        if self.context.gas_counter.reduce(reduce_amount) == ChargeResult::NotEnough {
            return Err(FallibleExecutionError::NotEnoughGas.into());
        }

        let id = self.context.gas_reserver.reserve(amount, duration)?;

        Ok(id)
    }

    fn unreserve_gas(&mut self, id: ReservationId) -> Result<u64, Self::FallibleError> {
        let amount = self.context.gas_reserver.unreserve(id)?;

        // This statement is like an op that increases "left" counter, but do not affect "burned" counter,
        // because we don't actually refund, we just rise "left" counter during unreserve
        // and it won't affect gas allowance counter because we don't make any actual calculations
        // TODO: uncomment when unreserving in current message features is discussed
        /*if !self.context.gas_counter.increase(amount) {
            return Err(some_charge_error.into());
        }*/

        Ok(amount)
    }

    fn system_reserve_gas(&mut self, amount: u64) -> Result<(), Self::FallibleError> {
        // TODO: use `NonZeroU64` after issue #1838 is fixed
        if amount == 0 {
            return Err(ReservationError::ZeroReservationAmount.into());
        }

        if self.context.gas_counter.reduce(amount) == ChargeResult::NotEnough {
            return Err(FallibleExecutionError::NotEnoughGas.into());
        }

        let reservation = &mut self.context.system_reservation;
        *reservation = reservation
            .map(|reservation| reservation.saturating_add(amount))
            .or(Some(amount));

        Ok(())
    }

    fn gas_available(&self) -> Result<u64, Self::UnrecoverableError> {
        Ok(self.context.gas_counter.left())
    }

    fn value(&self) -> Result<u128, Self::UnrecoverableError> {
        Ok(self.context.message_context.current().value())
    }

    fn value_available(&self) -> Result<u128, Self::UnrecoverableError> {
        Ok(self.context.value_counter.left())
    }

    fn wait(&mut self) -> Result<(), Self::UnrecoverableError> {
        self.charge_gas_if_enough(self.context.message_context.settings().waiting_fee)?;

        if self.context.message_context.reply_sent() {
            return Err(UnrecoverableWaitError::WaitAfterReply.into());
        }

        let reserve = u64::from(self.context.reserve_for.saturating_add(1))
            .saturating_mul(self.context.waitlist_cost);

        if self.context.gas_counter.reduce(reserve) != ChargeResult::Enough {
            return Err(UnrecoverableExecutionError::NotEnoughGas.into());
        }

        Ok(())
    }

    fn wait_for(&mut self, duration: u32) -> Result<(), Self::UnrecoverableError> {
        self.charge_gas_if_enough(self.context.message_context.settings().waiting_fee)?;

        if self.context.message_context.reply_sent() {
            return Err(UnrecoverableWaitError::WaitAfterReply.into());
        }

        if duration == 0 {
            return Err(UnrecoverableWaitError::ZeroDuration.into());
        }

        let reserve = u64::from(self.context.reserve_for.saturating_add(duration))
            .saturating_mul(self.context.waitlist_cost);

        if self.context.gas_counter.reduce(reserve) != ChargeResult::Enough {
            return Err(UnrecoverableExecutionError::NotEnoughGas.into());
        }

        Ok(())
    }

    fn wait_up_to(&mut self, duration: u32) -> Result<bool, Self::UnrecoverableError> {
        self.charge_gas_if_enough(self.context.message_context.settings().waiting_fee)?;

        if self.context.message_context.reply_sent() {
            return Err(UnrecoverableWaitError::WaitAfterReply.into());
        }

        if duration == 0 {
            return Err(UnrecoverableWaitError::ZeroDuration.into());
        }

        let reserve = u64::from(self.context.reserve_for.saturating_add(1))
            .saturating_mul(self.context.waitlist_cost);

        if self.context.gas_counter.reduce(reserve) != ChargeResult::Enough {
            return Err(UnrecoverableExecutionError::NotEnoughGas.into());
        }

        let reserve_full = u64::from(self.context.reserve_for.saturating_add(duration))
            .saturating_mul(self.context.waitlist_cost);
        let reserve_diff = reserve_full - reserve;

        Ok(self.context.gas_counter.reduce(reserve_diff) == ChargeResult::Enough)
    }

    fn wake(&mut self, waker_id: MessageId, delay: u32) -> Result<(), Self::FallibleError> {
        self.charge_gas_if_enough(self.context.message_context.settings().waking_fee)?;

        self.context.message_context.wake(waker_id, delay)?;
        Ok(())
    }

    fn create_program(
        &mut self,
        packet: InitPacket,
        delay: u32,
    ) -> Result<(MessageId, ProgramId), Self::FallibleError> {
        // We don't check for forbidden destination here, since dest is always unique and almost impossible to match SYSTEM_ID
        self.safe_gasfull_sends(&packet, delay)?;
        self.charge_expiring_resources(&packet, true)?;
        self.charge_sending_fee(delay)?;
        self.charge_for_dispatch_stash_hold(delay)?;

        let code_hash = packet.code_id();

        // Send a message for program creation
        let (mid, pid) = self
            .context
            .message_context
            .init_program(packet, delay)
            .map(|(init_msg_id, new_prog_id)| {
                // Save a program candidate for this run
                let entry = self
                    .context
                    .program_candidates_data
                    .entry(code_hash)
                    .or_default();
                entry.push((init_msg_id, new_prog_id));

                (init_msg_id, new_prog_id)
            })?;
        Ok((mid, pid))
    }

    fn reply_deposit(
        &mut self,
        message_id: MessageId,
        amount: u64,
    ) -> Result<(), Self::FallibleError> {
        self.reduce_gas(amount)?;

        self.context
            .message_context
            .reply_deposit(message_id, amount)?;

        Ok(())
    }

    fn random(&self) -> Result<(&[u8], u32), Self::UnrecoverableError> {
        Ok((&self.context.random_data.0, self.context.random_data.1))
    }

    fn forbidden_funcs(&self) -> &BTreeSet<SyscallName> {
        &self.context.forbidden_funcs
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use alloc::vec;
    use gear_core::message::{ContextSettings, IncomingDispatch, Payload, MAX_PAYLOAD_SIZE};

    struct MessageContextBuilder {
        incoming_dispatch: IncomingDispatch,
        program_id: ProgramId,
        context_settings: ContextSettings,
    }

    impl MessageContextBuilder {
        fn new() -> Self {
            Self {
                incoming_dispatch: Default::default(),
                program_id: Default::default(),
                context_settings: ContextSettings::with_outgoing_limits(u32::MAX, u32::MAX),
            }
        }

        fn build(self) -> MessageContext {
            MessageContext::new(
                self.incoming_dispatch,
                self.program_id,
                self.context_settings,
            )
            .unwrap()
        }

        fn with_outgoing_limit(mut self, outgoing_limit: u32) -> Self {
            self.context_settings.outgoing_limit = outgoing_limit;

            self
        }
    }

    struct ProcessorContextBuilder(ProcessorContext);

    impl ProcessorContextBuilder {
        fn new() -> Self {
            Self(ProcessorContext {
                page_costs: PageCosts::new_for_tests(),
                ..ProcessorContext::new_mock()
            })
        }

        fn build(self) -> ProcessorContext {
            self.0
        }

        fn with_message_context(mut self, context: MessageContext) -> Self {
            self.0.message_context = context;

            self
        }

        fn with_gas(mut self, gas_counter: GasCounter) -> Self {
            self.0.gas_counter = gas_counter;

            self
        }

        fn with_allowance(mut self, gas_allowance_counter: GasAllowanceCounter) -> Self {
            self.0.gas_allowance_counter = gas_allowance_counter;

            self
        }

        fn with_weighs(mut self, weights: HostFnWeights) -> Self {
            self.0.host_fn_weights = weights;

            self
        }

        fn with_allocation_context(mut self, ctx: AllocationsContext) -> Self {
            self.0.allocations_context = ctx;

            self
        }
    }

    // Invariant: Refund never occurs in `free` call.
    #[test]
    fn free_no_refund() {
        // Set initial Ext state
        let initial_gas = 100;
        let initial_allowance = 10000;

        let gas_left = (initial_gas, initial_allowance).into();

        let existing_page = 99.into();
        let non_existing_page = 100.into();

        let allocations_context =
            AllocationsContext::new(BTreeSet::from([existing_page]), 1.into(), 512.into());

        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_gas(GasCounter::new(initial_gas))
                .with_allowance(GasAllowanceCounter::new(initial_allowance))
                .with_allocation_context(allocations_context)
                .build(),
        );

        // Freeing existing page.
        // Counters shouldn't be changed.
        assert!(ext.free(existing_page).is_ok());
        assert_eq!(ext.gas_left(), gas_left);

        // Freeing non existing page.
        // Counters still shouldn't be changed.
        assert_eq!(
            ext.free(non_existing_page),
            Err(AllocExtError::Alloc(AllocError::InvalidFree(
                non_existing_page.raw()
            )))
        );
        assert_eq!(ext.gas_left(), gas_left);
    }

    #[test]
    fn test_counter_zeroes() {
        // Set initial Ext state
        let free_weight = 1000;
        let host_fn_weights = HostFnWeights {
            free: free_weight,
            ..Default::default()
        };

        let initial_gas = free_weight - 1;
        let initial_allowance = free_weight + 1;

        let mut lack_gas_ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_gas(GasCounter::new(initial_gas))
                .with_allowance(GasAllowanceCounter::new(initial_allowance))
                .with_weighs(host_fn_weights.clone())
                .build(),
        );

        assert_eq!(
            lack_gas_ext.charge_gas_runtime(RuntimeCosts::Free),
            Err(ChargeError::GasLimitExceeded),
        );

        let gas_amount = lack_gas_ext.gas_amount();
        let allowance = lack_gas_ext.context.gas_allowance_counter.left();
        // there was lack of gas
        assert_eq!(0, gas_amount.left());
        assert_eq!(initial_gas, gas_amount.burned());
        assert_eq!(initial_allowance - free_weight, allowance);

        let initial_gas = free_weight;
        let initial_allowance = free_weight - 1;

        let mut lack_allowance_ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_gas(GasCounter::new(initial_gas))
                .with_allowance(GasAllowanceCounter::new(initial_allowance))
                .with_weighs(host_fn_weights)
                .build(),
        );

        assert_eq!(
            lack_allowance_ext.charge_gas_runtime(RuntimeCosts::Free),
            Err(ChargeError::GasAllowanceExceeded),
        );

        let gas_amount = lack_allowance_ext.gas_amount();
        let allowance = lack_allowance_ext.context.gas_allowance_counter.left();
        assert_eq!(initial_gas - free_weight, gas_amount.left());
        assert_eq!(initial_gas, gas_amount.burned());
        // there was lack of allowance
        assert_eq!(0, allowance);
    }

    #[test]
    // This function tests:
    //
    // - `send_commit` on valid handle
    // - `send_commit` on invalid handle
    // - `send_commit` on used handle
    // - `send_init` after limit is exceeded
    fn test_send_commit() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_message_context(MessageContextBuilder::new().with_outgoing_limit(1).build())
                .build(),
        );

        let data = HandlePacket::default();

        let fake_handle = 0;

        let msg = ext.send_commit(fake_handle, data.clone(), 0);
        assert_eq!(
            msg.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::OutOfBounds))
        );

        let handle = ext.send_init().expect("Outgoing limit is 1");

        let msg = ext.send_commit(handle, data.clone(), 0);
        assert!(msg.is_ok());

        let msg = ext.send_commit(handle, data, 0);
        assert_eq!(
            msg.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::LateAccess))
        );

        let handle = ext.send_init();
        assert_eq!(
            handle.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(
                MessageError::OutgoingMessagesAmountLimitExceeded
            ))
        );
    }

    #[test]
    // This function tests:
    //
    // - `send_push` on non-existent handle
    // - `send_push` on valid handle
    // - `send_push` on used handle
    // - `send_push` with too large payload
    // - `send_push` data is added to buffer
    fn test_send_push() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_message_context(MessageContextBuilder::new().build())
                .build(),
        );

        let data = HandlePacket::default();

        let fake_handle = 0;

        let res = ext.send_push(fake_handle, &[0, 0, 0]);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::OutOfBounds))
        );

        let handle = ext.send_init().expect("Outgoing limit is u32::MAX");

        let res = ext.send_push(handle, &[1, 2, 3]);
        assert!(res.is_ok());

        let res = ext.send_push(handle, &[4, 5, 6]);
        assert!(res.is_ok());

        let large_payload = vec![0u8; MAX_PAYLOAD_SIZE + 1];

        let res = ext.send_push(handle, &large_payload);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(
                MessageError::MaxMessageSizeExceed
            ))
        );

        let msg = ext.send_commit(handle, data, 0);
        assert!(msg.is_ok());

        let res = ext.send_push(handle, &[7, 8, 9]);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::LateAccess))
        );

        let (outcome, _) = ext.context.message_context.drain();
        let ContextOutcomeDrain {
            mut outgoing_dispatches,
            ..
        } = outcome.drain();
        let dispatch = outgoing_dispatches
            .pop()
            .map(|(dispatch, _, _)| dispatch)
            .expect("Send commit was ok");

        assert_eq!(dispatch.message().payload_bytes(), &[1, 2, 3, 4, 5, 6]);
    }

    #[test]
    // This function tests:
    //
    // - `send_push_input` on non-existent handle
    // - `send_push_input` on valid handle
    // - `send_push_input` on used handle
    // - `send_push_input` data is added to buffer
    fn test_send_push_input() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_message_context(MessageContextBuilder::new().build())
                .build(),
        );

        let data = HandlePacket::default();

        let fake_handle = 0;

        let res = ext.send_push_input(fake_handle, 0, 1);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::OutOfBounds))
        );

        let handle = ext.send_init().expect("Outgoing limit is u32::MAX");

        let res = ext
            .context
            .message_context
            .payload_mut()
            .try_extend_from_slice(&[1, 2, 3, 4, 5, 6]);
        assert!(res.is_ok());

        let res = ext.send_push_input(handle, 2, 3);
        assert!(res.is_ok());

        let res = ext.send_push_input(handle, 8, 10);
        assert!(res.is_ok());

        let msg = ext.send_commit(handle, data, 0);
        assert!(msg.is_ok());

        let res = ext.send_push_input(handle, 0, 1);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::LateAccess))
        );

        let (outcome, _) = ext.context.message_context.drain();
        let ContextOutcomeDrain {
            mut outgoing_dispatches,
            ..
        } = outcome.drain();
        let dispatch = outgoing_dispatches
            .pop()
            .map(|(dispatch, _, _)| dispatch)
            .expect("Send commit was ok");

        assert_eq!(dispatch.message().payload_bytes(), &[3, 4, 5]);
    }

    #[test]
    // This function requires `reply_push` to work to add extra data.
    // This function tests:
    //
    // - `reply_commit` with too much data
    // - `reply_commit` with valid data
    // - `reply_commit` duplicate reply
    fn test_reply_commit() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_gas(GasCounter::new(u64::MAX))
                .with_message_context(MessageContextBuilder::new().build())
                .build(),
        );

        let res = ext.reply_push(&[0]);
        assert!(res.is_ok());

        let res = ext.reply_commit(ReplyPacket::new(Payload::filled_with(0), 0));
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(
                MessageError::MaxMessageSizeExceed
            ))
        );

        let res = ext.reply_commit(ReplyPacket::auto());
        assert!(res.is_ok());

        let res = ext.reply_commit(ReplyPacket::auto());
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::DuplicateReply))
        );
    }

    #[test]
    // This function requires `reply_push` to work to add extra data.
    // This function tests:
    //
    // - `reply_push` with valid data
    // - `reply_push` with too much data
    // - `reply_push` after `reply_commit`
    // - `reply_push` data is added to buffer
    fn test_reply_push() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_gas(GasCounter::new(u64::MAX))
                .with_message_context(MessageContextBuilder::new().build())
                .build(),
        );

        let res = ext.reply_push(&[1, 2, 3]);
        assert!(res.is_ok());

        let res = ext.reply_push(&[4, 5, 6]);
        assert!(res.is_ok());

        let large_payload = vec![0u8; MAX_PAYLOAD_SIZE + 1];

        let res = ext.reply_push(&large_payload);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(
                MessageError::MaxMessageSizeExceed
            ))
        );

        let res = ext.reply_commit(ReplyPacket::auto());
        assert!(res.is_ok());

        let res = ext.reply_push(&[7, 8, 9]);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::LateAccess))
        );

        let (outcome, _) = ext.context.message_context.drain();
        let ContextOutcomeDrain {
            mut outgoing_dispatches,
            ..
        } = outcome.drain();
        let dispatch = outgoing_dispatches
            .pop()
            .map(|(dispatch, _, _)| dispatch)
            .expect("Send commit was ok");

        assert_eq!(dispatch.message().payload_bytes(), &[1, 2, 3, 4, 5, 6]);
    }

    #[test]
    // This function tests:
    //
    // - `reply_push_input` with valid data
    // - `reply_push_input` after `reply_commit`
    // - `reply_push_input` data is added to buffer
    fn test_reply_push_input() {
        let mut ext = Ext::new(
            ProcessorContextBuilder::new()
                .with_message_context(MessageContextBuilder::new().build())
                .build(),
        );

        let res = ext
            .context
            .message_context
            .payload_mut()
            .try_extend_from_slice(&[1, 2, 3, 4, 5, 6]);
        assert!(res.is_ok());

        let res = ext.reply_push_input(2, 3);
        assert!(res.is_ok());

        let res = ext.reply_push_input(8, 10);
        assert!(res.is_ok());

        let msg = ext.reply_commit(ReplyPacket::auto());
        assert!(msg.is_ok());

        let res = ext.reply_push_input(0, 1);
        assert_eq!(
            res.unwrap_err(),
            FallibleExtError::Core(FallibleExtErrorCore::Message(MessageError::LateAccess))
        );

        let (outcome, _) = ext.context.message_context.drain();
        let ContextOutcomeDrain {
            mut outgoing_dispatches,
            ..
        } = outcome.drain();
        let dispatch = outgoing_dispatches
            .pop()
            .map(|(dispatch, _, _)| dispatch)
            .expect("Send commit was ok");

        assert_eq!(dispatch.message().payload_bytes(), &[3, 4, 5]);
    }
}
