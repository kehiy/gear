//! build script for gear-program cli
use std::{
    env, fs,
    io::Write,
    path::PathBuf,
    process::{Command, Stdio},
};
use subxt_codegen::DerivesRegistry;

const GENERATED_TITLE: &str = r#"
//! Auto generated by subxt-cli
//!
//! subxt codegen | rustfmt --edition=2021
#![allow(clippy::all, missing_docs)]
"#;

/// Generate api
fn codegen(raw_derives: Vec<String>) -> String {
    let metadata = gear_runtime::Runtime::metadata();

    let generator = subxt_codegen::RuntimeGenerator::new(metadata);
    let item_mod = syn::parse_quote!(
        pub mod api {}
    );

    let p = raw_derives
        .iter()
        .map(|raw| syn::parse_str(raw))
        .collect::<Result<Vec<_>, _>>()
        .expect("parse derives failed");
    let mut derives = DerivesRegistry::default();
    derives.extend_for_all(p.into_iter());

    generator.generate_runtime(item_mod, derives).to_string()
}

/// Check if gear-node exists
fn check_node() -> bool {
    let profile = std::env::var("PROFILE").unwrap();
    let node = PathBuf::from("../target").join(profile).join("gear-node");
    node.exists()
}

/// Update runtime api
fn update_api() {
    let api = codegen(vec![]);
    let manifest = env!("CARGO_MANIFEST_DIR");

    // format generated code
    let mut rustfmt = Command::new("rustfmt");
    let mut code = rustfmt
        .args(["--edition=2021"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .spawn()
        .unwrap();

    // pipe api to rustfmt
    write!(code.stdin.as_mut().unwrap(), "{}", api).unwrap();
    let output = code.wait_with_output().unwrap();

    // write api to disk
    fs::write(
        &[manifest, "/src/api/generated/metadata.rs"].concat(),
        GENERATED_TITLE.to_owned().trim().to_owned()
            + "\n"
            + &String::from_utf8_lossy(&output.stdout),
    )
    .expect("update api failed");

    // # NOTE
    //
    // post format code since `cargo +nightly fmt` doesn't support pipe
    let mut cargo = Command::new("cargo");
    cargo
        .args(["+nightly", "fmt"])
        .status()
        .expect("Format code failed.");
}

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../runtime");
    println!("cargo:rerun-if-changed=../pallets/gear");

    // check if node exists
    if check_node() {
        update_api()
    }
}
