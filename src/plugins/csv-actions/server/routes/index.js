module.exports = {
  admin: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/export',
        handler: 'csv-actions.export',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/import',
        handler: 'csv-actions.import',
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  'content-api': {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/export',
        handler: 'csv-actions.export',
        config: {
          policies: [],
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/import',
        handler: 'csv-actions.import',
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
};