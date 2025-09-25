module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    autoOpen: false,
    watchIgnoreFiles: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.tmp/**',
      '**/public/**'
    ]
  },
  // Deshabilitar completamente el auto-reload
  autoReload: false,
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
    '**/.tmp/**',
    '**/public/**',
    '**/config/**'
  ]
});