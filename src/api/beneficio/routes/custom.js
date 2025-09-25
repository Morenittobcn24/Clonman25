'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/beneficios/active',
      handler: 'api::beneficio.beneficio.findActive',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/beneficios/apply-code',
      handler: 'api::beneficio.beneficio.applyCode',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/beneficios/stats',
      handler: 'api::beneficio.beneficio.getStats',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};