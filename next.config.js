const withSass = require('@zeit/next-sass');
const isProd = (process.env.NODE_ENV || 'production') === 'production';

module.exports = withSass({
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  assetPrefix: isProd ? '/algodom' : '',
});
