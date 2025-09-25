module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['key1', 'key2', 'key3', 'key4']),
  },
  admin: {
    autoOpen: false,
    watchIgnoreFiles: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.tmp/**'
    ]
  },
  webhooks: {
    populateRelations: false,
  },
  // Deshabilitar auto-reload para evitar bucles
  autoReload: false,
});
