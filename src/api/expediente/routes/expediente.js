module.exports = [
  {
    method: 'GET',
    path: '/expedientes/export',
    handler: 'expediente.exportToExcel',
    config: {
      policies: [],
      auth: false
    }
  }
];
