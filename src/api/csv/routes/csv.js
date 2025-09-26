'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/csvs/export',
      handler: 'csv.export',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/csvs/export/:model',
      handler: 'csv.exportModel',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/csvs/import',
      handler: 'csv.import',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/csvs/import/:model',
      handler: 'csv.import',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/csvs/stats',
      handler: 'csv.stats',
      config: {
        auth: false,
      },
    },
  ],
};