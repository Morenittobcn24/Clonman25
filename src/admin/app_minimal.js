export default {
  config: {
    locales: ['es', 'en'],
  },
  bootstrap() {
    // Configuración mínima sin duplicador para evitar problemas de recarga
    console.log('Admin panel initialized');
  },
};