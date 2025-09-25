const controllers = require('./controllers');
const routes = require('./routes');

const register = ({ strapi }) => {
  // register phase
  strapi.log.info('Registrando plugin CSV Actions...');
};

const bootstrap = ({ strapi }) => {
  // bootstrap phase
  strapi.log.info('Plugin CSV Actions iniciado correctamente');
};

module.exports = {
  register,
  bootstrap,
  controllers,
  routes,
};