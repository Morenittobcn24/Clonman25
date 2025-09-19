import favicon from './extensions/favicon.jpg';

const config = {
  locales: ['es', 'en'],
  head: {
    favicon: favicon,
    title: 'Manaslu Admin',
  },
  theme: {
    light: {
      colors: {
        primary100: '#feecec',
        primary200: '#f8c1c1',
        primary500: '#e67373',
        primary600: '#df1e18',
        primary700: '#b31813',
        danger700: '#8a130f',
      },
    },
  },
  menu: {
    logo: favicon
  }
};

const bootstrap = (app) => {
  console.log('Admin panel bootstrap started');
  
  // Agregar enlaces directamente al menú principal
  app.addMenuLink({
    to: '/content-manager/collectionType/api::viaje.viaje',
    icon: 'Upload',
    intlLabel: {
      id: 'csv-import',
      defaultMessage: 'Importar CSV',
    },
  });

  app.addMenuLink({
    to: '/content-manager/collectionType/api::viaje.viaje',
    icon: 'Download', 
    intlLabel: {
      id: 'csv-export',
      defaultMessage: 'Exportar CSV',
    },
  });

  console.log('Menu links added successfully');
};

export default {
  config,
  bootstrap,
};
