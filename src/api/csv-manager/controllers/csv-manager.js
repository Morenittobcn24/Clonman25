'use strict';

const { parse } = require('json2csv');
const csv = require('csv-parser');
const fs = require('fs');
const { Readable } = require('stream');
const path = require('path');

// Configuración de validación por entidad
const entityConfig = {
  viaje: {
    model: 'api::viaje.viaje',
    numberFields: ['Precio', 'Duracion'],
    requiredFields: ['Nombre', 'Precio', 'Dificultad', 'Duracion'],
    maxRecords: 1000
  },
  proveedor: {
    model: 'api::proveedor.proveedor',
    requiredFields: ['Nombre', 'Email'],
    maxRecords: 1000
  },
  cliente: {
    model: 'api::cliente.cliente',
    requiredFields: ['Nombre', 'Email'],
    maxRecords: 1000
  },
  reserva: {
    model: 'api::reserva.reserva',
    numberFields: ['Numero_personas', 'Precio_total'],
    requiredFields: ['Fecha_reserva', 'Estado', 'Numero_personas'],
    maxRecords: 1000
  }
};

// Funciones auxiliares
const validateRequiredFields = (data, fields) => {
  const missing = fields.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missing.join(', ')}`);
  }
};

const convertNumberFields = (data, fields = []) => {
  fields.forEach(field => {
    if (data[field] !== undefined) {
      const value = parseFloat(data[field]);
      if (isNaN(value)) {
        throw new Error(`El campo ${field} debe ser un número válido`);
      }
      data[field] = value;
    }
  });
};

const sanitizeData = (data) => {
  const clean = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      const trimmed = value.toString().trim();
      if (trimmed !== '') {
        clean[key] = trimmed;
      }
    }
  }
  return clean;
};

const processStream = (stream) => {
  return new Promise((resolve, reject) => {
    const results = [];
    stream
      .pipe(csv({
        separator: ',',
        headers: true,
        skipEmptyLines: true,
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

module.exports = {
  // Página principal
  async index(ctx) {
    try {
      ctx.type = 'html';
      const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
      ctx.body = fs.createReadStream(htmlPath);
    } catch (error) {
      strapi.log.error('Error sirviendo la página principal:', error);
      ctx.throw(500, 'Error interno del servidor');
    }
  },

  // Estadísticas
  async stats(ctx) {
    try {
      const stats = {};
      
      await Promise.all(
        Object.entries(entityConfig).map(async ([key, config]) => {
          try {
            const entities = await strapi.entityService.findMany(config.model, {
              limit: config.maxRecords
            });
            stats[`${key}s`] = entities.length;
          } catch (error) {
            strapi.log.error(`Error obteniendo estadísticas de ${key}:`, error);
            stats[`${key}s`] = 0;
          }
        })
      );
      
      ctx.send(stats);
    } catch (error) {
      strapi.log.error('Error obteniendo estadísticas:', error);
      ctx.throw(500, 'Error al obtener estadísticas');
    }
  },

  // Exportar
  async export(ctx) {
    try {
      const { entity, fields } = ctx.query;
      
      if (!entity || !entityConfig[entity]) {
        return ctx.throw(400, 'Entidad no válida o no especificada');
      }

      const config = entityConfig[entity];
      const filename = `${entity}_export_${new Date().toISOString().split('T')[0]}.csv`;

      let data = await strapi.entityService.findMany(config.model, {
        populate: '*',
        limit: config.maxRecords
      });

      if (!data || data.length === 0) {
        return ctx.throw(404, 'No se encontraron datos para exportar');
      }

      // Procesar datos complejos
      data = data.map(item => {
        const processed = { ...item };
        
        // Manejar arrays y objetos anidados
        Object.keys(processed).forEach(key => {
          if (Array.isArray(processed[key])) {
            processed[key] = processed[key]
              .map(el => typeof el === 'object' ? JSON.stringify(el) : el)
              .join(';');
          } else if (typeof processed[key] === 'object' && processed[key] !== null) {
            processed[key] = JSON.stringify(processed[key]);
          }
        });

        return processed;
      });

      // Filtrar campos si se especifican
      if (fields) {
        const selectedFields = fields.split(',').map(f => f.trim());
        data = data.map(item => {
          const filtered = {};
          selectedFields.forEach(field => {
            if (item[field] !== undefined) {
              filtered[field] = item[field];
            }
          });
          return filtered;
        });
      }

      // Generar CSV
      const csvData = parse(data);

      // Configurar headers
      ctx.set('Content-Type', 'text/csv; charset=utf-8');
      ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
      ctx.body = '\ufeff' + csvData; // BOM para UTF-8

    } catch (error) {
      strapi.log.error('Error en exportación CSV:', error);
      ctx.throw(500, `Error al exportar: ${error.message}`);
    }
  },

  // Importar
  async import(ctx) {
    try {
      const { files, body } = ctx.request;
      const entity = body.entity;

      if (!entity || !entityConfig[entity]) {
        return ctx.throw(400, 'Entidad no válida o no especificada');
      }

      if (!files || !files.csv) {
        return ctx.throw(400, 'Archivo CSV requerido');
      }

      const config = entityConfig[entity];
      const csvContent = fs.readFileSync(files.csv.filepath, 'utf8');
      const cleanContent = csvContent.replace(/^\ufeff/, ''); // Remover BOM
      
      const errors = [];
      let importedCount = 0;

      // Parsear CSV
      const records = await processStream(Readable.from([cleanContent]));

      // Validar límite de registros
      if (records.length > config.maxRecords) {
        throw new Error(`Número máximo de registros excedido (${config.maxRecords})`);
      }

      // Procesar registros
      for (const [index, record] of records.entries()) {
        try {
          // Limpiar y validar datos
          const cleanRecord = sanitizeData(record);

          // Validar campos requeridos
          validateRequiredFields(cleanRecord, config.requiredFields);

          // Convertir campos numéricos
          if (config.numberFields) {
            convertNumberFields(cleanRecord, config.numberFields);
          }

          // Crear registro
          await strapi.entityService.create(config.model, {
            data: cleanRecord
          });
          
          importedCount++;

        } catch (error) {
          const errorMsg = `Fila ${index + 2}: ${error.message}`;
          strapi.log.error(errorMsg);
          errors.push(errorMsg);
        }
      }

      ctx.send({
        message: 'Importación completada',
        imported: importedCount,
        errors: errors.length,
        errorDetails: errors.slice(0, 10) // Limitar a 10 errores para la respuesta
      });

    } catch (error) {
      strapi.log.error('Error en importación CSV:', error);
      ctx.throw(500, `Error al importar: ${error.message}`);
    } finally {
      // Limpiar archivo temporal
      if (ctx.request.files?.csv) {
        try {
          fs.unlinkSync(ctx.request.files.csv.filepath);
        } catch (error) {
          strapi.log.error('Error eliminando archivo temporal:', error);
        }
      }
    }
  }
};