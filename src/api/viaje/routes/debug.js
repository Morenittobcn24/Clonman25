'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/debug/viajes',
      handler: 'api::viaje.debug.listarViajes',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/debug/viajes/:id',
      handler: 'api::viaje.debug.obtenerViaje',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};