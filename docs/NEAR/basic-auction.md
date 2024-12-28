---
sidebar_position: 1
---

# Basic Auction Notes

## Intro

Following the [NEAR tutorial](https://docs.near.org/tutorials/auction/basic-auction), while adding notes and about questions and thoughts that come up.

## About

This tutorial walks us through creating an auction that allows users to bid.

## Running Test Error

If you try to run the auction test you might get an error like this:

```bash
error: package `deranged v0.3.11` cannot be built because it requires rustc 1.67.0 or newer, while the currently active rustc version is 1.66.0
Either upgrade to rustc 1.67.0 or newer, or use
cargo update -p deranged@0.3.11 --precise ver
where `ver` is the latest version of `deranged` supporting rustc 1.66.0
```

This is because the rust version is outdated. To update it, run the following command:

```bash
rustup update stable
```

`rustup`: The Rust toolchain installer and version manager.
`update`: The subcommand to fetch and install updates.
`stable`: Specifies the channel you want to update, in this case, the stable channel.

## What will the winner of the auction get?

For the purpose of this tutorial, there is not a defined thing a winner gets. In other words, we can say its mostly for book keeping purposes, and letting us understand the some main ideas of NEAR such as what a smart contract code looks like, test it and deploy it. In reality, the winner could get an NFT or anything and use the auction as a way to delegate who actualy wins.

## Borsh JSON (de)serialization

Serialization is the process of converting data into a format that can be stored or transmitted and then reconstructed later.

When storing data persistently in the blockchain state, we can Borsh because:
It is more compact than JSON, which saves on storage costs.
It is faster to serialize/deserialize, improving contract execution performance.
Borsh - not human readable

## Build Options

The tutorial does not specify which of the two build options to use between `reproducible-wasm` and `non-reproducible-wasm`. If you try to run `reproducible-wasm` you might get an error like this:

```bash
An error with Cargo.lock has been encountered...
You can choose to disable `--locked` flag for downstream `cargo` command by adding `--no-locked` flag OR by removing `--locked` flag

Please mind that `--no-locked` flag is allowed in Docker builds, but:
  - such builds are not reproducible due to potential update of dependencies and compiled `wasm` mismatch as the result.

Cargo.lock check was performed against git version of code.
Don't forget to check in Cargo.lock into source code for deploy if it's git-ignored...
• failed

Here is the console command if you ever need to re-run it again:
cargo near build reproducible-wasm

```

The error occurs because the Cargo.lock file is missing or outdated. The --locked flag enforces a strict use of the exact dependency versions specified in Cargo.lock for reproducible builds. If Cargo.lock is not present or updated, builds may fail or become non-reproducible. To resolve, update or check in the Cargo.lock file (which is typically committed to version control) into source control or disable the --locked flag with --no-locked to maintain build integrity.

For the tutorial, I used the `non-reproducible-wasm` build option.

## Deployment Logs

```bash
near deploy ppulsarbasicauction0.testnet ./target/near/auction_contract.wasm

Unsigned transaction:

signer_id:    ppulsarbasicauction0.testnet
receiver_id:  ppulsarbasicauction0.testnet
actions:
   -- deploy contract FBG5PVt7q7z3j7ipk3MqTLUZYecnyCZKrFQC4w4adDxn

▹▹▹▸▹ Signing the transaction with a key saved in the secure keychain ...
Your transaction was signed successfully.
Public key: ed25519:CEoHDc4rmF8KutUq7mx6X8gmdTR5112mTDtPnHVvZwEo
Signature: ed25519:1CGdT3jwd2URnNA2kga7WCJG8UUVRLEJDQpL892UGtfvQquTJw9ywzuwDodrciSCqP483TgLMNHCkzY8Bejb89t
▹▹▸▹▹ Sending transaction ...
--- Logs ---------------------------
Logs [ppulsarbasicauction0.testnet]:   No logs
--- Result -------------------------
Empty result
------------------------------------

Contract code has been successfully deployed.

Gas burned: 8.7 Tgas
Transaction fee: 0.0008600792794097 NEAR
Transaction ID: 5yAin971RNZVbiNEfBHZ47xAssxQjLtGiQj9PnF2beTk
To see the transaction in the transaction explorer, please open this url in your browser:
https://explorer.testnet.near.org/transactions/5yAin971RNZVbiNEfBHZ47xAssxQjLtGiQj9PnF2beTk

```

The near deploy command deploys a smart contract to the ppulsarbasicauction0.testnet account on the NEAR blockchain. The unsigned transaction, specifying the account and contract, is signed securely using a stored private key. After signing, the transaction is sent to the network, successfully deploying the contract. The process includes logging the transaction ID, signature, and associated costs (gas burned and transaction fee).
