// Middleware simple para agregar rutas CSV
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Agregar rutas CSV de forma simple
    if (ctx.path.startsWith('/api/csv-export/')) {
      const model = ctx.path.split('/')[3];
      
      try {
        // Obtener todos los registros del modelo
        const data = await strapi.entityService.findMany(`api::${model}.${model}`, {
          populate: '*',
        });

        if (!data || data.length === 0) {
          ctx.body = { message: 'No hay datos para exportar' };
          return;
        }

        // Crear archivo CSV
        const filename = `${model}-export-${Date.now()}.csv`;
        const filepath = path.join(process.cwd(), 'public', filename);

        // Obtener las claves del primer objeto para los headers
        const headers = Object.keys(data[0]).map(key => ({
          id: key,
          title: key.toUpperCase()
        }));

        const csvWriter = createCsvWriter({
          path: filepath,
          header: headers
        });

        // Procesar datos para CSV (aplanar objetos anidados)
        const processedData = data.map(item => {
          const processed = {};
          Object.keys(item).forEach(key => {
            if (typeof item[key] === 'object' && item[key] !== null) {
              processed[key] = JSON.stringify(item[key]);
            } else {
              processed[key] = item[key];
            }
          });
          return processed;
        });

        await csvWriter.writeRecords(processedData);

        // Enviar archivo como descarga
        ctx.set('Content-Type', 'text/csv');
        ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
        
        const fileStream = fs.createReadStream(filepath);
        ctx.body = fileStream;

        // Limpiar archivo temporal después de un tiempo
        setTimeout(() => {
          fs.unlink(filepath, (err) => {
            if (err) console.error('Error al eliminar archivo temporal:', err);
          });
        }, 60000); // 1 minuto

      } catch (error) {
        console.error('Error en exportación CSV:', error);
        ctx.status = 500;
        ctx.body = { error: 'Error al exportar datos' };
      }
      
      return;
    }
    
    await next();
  };
};