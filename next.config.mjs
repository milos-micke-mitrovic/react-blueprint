import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  defaultShowCopyCode: true,
  flexsearch: true,
});

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started/tech-stack',
        permanent: true,
      },
    ];
  },
});
