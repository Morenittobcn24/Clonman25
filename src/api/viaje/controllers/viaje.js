'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::viaje.viaje', ({ strapi }) => ({
  // Funcionalidad personalizada para duplicar viajes
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
          Foto_principal: true,
          Fotos_carrusel: true,
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
        // Mantener las mismas relaciones de imágenes
        Foto_principal: originalViaje.Foto_principal?.id || null,
        Fotos_carrusel: originalViaje.Fotos_carrusel?.map(foto => foto.id) || []
      };

      // Manejar Salidas (fechas) con clonado opcional
      if (originalViaje.Salidas && originalViaje.Salidas.length > 0) {
        duplicateData.Salidas = originalViaje.Salidas.map(salida => {
          const duplicatedSalida = {
            Nombre: salida.Nombre,
            Descripcion: salida.Descripcion,
            Precio_adulto: salida.Precio_adulto,
            Precio_nino: salida.Precio_nino,
            Cupos_disponibles: salida.Cupos_disponibles,
            Cupos_maximos: salida.Cupos_maximos,
            Estado: 'disponible' // Resetear estado
          };

          // Clonar fechas si está habilitado
          if (copyDates && salida.Fecha_inicio && salida.Fecha_fin) {
            duplicatedSalida.Fecha_inicio = salida.Fecha_inicio;
            duplicatedSalida.Fecha_fin = salida.Fecha_fin;
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

      // Respuesta exitosa
      ctx.body = {
        success: true,
        message: `Viaje "${newName}" duplicado exitosamente`,
        original: {
          id: originalViaje.id,
          nombre: originalViaje.Nombre
        },
        duplicated: {
          id: duplicatedViaje.id,
          nombre: duplicatedViaje.Nombre,
          salidas: duplicatedViaje.Salidas?.length || 0,
          fechasClonadas: copyDates && originalViaje.Salidas?.some(s => s.Fecha_inicio)
        }
      };

    } catch (error) {
      strapi.log.error('Error duplicando viaje:', error);
      return ctx.internalServerError(`Error duplicando viaje: ${error.message}`);
    }
  }
}));
