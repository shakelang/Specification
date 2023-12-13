import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { NavbarItem } from "@docusaurus/theme-common";

interface DocEntry {
  readonly label?: string;
  readonly index?: string;
  readonly id: string;
  readonly path: string;
  readonly url: string;
}

const docs: readonly DocEntry[] = [
  {
    label: "Bytecode",
    id: "bytecode",
    path: "specification/bytecode",
    url: "bytecode",
    index: "instructions",
  },
  {
    label: "Compiler",
    id: "compiler",
    path: "specification/compiler",
    url: "compiler",
    index: "flow",
  },
];

const config: Config = {
  title: "Shake Programming Language",
  tagline: "A statically typed, compiled, and garbage collected language",
  favicon: "img/favicon.ico",
  staticDirectories: ["static"],

  url: "https://specification.shakelang.com",

  baseUrl: "/",

  organizationName: "shakelang",
  projectName: "shake",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/shakelang/specification/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "ShakeSpec",
      logo: {
        alt: "Shake Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://shakelang.com",
          label: "Website",
          position: "left",
        },
        ...docs
          .filter((doc) => doc.label && doc.index)
          .map(
            (doc) =>
              ({
                to: `/${doc.url}/${doc.index}`,
                label: doc.label,
                position: "left",
              } satisfies NavbarItem)
          ),
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
              href: "https://shakelang.com/blog",
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
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    ...docs.map((doc) => [
      "@docusaurus/plugin-content-docs",
      {
        id: doc.id,
        path: doc.path,
        routeBasePath: doc.url,
        sidebarPath: require.resolve("./sidebars.ts"),
      },
    ]),
  ],
};

export default config;
