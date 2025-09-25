'use strict';

/**
 * beneficio router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::beneficio.beneficio', {
  config: {
    findActive: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    applyCode: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    getStats: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});