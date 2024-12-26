"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[634],{6467:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});var n=a(8774),s=a(4586),r=a(781),i=a(1107);const o={featuresContainer:"featuresContainer_Xi_N",featuresGrid:"featuresGrid_fVmD",projectLink:"projectLink_CAhR",featureCard:"featureCard_QAQr",featureTopRow:"featureTopRow_sPvQ",featureTitleTop:"featureTitleTop_Qt1Q",featureImageContainer:"featureImageContainer_f34k",featureImage:"featureImage_n6ct",featureOverlay:"featureOverlay_l2C6",featureBioContent:"featureBioContent_EN_5",featureDescription:"featureDescription_sP1D",button:"button_JCkq","button--secondary":"button--secondary_ZWbZ","button--lg":"button--lg_EI7n"};var l=a(4848);const c=[{title:"About Phoenix Pulsar",href:"/blog/welcome",src:"",description:"Howdy! Welcome to my notes on technology. In this space, I will document my learning journey into the technologies I am particularly interested in. This serves as a personal repository, a place to bookmark concepts, put ideas into my own words, and create cheat sheets for quick reference. Hopefully, this might also help someone else who shares an interest in these technologies. We\u2019ll be diving into topics like the NEAR blockchain and developer productivity, which are currently at the top of the list. But I\u2019ll definitely stay curious and wander down interesting tangents as they come up.Follow along as I embrace confusion, stumble through the process, and learn while building some cool stuff!"},{title:"Ordo One Encryption App",href:"https://ordo-one-app.web.app/",src:"img/ordo.gif",description:"An encryption app built as a learning playground to explore cryptography concepts like hashing and encryption. While Firebase was used for hosting, this project also served as a sandbox to experiment with Firebase Functions, Firebase Authentication, and the Stripe API. Built without modern frameworks, it relies solely on modern JavaScript and a few NPM libraries (GSAP, Firebase, and SASS). I explored GSAP's timeline features for animation orchestration and added PWA functionality, making this app a standalone, installable PWA."},{title:"NGINX Server",href:"https://phoenixpulsar.ink/",src:"img/my-server.gif",description:"In this project, I set up a VPS (Ubuntu droplet) on DigitalOcean and secured it by disabling root access and configuring SSH keys. After purchasing a domain, I updated the name servers to point to DigitalOcean and linked the domain to the server. Next, I installed HTTPS using Certbot, created a Node.js API, and used PM2 to manage its continuous operation and handle automatic restarts. I added NGINX as a reverse proxy and completed the setup with a custom HTML welcome page."}];function d(e){let{title:t,description:a,href:n,src:s,isBio:r}=e;return r?(0,l.jsx)("a",{href:"{href}",className:o.projectLink,children:(0,l.jsxs)("div",{className:o.featureCard,children:[(0,l.jsx)("div",{className:o.featureTopRow,children:(0,l.jsx)("h3",{className:o.featureTitleTop,children:t})}),(0,l.jsx)("div",{className:o.featureBioContent,children:(0,l.jsx)("p",{className:o.featureDescription,children:a})})]})}):(0,l.jsx)("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:o.projectLink,children:(0,l.jsxs)("div",{className:o.featureCard,children:[(0,l.jsx)("div",{className:o.featureTopRow,children:(0,l.jsx)("h3",{className:o.featureTitleTop,children:t})}),(0,l.jsxs)("div",{className:o.featureImageContainer,children:[s&&(0,l.jsx)("img",{src:s,alt:`${t} GIF`,className:o.featureImage}),(0,l.jsx)("div",{className:o.featureOverlay,children:(0,l.jsx)("p",{className:o.featureDescription,children:a})})]})]})})}function u(){return(0,l.jsxs)("div",{className:o.featuresContainer,children:[(0,l.jsx)("h1",{children:"Featured Projects"}),(0,l.jsx)("section",{className:o.featuresGrid,children:c.map(((e,t)=>(0,l.jsx)(d,{...e,isBio:0===t},t)))})]})}const h={buttons:"buttons_AeoN"};function p(){const{siteConfig:e}=(0,s.A)();return(0,l.jsxs)("header",{children:[(0,l.jsx)(i.A,{as:"h1",children:e.title}),(0,l.jsx)("p",{className:"",children:e.tagline}),(0,l.jsxs)("div",{className:h.buttons,children:[(0,l.jsx)(n.A,{className:"button button--secondary button--lg",to:"/docs/intro",children:"Tech Notes"}),(0,l.jsx)(n.A,{className:"button button--secondary button--lg",to:"/blog",children:"Blog"})]})]})}function f(){const{siteConfig:e}=(0,s.A)();return(0,l.jsxs)(r.A,{title:`${e.title}`,description:"Tech Notes and Blog",children:[(0,l.jsx)(p,{}),(0,l.jsx)("main",{children:(0,l.jsx)(u,{})})]})}}}]);