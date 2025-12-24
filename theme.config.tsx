import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';

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
    const { asPath } = useRouter();
    if (asPath === '/') {
      return {
        titleTemplate: 'ReactBlueprint – Build Scalable React Apps',
      };
    }
    return {
      titleTemplate: '%s – ReactBlueprint',
    };
  },
  head: function Head() {
    const { asPath } = useRouter();
    const { frontMatter, title } = useConfig();

    const url = `https://reactblueprint.dev${asPath}`;
    const description = frontMatter.description || 'Modern React patterns and conventions for scalable applications';
    const ogTitle = title ? `${title} – ReactBlueprint` : 'ReactBlueprint';

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://reactblueprint.dev/og-image.png" />
        <meta property="og:site_name" content="ReactBlueprint" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://reactblueprint.dev/og-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#f97316" />
      </>
    );
  },
};

export default config;
