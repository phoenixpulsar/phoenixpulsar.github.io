"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[904],{2775:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var a=n(4848),i=n(8453);const o={slug:"block-forever",title:"Do things live in the blockchain forever?",authors:["phoenixpulsar"]},s=void 0,r={permalink:"/blog/block-forever",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2021-12-26-block-forever/index.md",source:"@site/blog/2021-12-26-block-forever/index.md",title:"Do things live in the blockchain forever?",description:"On most blockchains, including NEAR, transactions and blocks are indeed immutable. Once a transaction is finalized and added to the blockchain, it cannot be altered or deleted. This immutability ensures transparency and trust within the blockchain system.",date:"2021-12-26T00:00:00.000Z",tags:[],readingTime:1.725,hasTruncateMarker:!1,authors:[{name:"Phoenix Pulsar",title:"Technomancer of Code and Connection",url:"https://github.com/phoenixpulsar",page:{permalink:"/blog/authors/phoenixpulsar"},socials:{x:"https://x.com/pulsar_phoenix",github:"https://github.com/phoenixpulsar"},imageURL:"https://github.com/phoenixpulsar.png",key:"phoenixpulsar"}],frontMatter:{slug:"block-forever",title:"Do things live in the blockchain forever?",authors:["phoenixpulsar"]},unlisted:!1,nextItem:{title:"Welcome",permalink:"/blog/welcome"}},c={authorsImageUrls:[void 0]},l=[];function h(e){const t={p:"p",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"On most blockchains, including NEAR, transactions and blocks are indeed immutable. Once a transaction is finalized and added to the blockchain, it cannot be altered or deleted. This immutability ensures transparency and trust within the blockchain system."}),"\n",(0,a.jsx)(t.p,{children:"However, not all data is stored in the blockchain itself. Smart contract state\u2014the data stored by a smart contract\u2014is managed differently. While the blockchain keeps a record of transactions that update this state, the actual state itself exists as part of the account's storage in NEAR."}),"\n",(0,a.jsx)(t.p,{children:"Deleting Contract State in NEAR"}),"\n",(0,a.jsx)(t.p,{children:"In NEAR, it is possible to delete a contract's state. When this happens:"}),"\n",(0,a.jsx)(t.p,{children:"The state associated with the contract is removed from the account storage."}),"\n",(0,a.jsx)(t.p,{children:"Any funds locked in the contract's storage are refunded to the account owner or a designated recipient."}),"\n",(0,a.jsx)(t.p,{children:"The transaction that performed the deletion remains on the blockchain as an immutable record."}),"\n",(0,a.jsx)(t.p,{children:"This process is intentional and designed for flexibility. For example, developers may choose to delete a contract after it is no longer needed or to redeploy a new version of the contract. The ability to clean up unused contracts helps manage storage costs, which are incurred for storing data on NEAR."}),"\n",(0,a.jsx)(t.p,{children:"Does This Mean the Blockchain Isn\u2019t Permanent?"}),"\n",(0,a.jsx)(t.p,{children:'No, the blockchain\u2019s core immutability remains intact. The history of all transactions, including the one that deletes the contract state, is permanently recorded. What\u2019s being "deleted" is the state data stored for that specific account, not the record of its existence or the transactions associated with it.'}),"\n",(0,a.jsx)(t.p,{children:"This distinction is crucial: immutability applies to the blockchain's ledger, not necessarily to all the data managed by smart contracts."}),"\n",(0,a.jsx)(t.p,{children:"Key Takeaways"}),"\n",(0,a.jsx)(t.p,{children:"Transactions and blocks are immutable and permanently recorded on the blockchain."}),"\n",(0,a.jsx)(t.p,{children:"Smart contract state can be deleted, but the transaction that triggered the deletion is permanently logged."}),"\n",(0,a.jsx)(t.p,{children:"Deleting contract state is a practical feature for managing costs and maintaining the system\u2019s efficiency."}),"\n",(0,a.jsx)(t.p,{children:"Understanding these nuances helped me appreciate the flexibility of NEAR's design while recognizing the underlying permanence of blockchain records. It\u2019s a balance between immutability for trust and adaptability for real-world use cases."})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>r});var a=n(6540);const i={},o=a.createContext(i);function s(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);