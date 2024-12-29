import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: "About Phoenix Pulsar",
    href: "/blog/welcome",
    src: "",
    description:
      "Howdy! Welcome to my notes on technology. In this space, I will document my learning journey into the technologies I am particularly interested in. This serves as a personal repository, a place to bookmark concepts, put ideas into my own words, and create cheat sheets for quick reference. Hopefully, this might also help someone else who shares an interest in these technologies. We’ll be diving into topics like the NEAR blockchain and developer productivity, which are currently at the top of the list. But I’ll definitely stay curious and wander down interesting tangents as they come up.Follow along as I embrace confusion, stumble through the process, and learn while building some cool stuff!",
  },
  {
    title: "Ordo One Encryption App",
    href: "https://ordo-one-app.web.app/",
    src: "img/ordo.gif",
    description:
      "An encryption app built as a learning playground to explore cryptography concepts like hashing and encryption. While Firebase was used for hosting, this project also served as a sandbox to experiment with Firebase Functions, Firebase Authentication, and the Stripe API. Built without modern frameworks, it relies solely on modern JavaScript and a few NPM libraries (GSAP, Firebase, and SASS). I explored GSAP's timeline features for animation orchestration and added PWA functionality, making this app a standalone, installable PWA.",
  },
  {
    title: "NEAR Login Starter Template",
    href: "https://github.com/phoenixpulsar/near-wallet-login-starter",
    src: "img/near-login-starter.gif",
    description:
      "Created a streamlined NEAR login template by simplifying the code from the NEAR tutorial and retaining only the core login logic. This template is an ideal starting point for building a login system for dApps and serves as the foundation for various sample projects",
  },
  {
    title: "NGINX Server",
    href: "https://phoenixpulsar.ink/",
    src: "img/my-server.gif",
    description:
      "In this project, I set up a VPS (Ubuntu droplet) on DigitalOcean and secured it by disabling root access and configuring SSH keys. After purchasing a domain, I updated the name servers to point to DigitalOcean and linked the domain to the server. Next, I installed HTTPS using Certbot, created a Node.js API, and used PM2 to manage its continuous operation and handle automatic restarts. I added NGINX as a reverse proxy and completed the setup with a custom HTML welcome page.",
  },
];

function Feature({ title, description, href, src, isBio }) {
  if (isBio) {
    return (
      <a href="{href}" className={styles.projectLink}>
        <div className={styles.featureCard}>
          {/* Title Row at the Top */}
          <div className={styles.featureTopRow}>
            <h3 className={styles.featureTitleTop}>{title}</h3>
          </div>

          {/* Bio Content */}
          <div className={styles.featureBioContent}>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
      >
        <div className={styles.featureCard}>
          {/* Title Row at the Top */}
          <div className={styles.featureTopRow}>
            <h3 className={styles.featureTitleTop}>{title}</h3>
          </div>

          {/* Image Container */}
          <div className={styles.featureImageContainer}>
            {src && (
              <img
                src={src}
                alt={`${title} GIF`}
                className={styles.featureImage}
              />
            )}
            {/* Overlay Content */}
            <div className={styles.featureOverlay}>
              <p className={styles.featureDescription}>{description}</p>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default function HomepageFeatures() {
  return (
    <div className={styles.featuresContainer}>
      <h1>Featured Projects</h1>
      <section className={styles.featuresGrid}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} isBio={idx === 0} />
        ))}
      </section>
    </div>
  );
}
