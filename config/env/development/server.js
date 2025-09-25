module.exports = ({ env }) => ({
  flags: {
    noBuild: true,
  },
  watchIgnoreFiles: ['**/data/**', '**/config/**', '**/package.json', '**/package-lock.json'],
  admin: {
    autoOpen: false,
    watchIgnoreFiles: ['**/data/**', '**/config/**'],
  },
  typescript: false,
});