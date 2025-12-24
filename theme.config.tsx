import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Fix search scroll issue
const useFixSearchScroll = () => {
  useEffect(() => {
    const searchInput = document.querySelector('.nextra-search input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const scrollY = window.scrollY;
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      });
    }
  }, []);
};

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/logo.svg" alt="" height={28} width={28} />
      <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>ReactBlueprint</span>
    </div>
  ),
  project: {
    link: 'https://github.com/milos-micke-mitrovic/react-blueprint',
  },
  docsRepositoryBase: 'https://github.com/milos-micke-mitrovic/react-blueprint/tree/main',
  primaryHue: 24,
  primarySaturation: 95,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },
  toc: {
    float: true,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  footer: {
    text: '© 2026 ReactBlueprint. MIT License.',
  },
  main: ({ children }) => (
    <>
      {children}
      <Analytics />
    </>
  ),
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
    useFixSearchScroll();

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
        <meta property="og:image" content="https://reactblueprint.dev/logo.png" />
        <meta property="og:site_name" content="ReactBlueprint" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://reactblueprint.dev/logo.png" />

        {/* Favicon - SVG primary, PNG fallback */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#f97316" />
      </>
    );
  },
};

export default config;
