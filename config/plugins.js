module.exports = ({ env }) => ({
  // Plugins CSV personalizados funcionando correctamente
  'csv-actions': {
    enabled: true,
    resolve: './src/plugins/csv-actions'
  }
});
