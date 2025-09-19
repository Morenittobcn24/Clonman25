module.exports = {
  admin: {
    watchIgnoreFiles: [
      '**/admin/src/extensions/**',
      '**/admin/extensions/**',
      '**/public/uploads/**',
      '**/build/**',
      '**/dist/**',
      '**/.git/**',
      '**/node_modules/**'
    ],
  },
  server: {
    autoReload: {
      enabled: false
    }
  }
};