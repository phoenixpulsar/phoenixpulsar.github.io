"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[531],{9103:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>a});var t=i(4848),o=i(8453);const s={slug:"nft-auction-ownership",title:"How to check ownership of an NFT in an Auction?",authors:["phoenixpulsar"]},r="Overview",c={permalink:"/blog/nft-auction-ownership",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2024-12-28-nft-auction-ownership/index.md",source:"@site/blog/2024-12-28-nft-auction-ownership/index.md",title:"How to check ownership of an NFT in an Auction?",description:"In the NEAR tutorial, there is a section about ownership verification. It is just a short section, and on firts pass, it was not clear to me so below find a more detailed explanation.",date:"2024-12-28T00:00:00.000Z",tags:[],readingTime:5.27,hasTruncateMarker:!1,authors:[{name:"Phoenix Pulsar",title:"Technomancer of Code and Connection",url:"https://github.com/phoenixpulsar",page:{permalink:"/blog/authors/phoenixpulsar"},socials:{x:"https://x.com/pulsar_phoenix",github:"https://github.com/phoenixpulsar"},imageURL:"https://github.com/phoenixpulsar.png",key:"phoenixpulsar"}],frontMatter:{slug:"nft-auction-ownership",title:"How to check ownership of an NFT in an Auction?",authors:["phoenixpulsar"]},unlisted:!1,nextItem:{title:"Do things live in the blockchain forever?",permalink:"/blog/block-forever"}},l={authorsImageUrls:[void 0]},a=[{value:"Auction Contract Overview",id:"auction-contract-overview",level:2},{value:"Implicit Assumption",id:"implicit-assumption",level:3},{value:"What\u2019s Missing?",id:"whats-missing",level:2},{value:"How a Bad Actor Exploits This",id:"how-a-bad-actor-exploits-this",level:2},{value:"When the Auction Ends",id:"when-the-auction-ends",level:3},{value:"Impact on the Winning Bidder",id:"impact-on-the-winning-bidder",level:3},{value:"The Naive \u201cIdeal\u201d Fix",id:"the-naive-ideal-fix",level:2},{value:"Complexity of Cross-Contract Calls",id:"complexity-of-cross-contract-calls",level:2},{value:"Frontend or Off-Chain Logic",id:"frontend-or-off-chain-logic",level:2},{value:"Reject Invalid Auctions Before Bidding",id:"reject-invalid-auctions-before-bidding",level:2},{value:"Why This Works",id:"why-this-works",level:2},{value:"Trade-Off",id:"trade-off",level:3},{value:"Auction Creation",id:"auction-creation",level:2},{value:"Bidding",id:"bidding",level:2},{value:"Auction Ends",id:"auction-ends",level:2},{value:"Transfer Fails",id:"transfer-fails",level:2},{value:"Proposed On-Chain Fix (Complex)",id:"proposed-on-chain-fix-complex",level:2},{value:"Chosen Solution (For Simplicity)",id:"chosen-solution-for-simplicity",level:2},{value:"Importance of Ownership Verification",id:"importance-of-ownership-verification",level:2},{value:"Security vs. Complexity",id:"security-vs-complexity",level:2},{value:"Refunds",id:"refunds",level:2},{value:"Best Practice",id:"best-practice",level:2},{value:"Final Summary",id:"final-summary",level:2}];function h(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"In the NEAR tutorial, there is a section about ownership verification. It is just a short section, and on firts pass, it was not clear to me so below find a more detailed explanation."}),"\n",(0,t.jsx)(n.h1,{id:"1-context-an-auction-contract-that-sells-nfts",children:"1. Context: An Auction Contract That Sells NFTs"}),"\n",(0,t.jsx)(n.h2,{id:"auction-contract-overview",children:"Auction Contract Overview"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Typically, an auction contract allows users to bid on some item (in this case, an NFT) over a set period."}),"\n",(0,t.jsx)(n.li,{children:"At the end of the auction, the highest bidder wins and should receive the NFT."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"implicit-assumption",children:"Implicit Assumption"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The auction contract ",(0,t.jsx)(n.strong,{children:"should"})," have the right to transfer the NFT from itself to the winning bidder."]}),"\n",(0,t.jsx)(n.li,{children:"This means that, ideally, the auction contract actually owns (or controls) the NFT during the auction."}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"2-the-problem-no-on-chain-check-for-ownership",children:"2. The Problem: No On-Chain Check for Ownership"}),"\n",(0,t.jsx)(n.h2,{id:"whats-missing",children:"What\u2019s Missing?"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["In the given scenario, the contract does ",(0,t.jsx)(n.strong,{children:"not"})," verify whether it truly owns (or is approved to transfer) the NFT it\u2019s auctioning."]}),"\n",(0,t.jsx)(n.li,{children:"There is no function call or logic that checks \u201cDoes this contract really own NFT X?\u201d before letting people bid."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"how-a-bad-actor-exploits-this",children:"How a Bad Actor Exploits This"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["A malicious user (the \u201cbad actor\u201d) can create or initialize an auction listing an NFT that the contract doesn\u2019t own.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["For example, they specify \u201cToken ID = 123 from NFT Contract XYZ,\u201d but the auction contract never actually possessed token ",(0,t.jsx)(n.strong,{children:"123"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"The contract starts accepting bids from unsuspecting bidders."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"when-the-auction-ends",children:"When the Auction Ends"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The winning bidder expects the auction contract to transfer the NFT."}),"\n",(0,t.jsxs)(n.li,{children:["The contract attempts an ",(0,t.jsx)(n.code,{children:"nft_transfer"})," to the winner."]}),"\n",(0,t.jsxs)(n.li,{children:["But because the auction contract is not actually the owner (and was never approved), this ",(0,t.jsx)(n.code,{children:"nft_transfer"})," call fails."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"impact-on-the-winning-bidder",children:"Impact on the Winning Bidder"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The winning bidder has already paid their bid amount into the auction contract (in NEAR tokens or whatever the currency is)."}),"\n",(0,t.jsx)(n.li,{children:"Now they receive no NFT in return."}),"\n",(0,t.jsx)(n.li,{children:"The contract might not have any built-in refund mechanism for a failed transfer, so the bidder could lose their funds."}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"3-why-not-just-check-on-chain",children:"3. Why Not Just Check On-Chain?"}),"\n",(0,t.jsx)(n.h2,{id:"the-naive-ideal-fix",children:"The Naive \u201cIdeal\u201d Fix"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["One straightforward solution would be:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Upon auction creation"}),", call the NFT contract (via cross-contract call) to verify that ",(0,t.jsx)(n.code,{children:"owner_id == auction_contract"})," or that ",(0,t.jsx)(n.code,{children:"auction_contract"})," is approved for the token."]}),"\n",(0,t.jsx)(n.li,{children:"If the check fails, reject the auction creation."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"complexity-of-cross-contract-calls",children:"Complexity of Cross-Contract Calls"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Cross-contract calls add more complexity:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"You need to handle asynchronous callbacks, error states, etc."}),"\n",(0,t.jsx)(n.li,{children:"It increases the amount of gas usage, plus you must carefully handle reverts or partial failures."}),"\n",(0,t.jsx)(n.li,{children:"If you\u2019re building multiple checks for different NFTs, the logic can become quite extensive."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"4-the-interim-solution-off-chain-validation",children:"4. The Interim Solution: Off-Chain Validation"}),"\n",(0,t.jsx)(n.h2,{id:"frontend-or-off-chain-logic",children:"Frontend or Off-Chain Logic"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Instead of making the contract do the ownership verification, the developer can implement a check in their web app or server that:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Calls the NFT contract\u2019s ",(0,t.jsx)(n.code,{children:"nft_token(token_id)"})," method (or an equivalent) to see who currently owns that NFT."]}),"\n",(0,t.jsx)(n.li,{children:"Validates that the current owner is actually the auction contract (or that the auction contract is at least approved to transfer the NFT)."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"reject-invalid-auctions-before-bidding",children:"Reject Invalid Auctions Before Bidding"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"If the check reveals the contract doesn\u2019t truly own or control the NFT, the frontend can prevent anyone from placing a bid."}),"\n",(0,t.jsx)(n.li,{children:"This way, legitimate users never see or bid on invalid auctions."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"why-this-works",children:"Why This Works"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Although it\u2019s not as trustless as an on-chain check, most real-world dApps already rely heavily on the frontend for user experience."}),"\n",(0,t.jsx)(n.li,{children:"If you only show valid auctions on the user interface, you significantly reduce the chance that someone accidentally bids on a fraudulent auction."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"trade-off",children:"Trade-Off"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The downside is that if someone interacts with the contract directly via a CLI or another custom interface (skipping your official frontend), they could still place a bid on a fraudulent auction."}),"\n",(0,t.jsx)(n.li,{children:"However, in many dApp ecosystems, most users interact via the official UI, so off-chain checks often suffice in practice."}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"5-recap-of-the-steps",children:"5. Recap of the Steps"}),"\n",(0,t.jsx)(n.h2,{id:"auction-creation",children:"Auction Creation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The malicious user calls your auction contract\u2019s ",(0,t.jsx)(n.code,{children:"start_auction"})," method, claiming there\u2019s an NFT with token ID \u201c123\u201d up for sale."]}),"\n",(0,t.jsx)(n.li,{children:"The contract does no checks to see if it really owns that NFT."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bidding",children:"Bidding"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Other users see the auction, place bids, and deposit funds into the contract."}),"\n",(0,t.jsx)(n.li,{children:"Everyone believes the NFT is genuinely controlled by the auction contract."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"auction-ends",children:"Auction Ends"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The highest bidder wins."}),"\n",(0,t.jsxs)(n.li,{children:["The contract attempts to do an ",(0,t.jsx)(n.code,{children:"nft_transfer"})," of token \u201c123\u201d from itself to the winner."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"transfer-fails",children:"Transfer Fails"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The NFT contract says, \u201cYou\u2019re not the owner; you can\u2019t transfer.\u201d"}),"\n",(0,t.jsx)(n.li,{children:"The winner gets nothing. Potentially, their funds are stuck."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"proposed-on-chain-fix-complex",children:"Proposed On-Chain Fix (Complex)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Right when the auction is created, do a cross-contract call to the NFT contract to confirm ownership."}),"\n",(0,t.jsx)(n.li,{children:"If ownership is not confirmed, the auction creation fails."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"chosen-solution-for-simplicity",children:"Chosen Solution (For Simplicity)"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Perform an ",(0,t.jsx)(n.strong,{children:"off-chain"})," ownership check in the frontend."]}),"\n",(0,t.jsx)(n.li,{children:"Only display auctions that pass this verification."}),"\n",(0,t.jsx)(n.li,{children:"This prevents most users from ever bidding on a fraudulent auction."}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"6-key-takeaways",children:"6. Key Takeaways"}),"\n",(0,t.jsx)(n.h2,{id:"importance-of-ownership-verification",children:"Importance of Ownership Verification"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Always confirm that the contract ",(0,t.jsx)(n.strong,{children:"actually controls"})," the NFT before allowing auctions or sales."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"security-vs-complexity",children:"Security vs. Complexity"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"On-chain checks are more secure/trustless but more complex. Off-chain checks reduce complexity but rely on a trusted frontend."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"refunds",children:"Refunds"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If you do rely on off-chain checks, we can consider adding a fallback mechanism in your contract that ",(0,t.jsx)(n.strong,{children:"refunds bidders if the NFT transfer fails"}),". That way, nobody loses funds if, somehow, an invalid auction slips through."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"best-practice",children:"Best Practice"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If time and resources allow, implement ",(0,t.jsx)(n.strong,{children:"both"}),":","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"On-chain checks that prevent fraudulent auctions from even existing, and"}),"\n",(0,t.jsx)(n.li,{children:"Off-chain checks in the UI for additional caution and user clarity."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"final-summary",children:"Final Summary"}),"\n",(0,t.jsx)(n.p,{children:"In short, the contract never verifies that it actually owns the NFT being auctioned, leaving a loophole for malicious auctions. Fully solving this on-chain involves writing a cross-contract call to the NFT contract to confirm ownership before starting an auction. Because cross-contract logic can be cumbersome, a simpler (though less trustless) approach is to do ownership checks off-chain (e.g., in the frontend) and only display auctions that are verifiably valid."})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var t=i(6540);const o={},s=t.createContext(o);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);