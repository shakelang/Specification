import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import undraw_portfolio_update from "@site/static/img/undraw_portfolio_update.svg";
import undraw_note_list from "@site/static/img/undraw_note_list.svg";
import undraw_warning_re_eoyh from "@site/static/img/undraw_warning_re_eoyh.svg";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures
          FeatureList={[
            {
              title: "WARNING",
              Svg: undraw_warning_re_eoyh,
              description: (
                <>
                  Shake is still in early development. It is not ready for
                  production. At the moment I (the creator) am the only one
                  working on it. If you want to help and contribute, please
                  contact me.
                </>
              ),
            },
            {
              title: "Easy to Use",
              Svg: undraw_portfolio_update,
              description: (
                <>
                  Shake is a multiplattform compatible programming language. It
                  is easy to learn and use. It combines the best parts of
                  kotlin, typescript and java.
                </>
              ),
            },
            {
              title: "Focus on What Matters",
              Svg: undraw_note_list,
              description: (
                <>
                  Just write your code and think about the logic. Shake will
                  take care of the rest. It will compile your code to native
                  code for the target
                </>
              ),
            },
          ]}
        />
      </main>
    </Layout>
  );
}
