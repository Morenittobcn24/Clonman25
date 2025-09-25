'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/csv-manager',
      handler: 'csv-manager.index',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/csv-manager/stats',
      handler: 'csv-manager.stats',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/csv-manager/export',
      handler: 'csv-manager.export',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/csv-manager/import',
      handler: 'csv-manager.import',
      config: {
        auth: false
      }
    }
  ]
};
