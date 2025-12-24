import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>
      🧱 ReactBlueprint
    </span>
  ),
  project: {
    link: 'https://github.com/reactblueprint/reactblueprint',
  },
  docsRepositoryBase: 'https://github.com/reactblueprint/reactblueprint/tree/main',
  primaryHue: 24,
  primarySaturation: 95,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    float: true,
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  footer: {
    text: `© ${new Date().getFullYear()} ReactBlueprint. MIT License.`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – ReactBlueprint',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="ReactBlueprint - Modern React patterns and conventions for scalable applications" />
      <meta name="og:title" content="ReactBlueprint" />
      <meta name="og:description" content="Build Scalable React Apps The Right Way" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
};

export default config;
