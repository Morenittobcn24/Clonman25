import pluginPkg from '../../package.json';
import ImportViajesButton from './extensions/ImportViajesButton.jsx';
import ExportViajesButton from './extensions/ExportViajesButton.jsx';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: '/plugins/csv-manager/import',
      icon: 'Upload',
      intlLabel: {
        id: 'csv-manager.import',
        defaultMessage: 'Importar CSV',
      },
      Component: ImportViajesButton,
    });

    app.addMenuLink({
      to: '/plugins/csv-manager/export',
      icon: 'Download',
      intlLabel: {
        id: 'csv-manager.export', 
        defaultMessage: 'Exportar CSV',
      },
      Component: ExportViajesButton,
    });

    app.createRoute({
      path: '/plugins/csv-manager/import',
      component: ImportViajesButton,
    });

    app.createRoute({
      path: '/plugins/csv-manager/export',
      component: ExportViajesButton,
    });
  },

  bootstrap(app) {
    console.log('CSV Manager plugin loaded');
  },
};