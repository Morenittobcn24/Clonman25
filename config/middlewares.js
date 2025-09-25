module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'", "'unsafe-hashes'"],
          'script-src-attr': ["'unsafe-inline'", "'unsafe-hashes'"],
          'connect-src': ["'self'", 'https:', 'wss:'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200mb
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'global::csv-export',
];
