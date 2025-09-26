module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS', ['manaslu-key-1', 'manaslu-key-2', 'manaslu-key-3', 'manaslu-key-4']),
  },
  admin: {
    autoOpen: false,
    serveAdminPanel: true,
    // DESACTIVAR COMPLETAMENTE AUTO-RELOAD Y HOT-RELOAD
    autoReload: false,
    watchIgnoreFiles: ['**/*'],
    build: {
      backend: {
        // Configuración básica sin hot-reload
        target: 'node14',
      },
    },
  },
  logger: {
    updates: {
      enabled: false,
    },
    level: 'error',
  },
  // CONFIGURACIÓN ANTI-BUCLES
  autoReload: false,
});
