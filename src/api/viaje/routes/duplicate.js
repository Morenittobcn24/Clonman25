'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/viajes/:id/duplicate',
      handler: 'api::viaje.viaje-enhanced.duplicate',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/viajes/:viajeId/salidas/:salidaIndex/clone',
      handler: 'api::viaje.viaje-enhanced.cloneSalida',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
