module.exports = ({ env }) => ({
  admin: {
    autoOpen: false,
    serveAdminPanel: true,
  },
  // Deshabilitar completamente el auto-reload y file watching en desarrollo
  autoReload: false,
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
    '**/.strapi/**',
    '**/.tmp/**',
    '**/public/**',
    '**/scripts/**',
    '**/data/**',
    '**/*.log',
    '**/*.csv',
    '**/uploads/**'
  ],
  logger: {
    updates: { enabled: false },
    level: 'error',
  },
});