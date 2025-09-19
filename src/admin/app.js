import favicon from './extensions/favicon.jpg';
import ImportViajesButton from './extensions/ImportViajesButton.jsx';
import ExportViajesButton from './extensions/ExportViajesButton.jsx';

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
  translations: {
    en: {
      "import.button.label": "Import CSV",
      "export.button.label": "Export CSV"
    },
    es: {
      "import.button.label": "Importar CSV",
      "export.button.label": "Exportar CSV"
    }
  }
};

const bootstrap = (app) => {
  app.addMenuLink({
    to: '/plugins/import-viajes',
    icon: 'upload',
    intlLabel: {
      id: 'import.button.label',
      defaultMessage: 'Importar CSV',
    },
    Component: ImportViajesButton,
    permissions: [],
  });

  app.addMenuLink({
    to: '/plugins/export-viajes', 
    icon: 'download',
    intlLabel: {
      id: 'export.button.label',
      defaultMessage: 'Exportar CSV',
    },
    Component: ExportViajesButton,
    permissions: [],
  });

  console.log('Menu links added successfully');
};

export default {
  config,
  bootstrap,
};
