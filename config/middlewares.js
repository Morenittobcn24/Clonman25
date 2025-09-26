module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // Middleware CSV personalizado (necesario para funcionalidad que funcionaba ayer)
  'global::csv-export',
];
