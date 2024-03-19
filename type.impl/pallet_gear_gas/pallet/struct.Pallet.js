(function() {var type_impls = {
"pallet_gear_gas":[["<section id=\"impl-Eq-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#176\">source</a><a href=\"#impl-Eq-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section>","Eq","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GasProvider-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#348-364\">source</a><a href=\"#impl-GasProvider-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; Provider for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.ExternalOrigin\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.ExternalOrigin\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">ExternalOrigin</a> = &lt;T as Config&gt;::AccountId</h4></section></summary><div class='docblock'>Type representing the external owner of a value (gas) item.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.NodeId\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.NodeId\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">NodeId</a> = GasNodeId&lt;MessageId, ReservationId&gt;</h4></section></summary><div class='docblock'>Type that identifies a tree node.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Balance\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Balance\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Balance</a> = <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u64.html\">u64</a></h4></section></summary><div class='docblock'>Type representing a quantity of value.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Funds\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Funds\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Funds</a> = <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u128.html\">u128</a></h4></section></summary><div class='docblock'>Type representing a quantity of token balance.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.InternalError\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.InternalError\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">InternalError</a> = <a class=\"enum\" href=\"pallet_gear_gas/pallet/enum.Error.html\" title=\"enum pallet_gear_gas::pallet::Error\">Error</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Types to denote a result of some unbalancing operation - that is\noperations that create inequality between the underlying value\nsupply and some hypothetical “collateral” asset.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Error\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Error\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Error</a> = DispatchError</h4></section></summary><div class='docblock'>Error type.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.GasTree\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.GasTree\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">GasTree</a> = TreeImpl&lt;<a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.TotalIssuanceWrap.html\" title=\"struct pallet_gear_gas::pallet::TotalIssuanceWrap\">TotalIssuanceWrap</a>&lt;T&gt;, &lt;<a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt; as Provider&gt;::InternalError, &lt;<a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt; as Provider&gt;::Error, &lt;<a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt; as Provider&gt;::ExternalOrigin, &lt;<a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt; as Provider&gt;::NodeId, <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.GasNodesWrap.html\" title=\"struct pallet_gear_gas::pallet::GasNodesWrap\">GasNodesWrap</a>&lt;T&gt;&gt;</h4></section></summary><div class='docblock'>A ledger to account for gas creation and consumption.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.reset\" class=\"method trait-impl\"><a href=\"#method.reset\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">reset</a>()</h4></section></summary><div class='docblock'>Resets all related to gas provider storages. <a>Read more</a></div></details></div></details>","Provider","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#impl-Clone-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; Self</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-StorageInfoTrait-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#175\">source</a><a href=\"#impl-StorageInfoTrait-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; StorageInfoTrait for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.storage_info\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#175\">source</a><a href=\"#method.storage_info\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">storage_info</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;StorageInfo&gt;</h4></section></div></details>","StorageInfoTrait","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OnInitialize%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-OnInitialize%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OnInitialize&lt;&lt;&lt;&lt;T as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_initialize\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.on_initialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_initialize</a>(n: BlockNumberFor&lt;T&gt;) -&gt; Weight</h4></section></summary><div class='docblock'>The block is being initialized. Implement to have something happen. <a>Read more</a></div></details></div></details>","OnInitialize<<<<T as Config>::Block as HeaderProvider>::HeaderT as Header>::Number>","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OnRuntimeUpgrade-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-OnRuntimeUpgrade-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OnRuntimeUpgrade for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_runtime_upgrade\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.on_runtime_upgrade\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_runtime_upgrade</a>() -&gt; Weight</h4></section></summary><div class='docblock'>Perform a module upgrade. <a>Read more</a></div></details></div></details>","OnRuntimeUpgrade","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-WhitelistedStorageKeys-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#impl-WhitelistedStorageKeys-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; WhitelistedStorageKeys for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.whitelisted_storage_keys\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#method.whitelisted_storage_keys\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">whitelisted_storage_keys</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;TrackedStorageKey&gt;</h4></section></summary><div class='docblock'>Returns a <a href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\"><code>Vec&lt;TrackedStorageKey&gt;</code></a> indicating the storage keys that\nshould be whitelisted during benchmarking. This means that those keys\nwill be excluded from the benchmarking performance calculation.</div></details></div></details>","WhitelistedStorageKeys","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PalletsInfoAccess-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#impl-PalletsInfoAccess-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; PalletsInfoAccess for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.count\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.count\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">count</a>() -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>The number of pallets’ information that this type represents. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.infos\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.infos\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">infos</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PalletInfoData&gt;</h4></section></summary><div class='docblock'>All of the pallets’ information that this type represents.</div></details></div></details>","PalletsInfoAccess","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Callable%3CT%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#160-387\">source</a><a href=\"#impl-Callable%3CT%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; Callable&lt;T&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"associatedtype.RuntimeCall\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.RuntimeCall\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">RuntimeCall</a> = <a class=\"enum\" href=\"pallet_gear_gas/pallet/enum.Call.html\" title=\"enum pallet_gear_gas::pallet::Call\">Call</a>&lt;T&gt;</h4></section></div></details>","Callable<T>","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-IntegrityTest-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-IntegrityTest-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; IntegrityTest for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.integrity_test\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.integrity_test\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">integrity_test</a>()</h4></section></summary><div class='docblock'>Run integrity test. <a>Read more</a></div></details></div></details>","IntegrityTest","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#impl-Debug-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, fmt: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/nightly/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OffchainWorker%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-OffchainWorker%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OffchainWorker&lt;&lt;&lt;&lt;T as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.offchain_worker\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.offchain_worker\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">offchain_worker</a>(n: BlockNumberFor&lt;T&gt;)</h4></section></summary><div class='docblock'>This function is being called after every block import (when fully synced). <a>Read more</a></div></details></div></details>","OffchainWorker<<<<T as Config>::Block as HeaderProvider>::HeaderT as Header>::Number>","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#impl-PartialEq-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#159\">source</a><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#242\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OnIdle%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-OnIdle%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OnIdle&lt;&lt;&lt;&lt;T as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_idle\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.on_idle\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_idle</a>(n: BlockNumberFor&lt;T&gt;, remaining_weight: Weight) -&gt; Weight</h4></section></summary><div class='docblock'>The block is being finalized.\nImplement to have something happen in case there is leftover weight.\nCheck the passed <code>remaining_weight</code> to make sure it is high enough to allow for\nyour pallet’s extra computation. <a>Read more</a></div></details></div></details>","OnIdle<<<<T as Config>::Block as HeaderProvider>::HeaderT as Header>::Number>","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OnGenesis-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#impl-OnGenesis-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OnGenesis for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_genesis\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.on_genesis\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_genesis</a>()</h4></section></summary><div class='docblock'>Something that should happen at genesis.</div></details></div></details>","OnGenesis","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PalletInfoAccess-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#impl-PalletInfoAccess-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; PalletInfoAccess for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.index\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.index\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">index</a>() -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>Index of the pallet as configured in the runtime.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.name\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.name\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">name</a>() -&gt; &amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a></h4></section></summary><div class='docblock'>Name of the pallet as configured in the runtime.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.module_name\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.module_name\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">module_name</a>() -&gt; &amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a></h4></section></summary><div class='docblock'>Name of the Rust module containing the pallet.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.crate_version\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.crate_version\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">crate_version</a>() -&gt; CrateVersion</h4></section></summary><div class='docblock'>Version of the crate containing the pallet.</div></details></div></details>","PalletInfoAccess","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BlockLimiter-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#366-372\">source</a><a href=\"#impl-BlockLimiter-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; BlockLimiter for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.BlockGasLimit\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.BlockGasLimit\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">BlockGasLimit</a> = &lt;T as <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt;::<a class=\"associatedtype\" href=\"pallet_gear_gas/pallet/trait.Config.html#associatedtype.BlockGasLimit\" title=\"type pallet_gear_gas::pallet::Config::BlockGasLimit\">BlockGasLimit</a></h4></section></summary><div class='docblock'>The maximum amount of gas that can be used within a single block.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Balance\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Balance\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Balance</a> = <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u64.html\">u64</a></h4></section></summary><div class='docblock'>Type representing a quantity of value.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.GasAllowance\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.GasAllowance\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">GasAllowance</a> = <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.GasAllowance.html\" title=\"struct pallet_gear_gas::pallet::GasAllowance\">GasAllowance</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Type manages a gas that is available at the moment of call.</div></details></div></details>","BlockLimiter","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hooks%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#375-386\">source</a><a href=\"#impl-Hooks%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; Hooks&lt;&lt;&lt;&lt;T as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_initialize\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#377-382\">source</a><a href=\"#method.on_initialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_initialize</a>(_bn: BlockNumberFor&lt;T&gt;) -&gt; Weight</h4></section></summary><div class=\"docblock\"><p>Initialization</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_finalize\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#385\">source</a><a href=\"#method.on_finalize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_finalize</a>(_bn: BlockNumberFor&lt;T&gt;)</h4></section></summary><div class=\"docblock\"><p>Finalization</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_idle\" class=\"method trait-impl\"><a href=\"#method.on_idle\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_idle</a>(_n: BlockNumber, _remaining_weight: Weight) -&gt; Weight</h4></section></summary><div class='docblock'>This will be run when the block is being finalized (before <code>on_finalize</code>). <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_runtime_upgrade\" class=\"method trait-impl\"><a href=\"#method.on_runtime_upgrade\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_runtime_upgrade</a>() -&gt; Weight</h4></section></summary><div class='docblock'>Perform a module upgrade. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.offchain_worker\" class=\"method trait-impl\"><a href=\"#method.offchain_worker\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">offchain_worker</a>(_n: BlockNumber)</h4></section></summary><div class='docblock'>Implementing this function on a module allows you to perform long-running tasks\nthat make (by default) validators generate transactions that feed results\nof those long-running computations back on chain. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.integrity_test\" class=\"method trait-impl\"><a href=\"#method.integrity_test\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">integrity_test</a>()</h4></section></summary><div class='docblock'>Run integrity test. <a>Read more</a></div></details></div></details>","Hooks<<<<T as Config>::Block as HeaderProvider>::HeaderT as Header>::Number>","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GetStorageVersion-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#impl-GetStorageVersion-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; GetStorageVersion for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.CurrentStorageVersion\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.CurrentStorageVersion\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">CurrentStorageVersion</a> = StorageVersion</h4></section></summary><div class='docblock'>This will be filled out by the <a href=\"crate::pallet\"><code>pallet</code></a> macro. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.current_storage_version\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.current_storage_version\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">current_storage_version</a>() -&gt; Self::CurrentStorageVersion</h4></section></summary><div class='docblock'>Returns the current storage version as supported by the pallet.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_chain_storage_version\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#173\">source</a><a href=\"#method.on_chain_storage_version\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_chain_storage_version</a>() -&gt; StorageVersion</h4></section></summary><div class='docblock'>Returns the on-chain storage version of the pallet as stored in the storage.</div></details></div></details>","GetStorageVersion","pallet_gear_gas::pallet::Module"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-OnFinalize%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#impl-OnFinalize%3C%3C%3C%3CT+as+Config%3E::Block+as+HeaderProvider%3E::HeaderT+as+Header%3E::Number%3E-for-Pallet%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"pallet_gear_gas/pallet/trait.Config.html\" title=\"trait pallet_gear_gas::pallet::Config\">Config</a>&gt; OnFinalize&lt;&lt;&lt;&lt;T as Config&gt;::Block as HeaderProvider&gt;::HeaderT as Header&gt;::Number&gt; for <a class=\"struct\" href=\"pallet_gear_gas/pallet/struct.Pallet.html\" title=\"struct pallet_gear_gas::pallet::Pallet\">Pallet</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.on_finalize\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/pallet_gear_gas/lib.rs.html#374\">source</a><a href=\"#method.on_finalize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">on_finalize</a>(n: BlockNumberFor&lt;T&gt;)</h4></section></summary><div class='docblock'>The block is being finalized. Implement to have something happen. <a>Read more</a></div></details></div></details>","OnFinalize<<<<T as Config>::Block as HeaderProvider>::HeaderT as Header>::Number>","pallet_gear_gas::pallet::Module"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()