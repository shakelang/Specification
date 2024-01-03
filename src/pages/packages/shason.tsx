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
  title: "Shason API",
  tagline: "Shason is a multiplattform compatible parser/serializer for JSON",
  description:
    "Shason is a multiplattform compatible parser/serializer for JSON",
  button_text: "Gettings started - 5min ⏱️",
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
            to="/packages/shason/intro"
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
            href="https://dokka.shakelang.com/util/shason"
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
              title: "Easy to Use",
              Svg: undraw_portfolio_update,
              description: (
                <>
                  Json is one of the most used data formats in the world. Shason
                  is a kotlin-multiplattform compatible parser/serializer for
                  JSON. The API is designed to be easy to use and to be
                  compatible with all platforms. Additionally shason offers
                  type-safety!
                </>
              ),
            },
            {
              title: "Focus on What Matters",
              Svg: undraw_note_list,
              description: (
                <>
                  Don&apos;t worry about implementations for different
                  platforms. Shason works on all of them without any need to
                  worry about it.
                </>
              ),
            },
            {
              title: "Flexible",
              Svg: undraw_product_iteration,
              description: (
                <>
                  If you decide to add support to a new platform, you don&apos;t
                  need to worry about rewriting the logic for another JSON
                  parser/serializer for that platform.
                </>
              ),
            },
          ]}
        />
      </main>
    </Layout>
  );
}
