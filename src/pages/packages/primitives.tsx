import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import React from "react";

import undraw_portfolio_update from "@site/static/img/undraw_portfolio_update.svg";
import undraw_note_list from "@site/static/img/undraw_note_list.svg";
import undraw_product_iteration from "@site/static/img/undraw_product_iteration.svg";

import styles from "../index.module.css";

const settings = {
  title: "Primitives API",
  tagline: "Primitive types enhanced 🚀",
  description:
    "Primitives is a kotlin-multiplattform library for enhanced work with primitive types",
  button_text: "Gettings started - 2min ⏱️",
};

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {settings.title}
        </Heading>
        <p className="hero__subtitle">{settings.tagline}</p>
        <div className={styles.button}>
          <Link
            className="button button--secondary button--lg"
            to="/packages/primitives/intro"
          >
            {settings.button_text}
          </Link>
        </div>

        <p
          className="hero__subtitle"
          style={{
            marginTop: "0.5rem",
            fontSize: "1rem",
          }}
        >
          <a
            href="https://dokka.shakelang.com/util/primitives"
            style={{
              color: "var(--ifm-font-color-base-inverse)",
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            ...or read the API Reference 📖
          </a>
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Hello from ${settings.title}`}
      description={settings.description}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures
          FeatureList={[
            {
              title: "Flexible",
              Svg: undraw_product_iteration,
              description: (
                <>
                  You can use the primitives library to enhance your work with
                  primitive types. It extends the standard library with useful
                  functions and classes. You are still working with the same
                  types, no wrappers around them are needed.
                </>
              ),
            },
            {
              title: "Easy to Use",
              Svg: undraw_portfolio_update,
              description: (
                <>
                  The primitives library is designed to be easy to use and
                  follow the design of the standard library. The whole API aims
                  to be intuitive and easy to understand.
                </>
              ),
            },
            {
              title: "Performance",
              Svg: undraw_note_list,
              description: (
                <>
                  When working with primitive types, performance is key. The
                  primitives library is designed with performance in mind. No
                  overhead is added, by wrapping types into classes.
                </>
              ),
            },
          ]}
        />
      </main>
    </Layout>
  );
}
