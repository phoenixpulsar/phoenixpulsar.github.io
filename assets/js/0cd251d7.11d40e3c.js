"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[147],{5854:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var o=t(4848),s=t(8453);const i={sidebar_position:1},a="Basic Auction Notes",r={id:"NEAR/basic-auction",title:"Basic Auction Notes",description:"Intro",source:"@site/docs/NEAR/basic-auction.md",sourceDirName:"NEAR",slug:"/NEAR/basic-auction",permalink:"/docs/NEAR/basic-auction",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/NEAR/basic-auction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Docker Setup to Learn Ansible",permalink:"/docs/DEVELOPER PRODUCTIVITY/docker-setup"}},c={},d=[{value:"Intro",id:"intro",level:2},{value:"About",id:"about",level:2},{value:"Running Test Error",id:"running-test-error",level:2},{value:"What will the winner of the auction get?",id:"what-will-the-winner-of-the-auction-get",level:2},{value:"Borsh JSON (de)serialization",id:"borsh-json-deserialization",level:2},{value:"Build Options",id:"build-options",level:2},{value:"Deployment Logs",id:"deployment-logs",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"basic-auction-notes",children:"Basic Auction Notes"})}),"\n",(0,o.jsx)(n.h2,{id:"intro",children:"Intro"}),"\n",(0,o.jsxs)(n.p,{children:["Following the ",(0,o.jsx)(n.a,{href:"https://docs.near.org/tutorials/auction/basic-auction",children:"NEAR tutorial"}),", while adding notes and about questions and thoughts that come up."]}),"\n",(0,o.jsx)(n.h2,{id:"about",children:"About"}),"\n",(0,o.jsx)(n.p,{children:"This tutorial walks us through creating an auction that allows users to bid."}),"\n",(0,o.jsx)(n.h2,{id:"running-test-error",children:"Running Test Error"}),"\n",(0,o.jsx)(n.p,{children:"If you try to run the auction test you might get an error like this:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"error: package `deranged v0.3.11` cannot be built because it requires rustc 1.67.0 or newer, while the currently active rustc version is 1.66.0\nEither upgrade to rustc 1.67.0 or newer, or use\ncargo update -p deranged@0.3.11 --precise ver\nwhere `ver` is the latest version of `deranged` supporting rustc 1.66.0\n"})}),"\n",(0,o.jsx)(n.p,{children:"This is because the rust version is outdated. To update it, run the following command:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"rustup update stable\n"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"rustup"}),": The Rust toolchain installer and version manager.\n",(0,o.jsx)(n.code,{children:"update"}),": The subcommand to fetch and install updates.\n",(0,o.jsx)(n.code,{children:"stable"}),": Specifies the channel you want to update, in this case, the stable channel."]}),"\n",(0,o.jsx)(n.h2,{id:"what-will-the-winner-of-the-auction-get",children:"What will the winner of the auction get?"}),"\n",(0,o.jsx)(n.p,{children:"For the purpose of this tutorial, there is not a defined thing a winner gets. In other words, we can say its mostly for book keeping purposes, and letting us understand the some main ideas of NEAR such as what a smart contract code looks like, test it and deploy it. In reality, the winner could get an NFT or anything and use the auction as a way to delegate who actualy wins."}),"\n",(0,o.jsx)(n.h2,{id:"borsh-json-deserialization",children:"Borsh JSON (de)serialization"}),"\n",(0,o.jsx)(n.p,{children:"Serialization is the process of converting data into a format that can be stored or transmitted and then reconstructed later."}),"\n",(0,o.jsx)(n.p,{children:"When storing data persistently in the blockchain state, we can Borsh because:\nIt is more compact than JSON, which saves on storage costs.\nIt is faster to serialize/deserialize, improving contract execution performance.\nBorsh - not human readable"}),"\n",(0,o.jsx)(n.h2,{id:"build-options",children:"Build Options"}),"\n",(0,o.jsxs)(n.p,{children:["The tutorial does not specify which of the two build options to use between ",(0,o.jsx)(n.code,{children:"reproducible-wasm"})," and ",(0,o.jsx)(n.code,{children:"non-reproducible-wasm"}),". If you try to run ",(0,o.jsx)(n.code,{children:"reproducible-wasm"})," you might get an error like this:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"An error with Cargo.lock has been encountered...\nYou can choose to disable `--locked` flag for downstream `cargo` command by adding `--no-locked` flag OR by removing `--locked` flag\n\nPlease mind that `--no-locked` flag is allowed in Docker builds, but:\n  - such builds are not reproducible due to potential update of dependencies and compiled `wasm` mismatch as the result.\n\nCargo.lock check was performed against git version of code.\nDon't forget to check in Cargo.lock into source code for deploy if it's git-ignored...\n\u2022 failed\n\nHere is the console command if you ever need to re-run it again:\ncargo near build reproducible-wasm\n\n"})}),"\n",(0,o.jsx)(n.p,{children:"The error occurs because the Cargo.lock file is missing or outdated. The --locked flag enforces a strict use of the exact dependency versions specified in Cargo.lock for reproducible builds. If Cargo.lock is not present or updated, builds may fail or become non-reproducible. To resolve, update or check in the Cargo.lock file (which is typically committed to version control) into source control or disable the --locked flag with --no-locked to maintain build integrity."}),"\n",(0,o.jsxs)(n.p,{children:["For the tutorial, I used the ",(0,o.jsx)(n.code,{children:"non-reproducible-wasm"})," build option."]}),"\n",(0,o.jsx)(n.h2,{id:"deployment-logs",children:"Deployment Logs"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"near deploy ppulsarbasicauction0.testnet ./target/near/auction_contract.wasm\n\nUnsigned transaction:\n\nsigner_id:    ppulsarbasicauction0.testnet\nreceiver_id:  ppulsarbasicauction0.testnet\nactions:\n   -- deploy contract FBG5PVt7q7z3j7ipk3MqTLUZYecnyCZKrFQC4w4adDxn\n\n\u25b9\u25b9\u25b9\u25b8\u25b9 Signing the transaction with a key saved in the secure keychain ...\nYour transaction was signed successfully.\nPublic key: ed25519:CEoHDc4rmF8KutUq7mx6X8gmdTR5112mTDtPnHVvZwEo\nSignature: ed25519:1CGdT3jwd2URnNA2kga7WCJG8UUVRLEJDQpL892UGtfvQquTJw9ywzuwDodrciSCqP483TgLMNHCkzY8Bejb89t\n\u25b9\u25b9\u25b8\u25b9\u25b9 Sending transaction ...\n--- Logs ---------------------------\nLogs [ppulsarbasicauction0.testnet]:   No logs\n--- Result -------------------------\nEmpty result\n------------------------------------\n\nContract code has been successfully deployed.\n\nGas burned: 8.7 Tgas\nTransaction fee: 0.0008600792794097 NEAR\nTransaction ID: 5yAin971RNZVbiNEfBHZ47xAssxQjLtGiQj9PnF2beTk\nTo see the transaction in the transaction explorer, please open this url in your browser:\nhttps://explorer.testnet.near.org/transactions/5yAin971RNZVbiNEfBHZ47xAssxQjLtGiQj9PnF2beTk\n\n"})}),"\n",(0,o.jsx)(n.p,{children:"The near deploy command deploys a smart contract to the ppulsarbasicauction0.testnet account on the NEAR blockchain. The unsigned transaction, specifying the account and contract, is signed securely using a stored private key. After signing, the transaction is sent to the network, successfully deploying the contract. The process includes logging the transaction ID, signature, and associated costs (gas burned and transaction fee)."})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var o=t(6540);const s={},i=o.createContext(s);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);