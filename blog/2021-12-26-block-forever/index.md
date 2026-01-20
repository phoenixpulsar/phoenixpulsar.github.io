---
slug: block-forever
title: Do things live in the blockchain forever?
authors: [phoenixpulsar]
# tags: [facebook, hello, docusaurus]
---

On most blockchains, including NEAR, transactions and blocks are indeed immutable. Once a transaction is finalized and added to the blockchain, it cannot be altered or deleted. This immutability ensures transparency and trust within the blockchain system.

However, not all data is stored in the blockchain itself. Smart contract state—the data stored by a smart contract—is managed differently. While the blockchain keeps a record of transactions that update this state, the actual state itself exists as part of the account's storage in NEAR.

Deleting Contract State in NEAR

In NEAR, it is possible to delete a contract's state. When this happens:

The state associated with the contract is removed from the account storage.

Any funds locked in the contract's storage are refunded to the account owner or a designated recipient.

The transaction that performed the deletion remains on the blockchain as an immutable record.

This process is intentional and designed for flexibility. For example, developers may choose to delete a contract after it is no longer needed or to redeploy a new version of the contract. The ability to clean up unused contracts helps manage storage costs, which are incurred for storing data on NEAR.

Does This Mean the Blockchain Isn’t Permanent?

No, the blockchain’s core immutability remains intact. The history of all transactions, including the one that deletes the contract state, is permanently recorded. What’s being "deleted" is the state data stored for that specific account, not the record of its existence or the transactions associated with it.

This distinction is crucial: immutability applies to the blockchain's ledger, not necessarily to all the data managed by smart contracts.

Key Takeaways

Transactions and blocks are immutable and permanently recorded on the blockchain.

Smart contract state can be deleted, but the transaction that triggered the deletion is permanently logged.

Deleting contract state is a practical feature for managing costs and maintaining the system’s efficiency.

Understanding these nuances helped me appreciate the flexibility of NEAR's design while recognizing the underlying permanence of blockchain records. It’s a balance between immutability for trust and adaptability for real-world use cases.
