const { createCoreController } = require('@strapi/strapi').factories;
const { Parser } = require('json2csv');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = createCoreController('plugin::csv-actions.csv-actions', ({ strapi }) => ({
  
  async export(ctx) {
    const { entity } = ctx.query;
    
    if (!entity) {
      return ctx.badRequest('Entity parameter is required');
    }

    try {
      // Verificar que la entidad existe
      const contentType = strapi.contentTypes[`api::${entity}.${entity}`];
      if (!contentType) {
        return ctx.notFound(`Entity ${entity} not found`);
      }

      // Obtener todos los registros de la entidad
      const entries = await strapi.entityService.findMany(`api::${entity}.${entity}`, {
        populate: '*'
      });

      if (!entries || entries.length === 0) {
        return ctx.notFound(`No data found for entity ${entity}`);
      }

      // Preparar datos para CSV - aplanar objetos anidados
      const flattenedData = entries.map(entry => {
        const flattened = { ...entry };
        
        // Convertir fechas al formato español
        Object.keys(flattened).forEach(key => {
          if (flattened[key] instanceof Date) {
            flattened[key] = flattened[key].toLocaleDateString('es-ES');
          } else if (typeof flattened[key] === 'string' && /^\d{4}-\d{2}-\d{2}/.test(flattened[key])) {
            const date = new Date(flattened[key]);
            flattened[key] = date.toLocaleDateString('es-ES');
          } else if (typeof flattened[key] === 'object' && flattened[key] !== null) {
            // Convertir objetos a string JSON para CSV
            flattened[key] = JSON.stringify(flattened[key]);
          }
        });
        
        return flattened;
      });

      // Crear CSV
      const parser = new Parser({
        delimiter: ',',
        quote: '"',
        escape: '"'
      });
      
      const csvData = parser.parse(flattenedData);

      // Configurar headers para descarga
      ctx.set('Content-Type', 'text/csv; charset=utf-8');
      ctx.set('Content-Disposition', `attachment; filename="${entity}_export_${new Date().toISOString().split('T')[0]}.csv"`);
      
      // Agregar BOM para Excel en español
      const BOM = '\uFEFF';
      ctx.body = BOM + csvData;

    } catch (error) {
      strapi.log.error('Error en exportación CSV:', error);
      return ctx.internalServerError('Error during CSV export', { error: error.message });
    }
  },

  async import(ctx) {
    const { entity } = ctx.request.body;
    const file = ctx.request.files?.file;

    if (!entity) {
      return ctx.badRequest('Entity parameter is required');
    }

    if (!file) {
      return ctx.badRequest('CSV file is required');
    }

    try {
      // Verificar que la entidad existe
      const contentType = strapi.contentTypes[`api::${entity}.${entity}`];
      if (!contentType) {
        return ctx.notFound(`Entity ${entity} not found`);
      }

      // Leer el archivo CSV
      const results = [];
      const errors = [];

      return new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            let created = 0;

            for (const row of results) {
              try {
                // Procesar fechas del formato español
                Object.keys(row).forEach(key => {
                  if (typeof row[key] === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}/.test(row[key])) {
                    const [day, month, year] = row[key].split('/');
                    row[key] = new Date(year, month - 1, day).toISOString();
                  }
                  
                  // Intentar parsear JSON si es necesario
                  if (typeof row[key] === 'string' && (row[key].startsWith('{') || row[key].startsWith('['))) {
                    try {
                      row[key] = JSON.parse(row[key]);
                    } catch (e) {
                      // Mantener como string si no es JSON válido
                    }
                  }
                });

                // Crear el registro
                await strapi.entityService.create(`api::${entity}.${entity}`, {
                  data: row
                });
                created++;

              } catch (error) {
                errors.push({
                  row: results.indexOf(row) + 1,
                  error: error.message,
                  data: row
                });
                strapi.log.error(`Error importing row ${results.indexOf(row) + 1}:`, error);
              }
            }

            // Limpiar el archivo temporal
            try {
              fs.unlinkSync(file.path);
            } catch (e) {
              strapi.log.warn('Could not delete temporary file:', e);
            }

            resolve(ctx.send({
              message: `Import completed: ${created} records created`,
              created,
              errors,
              total: results.length
            }));
          })
          .on('error', (error) => {
            strapi.log.error('CSV parsing error:', error);
            reject(ctx.internalServerError('Error parsing CSV file', { error: error.message }));
          });
      });

    } catch (error) {
      strapi.log.error('Error en importación CSV:', error);
      return ctx.internalServerError('Error during CSV import', { error: error.message });
    }
  }

}));