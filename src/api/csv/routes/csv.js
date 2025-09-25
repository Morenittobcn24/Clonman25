'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/csv/export',
      handler: 'csv.export',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/csv/export/:model',
      handler: 'csv.exportModel',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/csv/import',
      handler: 'csv.import',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/csv/import/:model',
      handler: 'csv.import',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/csv/stats',
      handler: 'csv.stats',
      config: {
        auth: false,
      },
    },
  ],
};