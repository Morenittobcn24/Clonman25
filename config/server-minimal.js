module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: ['key1', 'key2', 'key3', 'key4'],
  },
  admin: {
    autoOpen: false,
  },
  logger: {
    updates: {
      enabled: false,
    },
    level: 'error',
  },
});