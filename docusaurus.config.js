/** @type {import('@docusaurus/types').Config} */

const specifications = ["bytecode"];

const config = {
  title: "Shake Programming Language",
  tagline: "A statically typed, compiled, and garbage collected language",
  favicon: "img/favicon.ico",
  staticDirectories: ["static"],

  // Set the production url of your site here
  url: "https://specification.shakelang.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "shakelang", // Usually your GitHub org/user name.
  projectName: "shake", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/shakelang/shakelang.github.io/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/shakelang/shakelang.github.io/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Shake",
        logo: {
          alt: "Shake Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          {
            to: "/specification",
            label: "Specification",
            position: "left",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/shakelang/shake",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/shake",
              },
              {
                label: "Discord",
                href: "https://discord.gg/kXjgJ4gV9K",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/shakelang",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/shakelang/shake",
              },
              {
                label: "Contact",
                href: "mailto:contact@shakelang.com",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nicolas Schmidt. Built with Docusaurus.`,
      },
    }),
  plugins: [
    "docusaurus-plugin-sass" /*
    ...specifications.map((spec) => [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */ /*
      ({
        id: spec,
        path: `docs/${spec}`,
        routeBasePath: spec,
        editUrl: ({ docPath }) => {
          return `https://github.com/shakelang/specification/blob/master/${docPath}`;
        },
      }),
    ]),
    */,
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        editLocalizedFiles: false,
        editCurrentVersion: false,
        routeBasePath: "bytecode",
        path: "docs/bytecode",
        sidebarPath: "sidebars.js",
        id: "bytecode",
        // disableVersioning: true,
        //versions: {},
      }),
    ],
  ],
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
};

module.exports = config;
