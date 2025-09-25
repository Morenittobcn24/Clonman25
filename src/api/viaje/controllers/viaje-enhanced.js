'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::viaje.viaje', ({ strapi }) => ({
  
  // Función para clonar una salida específica
  async cloneSalida(ctx) {
    const { viajeId, salidaIndex } = ctx.params;
    const { fechaInicio, fechaFin } = ctx.request.body;

    if (!viajeId || salidaIndex === undefined) {
      return ctx.badRequest('ID del viaje y índice de salida son requeridos');
    }

    if (!fechaInicio) {
      return ctx.badRequest('Fecha de inicio es requerida para la nueva salida');
    }

    try {
      console.log(`🔍 Buscando viaje con ID/documentId: ${viajeId}`);
      
      let viaje = null;
      
      // Intentar múltiples métodos para encontrar el viaje en Strapi V5
      
      // Método 1: EntityService con populate
      try {
        const isNumericId = !isNaN(parseInt(viajeId));
        console.log(`🔍 Método 1: ID numérico detectado: ${isNumericId}, valor: ${viajeId}`);
        
        if (isNumericId) {
          viaje = await strapi.entityService.findOne('api::viaje.viaje', parseInt(viajeId), {
            populate: { Salidas: true }
          });
          
          console.log(`📊 Resultado método 1:`, viaje ? `Encontrado: ${viaje.Nombre || viaje.nombre}` : 'No encontrado');
          console.log(`📊 Salidas método 1:`, viaje?.Salidas?.length || 'N/A');
          
          if (viaje) {
            console.log(`✅ Viaje encontrado por ID numérico: ${viaje.Nombre || viaje.nombre}`);
          }
        }
      } catch (err) {
        console.log(`⚠️ Error método 1 (entityService ID): ${err.message}`);
        console.log(`⚠️ Stack trace:`, err.stack);
      }
      
      // Método 2: EntityService búsqueda por document_id en filters
      if (!viaje) {
        try {
          const results = await strapi.entityService.findMany('api::viaje.viaje', {
            filters: { documentId: viajeId },
            populate: { Salidas: true }
          });
          if (results && results.length > 0) {
            viaje = results[0];
            console.log(`✅ Viaje encontrado por documentId en filters: ${viaje.Nombre || viaje.nombre}`);
          }
        } catch (err) {
          console.log(`⚠️ Error método 2 (entityService documentId): ${err.message}`);
        }
      }
      
      // Método 3: EntityService findMany con documentId directo
      if (!viaje) {
        try {
          const allViajes = await strapi.entityService.findMany('api::viaje.viaje', {
            populate: { Salidas: true }
          });
          viaje = allViajes.find(v => v.documentId === viajeId || v.document_id === viajeId || v.id == viajeId);
          if (viaje) {
            console.log(`✅ Viaje encontrado en listado completo: ${viaje.Nombre || viaje.nombre}`);
          }
        } catch (err) {
          console.log(`⚠️ Error método 3 (findMany): ${err.message}`);
        }
      }

      if (!viaje) {
        console.log(`❌ Viaje no encontrado con ningún método para ID: ${viajeId}`);
        return ctx.notFound('Viaje no encontrado');
      }

      console.log(`📊 Salidas en viaje "${viaje.Nombre || viaje.nombre}":`, viaje?.Salidas?.length || 0);
      
      if (!viaje.Salidas || viaje.Salidas.length === 0) {
        return ctx.badRequest('El viaje no tiene salidas para clonar');
      }

      // Obtener la última salida añadida (la más reciente en el array)
      const ultimaSalida = viaje.Salidas[viaje.Salidas.length - 1];
      console.log(`📋 Clonando desde la última salida (índice ${viaje.Salidas.length - 1}):`, ultimaSalida);

      // Crear nueva salida clonada con TODOS los campos de la última salida
      const nuevaSalida = {
        // Fechas proporcionadas por el usuario
        Fecha_inicio: fechaInicio,
        Fecha_fin: fechaFin || fechaInicio,
        
        // Campos clonados de la última salida añadida
        Precio_pax: ultimaSalida.Precio_pax,
        Precio_rebajado: ultimaSalida.Precio_rebajado,
        Precio_coste: ultimaSalida.Precio_coste,
        Cupo_total: ultimaSalida.Cupo_total,
        Cupo_disponible: ultimaSalida.Cupo_total || ultimaSalida.Cupo_disponible, // Resetear cupos al total
        Estado: ultimaSalida.Estado || 'Disponible', // Mantener estado o poner disponible
        Texto_promo: ultimaSalida.Texto_promo,
        
        // Clonar relaciones de proveedores si existen
        proveedors: ultimaSalida.proveedors || [],
      };

      console.log(`✨ Nueva salida creada:`, nuevaSalida);

      // Agregar la nueva salida al array existente
      const salidasActualizadas = [...viaje.Salidas, nuevaSalida];

      // Actualizar el viaje con las salidas nuevas
      let viajeActualizado;
      
      try {
        // Usar entityService que es más confiable en Strapi V5
        viajeActualizado = await strapi.entityService.update('api::viaje.viaje', viaje.id, {
          data: {
            Salidas: salidasActualizadas
          }
        });
        
        console.log(`✅ Viaje actualizado exitosamente con ${salidasActualizadas.length} salidas`);
      } catch (updateError) {
        console.log(`❌ Error actualizando viaje:`, updateError.message);
        throw updateError;
      }

      ctx.body = {
        success: true,
        message: 'Salida clonada exitosamente desde la última salida añadida',
        viaje: {
          id: viajeActualizado.id,
          documentId: viajeActualizado.documentId,
          nombre: viajeActualizado.Nombre || viajeActualizado.nombre,
          totalSalidas: salidasActualizadas.length
        },
        salidaOriginal: {
          fechaInicio: ultimaSalida.Fecha_inicio,
          fechaFin: ultimaSalida.Fecha_fin,
          precio: ultimaSalida.Precio_pax,
          estado: ultimaSalida.Estado,
          cupoTotal: ultimaSalida.Cupo_total,
          cupoDisponible: ultimaSalida.Cupo_disponible
        },
        nuevaSalida: nuevaSalida,
        detalles: {
          metodoBusqueda: viaje.documentId ? 'documentId' : 'id',
          camposCopiadosCompletos: true,
          ultimaSalidaIndice: viaje.Salidas.length - 1
        }
      };

    } catch (error) {
      strapi.log.error('Error clonando salida:', error);
      return ctx.internalServerError(`Error clonando salida: ${error.message}`);
    }
  },

  // Función mejorada para duplicar viajes con clonado de fechas
  async duplicate(ctx) {
    const { id } = ctx.params;
    const { newName, copyDates = true } = ctx.request.body;

    if (!id) {
      return ctx.badRequest('ID del viaje es requerido');
    }

    if (!newName) {
      return ctx.badRequest('Nombre para el viaje duplicado es requerido');
    }

    try {
      // Obtener el viaje original con todos sus datos populados
      const originalViaje = await strapi.entityService.findOne('api::viaje.viaje', id, {
        populate: {
          Salidas: {
            populate: '*'
          },
          Itinerario: {
            populate: '*'
          },
          Preguntas: {
            populate: '*'
          },
          Foto_portada: true,
          Galeria: true,
          SEO: {
            populate: '*'
          }
        }
      });

      if (!originalViaje) {
        return ctx.notFound('Viaje no encontrado');
      }

      // Preparar los datos para el viaje duplicado
      const duplicateData = {
        Nombre: newName,
        Sub_titulo: originalViaje.Sub_titulo,
        Descripcion: originalViaje.Descripcion,
        Descripcion_larga: originalViaje.Descripcion_larga,
        Precio: originalViaje.Precio,
        Duracion: originalViaje.Duracion,
        Dificultad: originalViaje.Dificultad,
        Ubicacion: originalViaje.Ubicacion,
        Coordenadas_latitud: originalViaje.Coordenadas_latitud,
        Coordenadas_longitud: originalViaje.Coordenadas_longitud,
        Incluye: originalViaje.Incluye,
        No_incluye: originalViaje.No_incluye,
        Que_llevar: originalViaje.Que_llevar,
        Observaciones: originalViaje.Observaciones,
        Activo: false, // Por defecto inactivo hasta revisión
        publishedAt: null, // No publicar automáticamente
        // Manejar relaciones de imágenes de forma segura
        ...(originalViaje.Foto_portada && { Foto_portada: originalViaje.Foto_portada.id }),
        ...(originalViaje.Galeria && originalViaje.Galeria.length > 0 && { 
          Galeria: originalViaje.Galeria.map(foto => foto.id) 
        })
      };

      // Manejar Salidas (fechas) con clonado opcional - MEJORADO
      if (originalViaje.Salidas && originalViaje.Salidas.length > 0) {
        duplicateData.Salidas = originalViaje.Salidas.map(salida => {
          const duplicatedSalida = {
            Precio_pax: salida.Precio_pax,
            Cupo_total: salida.Cupo_total,
            Cupo_disponible: salida.Cupo_total, // Resetear cupos disponibles
            Estado: 'Disponible', // Resetear estado
            Precio_rebajado: salida.Precio_rebajado,
            Precio_coste: salida.Precio_coste,
            Texto_promo: salida.Texto_promo
          };

          // Clonar fechas si está habilitado
          if (copyDates && salida.Fecha_inicio) {
            duplicatedSalida.Fecha_inicio = salida.Fecha_inicio;
            duplicatedSalida.Fecha_fin = salida.Fecha_fin || salida.Fecha_inicio;
          }

          return duplicatedSalida;
        });
      }

      // Manejar Itinerario
      if (originalViaje.Itinerario && originalViaje.Itinerario.length > 0) {
        duplicateData.Itinerario = originalViaje.Itinerario.map(item => ({
          Dia: item.Dia,
          Titulo: item.Titulo,
          Descripcion: item.Descripcion,
          Actividades: item.Actividades,
          Alojamiento: item.Alojamiento,
          Comidas: item.Comidas
        }));
      }

      // Manejar Preguntas
      if (originalViaje.Preguntas && originalViaje.Preguntas.length > 0) {
        duplicateData.Preguntas = originalViaje.Preguntas.map(pregunta => ({
          Pregunta: pregunta.Pregunta,
          Respuesta: pregunta.Respuesta
        }));
      }

      // Manejar SEO
      if (originalViaje.SEO) {
        duplicateData.SEO = {
          metaTitle: `${originalViaje.SEO.metaTitle} - Copia`,
          metaDescription: originalViaje.SEO.metaDescription,
          keywords: originalViaje.SEO.keywords,
          metaRobots: originalViaje.SEO.metaRobots,
          structuredData: originalViaje.SEO.structuredData,
          metaViewport: originalViaje.SEO.metaViewport,
          canonicalURL: null // Limpiar URL canónica para el duplicado
        };
      }

      // Crear el viaje duplicado
      const duplicatedViaje = await strapi.entityService.create('api::viaje.viaje', {
        data: duplicateData
      });

      // Respuesta exitosa con información detallada
      ctx.body = {
        success: true,
        message: `Viaje "${newName}" duplicado exitosamente`,
        original: {
          id: originalViaje.id,
          nombre: originalViaje.Nombre,
          salidas: originalViaje.Salidas?.length || 0
        },
        duplicated: {
          id: duplicatedViaje.id,
          nombre: duplicatedViaje.Nombre,
          salidas: duplicatedViaje.Salidas?.length || 0,
          fechasClonadas: copyDates && originalViaje.Salidas?.some(s => s.Fecha_inicio),
          estado: 'Borrador (no publicado)'
        }
      };

    } catch (error) {
      strapi.log.error('Error duplicando viaje:', error);
      return ctx.internalServerError(`Error duplicando viaje: ${error.message}`);
    }
  }
  
}));