/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://reactblueprint.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  exclude: ['/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
