---
slug: nft-auction-ownership
title: How to check ownership of an NFT in an Auction?
authors: [phoenixpulsar]
# tags: [facebook, hello, docusaurus]
---

```md
# 1. Context: An Auction Contract That Sells NFTs

## Auction Contract Overview

- Typically, an auction contract allows users to bid on some item (in this case, an NFT) over a set period.
- At the end of the auction, the highest bidder wins and should receive the NFT.

### Implicit Assumption

- The auction contract **should** have the right to transfer the NFT from itself to the winning bidder.
- This means that, ideally, the auction contract actually owns (or controls) the NFT during the auction.

---

# 2. The Problem: No On-Chain Check for Ownership

## What’s Missing?

- In the given scenario, the contract does **not** verify whether it truly owns (or is approved to transfer) the NFT it’s auctioning.
- There is no function call or logic that checks “Does this contract really own NFT X?” before letting people bid.

## How a Bad Actor Exploits This

- A malicious user (the “bad actor”) can create or initialize an auction listing an NFT that the contract doesn’t own.
  - For example, they specify “Token ID = 123 from NFT Contract XYZ,” but the auction contract never actually possessed token **123**.
- The contract starts accepting bids from unsuspecting bidders.

### When the Auction Ends

- The winning bidder expects the auction contract to transfer the NFT.
- The contract attempts an `nft_transfer` to the winner.
- But because the auction contract is not actually the owner (and was never approved), this `nft_transfer` call fails.

### Impact on the Winning Bidder

- The winning bidder has already paid their bid amount into the auction contract (in NEAR tokens or whatever the currency is).
- Now they receive no NFT in return.
- The contract might not have any built-in refund mechanism for a failed transfer, so the bidder could lose their funds.

---

# 3. Why Not Just Check On-Chain?

## The Naive “Ideal” Fix

- One straightforward solution would be:
  1. **Upon auction creation**, call the NFT contract (via cross-contract call) to verify that `owner_id == auction_contract` or that `auction_contract` is approved for the token.
  2. If the check fails, reject the auction creation.

## Complexity of Cross-Contract Calls

- Cross-contract calls add more complexity:
  - You need to handle asynchronous callbacks, error states, etc.
  - It increases the amount of gas usage, plus you must carefully handle reverts or partial failures.
  - If you’re building multiple checks for different NFTs, the logic can become quite extensive.

---

# 4. The Interim Solution: Off-Chain Validation

## Frontend or Off-Chain Logic

- Instead of making the contract do the ownership verification, the developer can implement a check in their web app or server that:
  - Calls the NFT contract’s `nft_token(token_id)` method (or an equivalent) to see who currently owns that NFT.
  - Validates that the current owner is actually the auction contract (or that the auction contract is at least approved to transfer the NFT).

## Reject Invalid Auctions Before Bidding

- If the check reveals the contract doesn’t truly own or control the NFT, the frontend can prevent anyone from placing a bid.
- This way, legitimate users never see or bid on invalid auctions.

## Why This Works

- Although it’s not as trustless as an on-chain check, most real-world dApps already rely heavily on the frontend for user experience.
- If you only show valid auctions on the user interface, you significantly reduce the chance that someone accidentally bids on a fraudulent auction.

### Trade-Off

- The downside is that if someone interacts with the contract directly via a CLI or another custom interface (skipping your official frontend), they could still place a bid on a fraudulent auction.
- However, in many dApp ecosystems, 99%+ of users interact via the official UI, so off-chain checks often suffice in practice.

---

# 5. Recap of the Steps

## Auction Creation

- The malicious user calls your auction contract’s `start_auction` method, claiming there’s an NFT with token ID “123” up for sale.
- The contract does no checks to see if it really owns that NFT.

## Bidding

- Other users see the auction, place bids, and deposit funds into the contract.
- Everyone believes the NFT is genuinely controlled by the auction contract.

## Auction Ends

- The highest bidder wins.
- The contract attempts to do an `nft_transfer` of token “123” from itself to the winner.

## Transfer Fails

- The NFT contract says, “You’re not the owner; you can’t transfer.”
- The winner gets nothing. Potentially, their funds are stuck.

## Proposed On-Chain Fix (Complex)

- Right when the auction is created, do a cross-contract call to the NFT contract to confirm ownership.
- If ownership is not confirmed, the auction creation fails.

## Chosen Solution (For Simplicity)

- Perform an **off-chain** ownership check in the frontend.
- Only display auctions that pass this verification.
- This prevents most users from ever bidding on a fraudulent auction.

---

# 6. Key Takeaways

## Importance of Ownership Verification

- Always confirm that the contract **actually controls** the NFT before allowing auctions or sales.

## Security vs. Complexity

- On-chain checks are more secure/trustless but more complex. Off-chain checks reduce complexity but rely on a trusted frontend.

## Refunds

- If you do rely on off-chain checks, consider adding a fallback mechanism in your contract that **refunds bidders if the NFT transfer fails**. That way, nobody loses funds if, somehow, an invalid auction slips through.

## Best Practice

- If time and resources allow, implement **both**:
  1. On-chain checks that prevent fraudulent auctions from even existing, and
  2. Off-chain checks in the UI for additional caution and user clarity.

---

## Final Summary

In short, the contract never verifies that it actually owns the NFT being auctioned, leaving a loophole for malicious auctions. Fully solving this on-chain involves writing a cross-contract call to the NFT contract to confirm ownership before starting an auction. Because cross-contract logic can be cumbersome, a simpler (though less trustless) approach is to do ownership checks off-chain (e.g., in the frontend) and only display auctions that are verifiably valid.
```
