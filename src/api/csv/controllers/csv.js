'use strict';

const { Parser } = require('json2csv');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = ({ strapi }) => ({
  
  export: async (ctx) => {
    try {
      console.log(`🚀 Exportar CSV de todos los modelos`);
      
      // Lista de todos los modelos principales
      const modelos = ['viaje', 'reserva', 'cliente', 'proveedor', 'alojamiento', 'actividad', 'seguro', 'transfer'];
      const allData = {};
      
      for (const modelo of modelos) {
        try {
          const entries = await strapi.entityService.findMany(`api::${modelo}.${modelo}`, {
            populate: '*'
          });
          
          if (entries && entries.length > 0) {
            console.log(`📊 ${modelo}: ${entries.length} registros`);
            
            // Procesar datos
            const processedData = entries.map(entry => {
              const processed = { ...entry };
              Object.keys(processed).forEach(key => {
                if (processed[key] instanceof Date) {
                  processed[key] = processed[key].toLocaleDateString('es-ES');
                } else if (typeof processed[key] === 'string' && /^\d{4}-\d{2}-\d{2}/.test(processed[key])) {
                  const date = new Date(processed[key]);
                  processed[key] = date.toLocaleDateString('es-ES');
                } else if (typeof processed[key] === 'object' && processed[key] !== null) {
                  processed[key] = JSON.stringify(processed[key]);
                }
              });
              return processed;
            });
            
            allData[modelo] = processedData;
          }
        } catch (err) {
          console.log(`⚠️ Error en modelo ${modelo}:`, err.message);
        }
      }

      if (Object.keys(allData).length === 0) {
        ctx.status = 404;
        return ctx.send({ message: 'No hay datos para exportar' });
      }

      // Crear CSV combinado o del modelo principal (viajes)
      let csvData = '';
      
      if (allData.viaje && allData.viaje.length > 0) {
        const parser = new Parser();
        csvData = parser.parse(allData.viaje);
      } else {
        // Si no hay viajes, usar el primer modelo disponible
        const firstModel = Object.keys(allData)[0];
        const parser = new Parser();
        csvData = parser.parse(allData[firstModel]);
      }

      ctx.set('Content-Type', 'text/csv; charset=utf-8');
      ctx.set('Content-Disposition', `attachment; filename="export_completo_${new Date().toISOString().split('T')[0]}.csv"`);
      
      // Agregar BOM para Excel
      ctx.body = '\uFEFF' + csvData;

    } catch (error) {
      strapi.log.error('Error exportando CSV:', error);
      return ctx.internalServerError(`Error exportando CSV: ${error.message}`);
    }
  },

  exportModel: async (ctx) => {
    const { model } = ctx.params;
    
    if (!model) {
      ctx.status = 400;
      return ctx.send({ error: 'Model parameter is required' });
    }

    try {
      console.log(`🚀 Exportar CSV para modelo específico: ${model}`);
      
      // Obtener todos los registros del modelo específico
      const entries = await strapi.entityService.findMany(`api::${model}.${model}`, {
        populate: '*'
      });

      console.log(`📊 Encontrados ${entries?.length || 0} registros en ${model}`);

      if (!entries || entries.length === 0) {
        ctx.status = 404;
        return ctx.send({ message: `No hay datos para exportar en el modelo ${model}` });
      }

      // Procesar datos
      const processedData = entries.map(entry => {
        const processed = { ...entry };
        Object.keys(processed).forEach(key => {
          if (processed[key] instanceof Date) {
            processed[key] = processed[key].toLocaleDateString('es-ES');
          } else if (typeof processed[key] === 'string' && /^\d{4}-\d{2}-\d{2}/.test(processed[key])) {
            const date = new Date(processed[key]);
            processed[key] = date.toLocaleDateString('es-ES');
          } else if (typeof processed[key] === 'object' && processed[key] !== null) {
            processed[key] = JSON.stringify(processed[key]);
          }
        });
        return processed;
      });

      const parser = new Parser();
      const csvData = parser.parse(processedData);

      ctx.set('Content-Type', 'text/csv; charset=utf-8');
      ctx.set('Content-Disposition', `attachment; filename="${model}_${new Date().toISOString().split('T')[0]}.csv"`);
      
      // Agregar BOM para Excel
      ctx.body = '\uFEFF' + csvData;

    } catch (error) {
      strapi.log.error(`Error exportando CSV del modelo ${model}:`, error);
      return ctx.internalServerError(`Error exportando CSV del modelo ${model}: ${error.message}`);
    }
  },

  import: async (ctx) => {
    // Obtener modelo desde body o params
    const model = ctx.request.body?.model || ctx.params?.model || 'viaje';
    const files = ctx.request.files;
    const file = files?.csv || files?.csvFile || files?.file;

    console.log(`🚀 Importar CSV para modelo: ${model}`);
    console.log('📁 Archivos recibidos:', Object.keys(files || {}));

    if (!file) {
      ctx.status = 400;
      return ctx.send({ error: 'CSV file is required' });
    }

    try {
      const results = [];
      const filePath = file.filepath || file.path;
      
      console.log(`📁 Procesando archivo: ${filePath}`);
      
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            // Convertir fechas de DD/MM/YYYY a formato ISO
            Object.keys(data).forEach(key => {
              if (typeof data[key] === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}/.test(data[key])) {
                const [day, month, year] = data[key].split('/');
                data[key] = new Date(year, month - 1, day).toISOString();
              }
              
              // Intentar parsear JSON si es necesario
              if (typeof data[key] === 'string' && (data[key].startsWith('{') || data[key].startsWith('['))) {
                try {
                  data[key] = JSON.parse(data[key]);
                } catch (e) {
                  // Mantener como string si no es JSON válido
                }
              }
            });
            results.push(data);
          })
          .on('end', resolve)
          .on('error', reject);
      });

      let created = 0;
      const errors = [];
      const skipped = [];

      for (const row of results) {
        try {
          // Validar si el registro está completo
          const validationResult = validateAndCleanRow(row, model);
          
          if (!validationResult.isValid) {
            skipped.push({
              row: results.indexOf(row) + 1,
              reason: validationResult.reason,
              data: row
            });
            console.log(`⚠️ Fila ${results.indexOf(row) + 1} omitida: ${validationResult.reason}`);
            continue;
          }
          
          await strapi.entityService.create(`api::${model}.${model}`, { 
            data: validationResult.cleanedData 
          });
          created++;
          console.log(`✅ Fila ${results.indexOf(row) + 1} importada correctamente`);
        } catch (error) {
          errors.push({
            row: results.indexOf(row) + 1,
            error: error.message,
            data: row
          });
          console.log(`❌ Error importing row ${results.indexOf(row) + 1}: ${error.message}`);
        }
      }
      
      // Función para validar y limpiar datos según el modelo
      function validateAndCleanRow(data, modelName) {
        const cleaned = { ...data };
        
        if (modelName === 'viaje') {
          // Campos obligatorios mínimos para un viaje
          const requiredFields = ['Nombre'];
          
          // Verificar campos obligatorios
          for (const field of requiredFields) {
            if (!cleaned[field] || cleaned[field].toString().trim() === '' || cleaned[field] === 'null') {
              return {
                isValid: false,
                reason: `Campo obligatorio '${field}' está vacío o nulo`,
                cleanedData: null
              };
            }
          }
          
          // Limpiar y procesar todos los campos del modelo viaje
          
          // Campos de texto básico
          if (cleaned.Slogan === 'null' || cleaned.Slogan === '') cleaned.Slogan = null;
          if (cleaned.Icono_viaje === 'null' || cleaned.Icono_viaje === '') cleaned.Icono_viaje = null;
          if (cleaned.Descripcion_corta === 'null' || cleaned.Descripcion_corta === '') cleaned.Descripcion_corta = null;
          if (cleaned.Descripcion_larga === 'null' || cleaned.Descripcion_larga === '') cleaned.Descripcion_larga = null;
          
          // Campos numéricos
          if (cleaned.Precio_desde) {
            const precio = parseFloat(cleaned.Precio_desde);
            cleaned.Precio_desde = isNaN(precio) ? null : precio;
          }
          if (cleaned.Duracion_dias) {
            const duracion = parseInt(cleaned.Duracion_dias);
            cleaned.Duracion_dias = isNaN(duracion) ? null : duracion;
          }
          if (cleaned.Maximo_personas) {
            const max = parseInt(cleaned.Maximo_personas);
            cleaned.Maximo_personas = isNaN(max) ? null : max;
          }
          if (cleaned.Minimo_personas) {
            const min = parseInt(cleaned.Minimo_personas);
            cleaned.Minimo_personas = isNaN(min) ? null : min;
          }
          
          // Campos booleanos
          if (cleaned.Destacado !== undefined) {
            cleaned.Destacado = cleaned.Destacado === 'true' || cleaned.Destacado === true || cleaned.Destacado === '1';
          }
          if (cleaned.Activo !== undefined) {
            cleaned.Activo = cleaned.Activo === 'true' || cleaned.Activo === true || cleaned.Activo === '1';
          }
          
          // Campos de fecha
          if (cleaned.publishedAt === 'null' || cleaned.publishedAt === '') {
            cleaned.publishedAt = null;
          }
          if (cleaned.createdAt === 'null' || cleaned.createdAt === '') {
            cleaned.createdAt = null;
          }
          if (cleaned.updatedAt === 'null' || cleaned.updatedAt === '') {
            cleaned.updatedAt = null;
          }
          
          // Componentes - intentar parsear JSON si vienen como string
          if (cleaned.Salidas && typeof cleaned.Salidas === 'string') {
            try {
              cleaned.Salidas = JSON.parse(cleaned.Salidas);
            } catch (e) {
              cleaned.Salidas = null;
            }
          }
          if (cleaned.Itinerario && typeof cleaned.Itinerario === 'string') {
            try {
              cleaned.Itinerario = JSON.parse(cleaned.Itinerario);
            } catch (e) {
              cleaned.Itinerario = null;
            }
          }
          if (cleaned.Preguntas && typeof cleaned.Preguntas === 'string') {
            try {
              cleaned.Preguntas = JSON.parse(cleaned.Preguntas);
            } catch (e) {
              cleaned.Preguntas = null;
            }
          }
          
          // Campos SEO
          if (cleaned.SEO && typeof cleaned.SEO === 'string') {
            try {
              cleaned.SEO = JSON.parse(cleaned.SEO);
            } catch (e) {
              cleaned.SEO = null;
            }
          }
          
          // Relaciones - convertir a array de IDs si vienen como string
          const relationFields = ['Actividades', 'Alojamiento', 'Transfer', 'Seguros', 'Descuento'];
          relationFields.forEach(field => {
            if (cleaned[field]) {
              if (typeof cleaned[field] === 'string') {
                try {
                  // Intentar parsear como JSON primero
                  const parsed = JSON.parse(cleaned[field]);
                  cleaned[field] = Array.isArray(parsed) ? parsed : [parsed];
                } catch (e) {
                  // Si no es JSON, tratar como IDs separados por coma
                  cleaned[field] = cleaned[field].split(',').map(id => id.trim()).filter(id => id);
                }
              }
              
              // Si está vacío o solo tiene valores null, eliminar
              if (Array.isArray(cleaned[field]) && cleaned[field].every(item => !item || item === 'null')) {
                cleaned[field] = [];
              }
            }
          });
          
          // Limpiar campos completamente vacíos
          Object.keys(cleaned).forEach(key => {
            if (cleaned[key] === 'null' || cleaned[key] === '' || cleaned[key] === undefined) {
              delete cleaned[key];
            }
          });
          
          // Asegurar locale por defecto
          if (!cleaned.locale) {
            cleaned.locale = 'es';
          }
        }
        
        return {
          isValid: true,
          reason: null,
          cleanedData: cleaned
        };
      }

      // Limpiar el archivo temporal
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        strapi.log.warn('Could not delete temporary file:', e);
      }

      ctx.send({
        success: true,
        message: `${created} registros importados correctamente${skipped.length > 0 ? `, ${skipped.length} omitidos por estar incompletos` : ''}`,
        created,
        skipped: skipped.length,
        errors: errors.length,
        total: results.length,
        details: {
          created_records: created,
          skipped_records: skipped,
          error_records: errors
        }
      });

    } catch (error) {
      strapi.log.error('Error importando CSV:', error);
      ctx.status = 500;
      return ctx.send({ 
        success: false,
        error: `Error importando CSV: ${error.message}` 
      });
    }
  },

  stats: async (ctx) => {
    try {
      console.log('🚀 Obteniendo estadísticas de modelos');
      
      const modelos = ['viaje', 'reserva', 'cliente', 'proveedor', 'alojamiento', 'actividad'];
      const stats = {};
      
      for (const modelo of modelos) {
        try {
          const entries = await strapi.entityService.findMany(`api::${modelo}.${modelo}`, {
            fields: ['id']
          });
          stats[modelo] = entries ? entries.length : 0;
        } catch (error) {
          console.warn(`Error obteniendo stats de ${modelo}:`, error.message);
          stats[modelo] = 0;
        }
      }
      
      ctx.send({
        success: true,
        stats
      });
      
    } catch (error) {
      strapi.log.error('Error obteniendo estadísticas:', error);
      return ctx.internalServerError(`Error obteniendo estadísticas: ${error.message}`);
    }
  }

});