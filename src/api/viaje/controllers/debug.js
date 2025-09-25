'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::viaje.viaje', ({ strapi }) => ({
  
  async listarViajes(ctx) {
    try {
      console.log('🔍 Debug: Listando todos los viajes');
      
      const viajes = await strapi.entityService.findMany('api::viaje.viaje', {
        populate: { Salidas: true }
      });
      
      console.log(`📊 Encontrados ${viajes.length} viajes`);
      
      const resumen = viajes.map(v => ({
        id: v.id,
        documentId: v.documentId,
        nombre: v.Nombre || v.nombre,
        salidas: v.Salidas?.length || 0,
        salidasDetalle: v.Salidas || []
      }));
      
      ctx.body = {
        success: true,
        total: viajes.length,
        viajes: resumen
      };
      
    } catch (error) {
      console.log('❌ Error listando viajes:', error.message);
      ctx.body = {
        success: false,
        error: error.message,
        stack: error.stack
      };
    }
  },
  
  async obtenerViaje(ctx) {
    const { id } = ctx.params;
    
    try {
      console.log(`🔍 Debug: Obteniendo viaje con ID: ${id}`);
      
      let viaje = null;
      
      // Método 1: Por ID numérico
      if (!isNaN(parseInt(id))) {
        try {
          viaje = await strapi.entityService.findOne('api::viaje.viaje', parseInt(id), {
            populate: { Salidas: true }
          });
          console.log('📊 Método ID numérico:', viaje ? 'Encontrado' : 'No encontrado');
        } catch (err) {
          console.log('⚠️ Error método ID numérico:', err.message);
        }
      }
      
      // Método 2: Buscar en todos por documentId
      if (!viaje) {
        try {
          const todos = await strapi.entityService.findMany('api::viaje.viaje', {
            populate: { Salidas: true }
          });
          viaje = todos.find(v => v.documentId === id || v.document_id === id);
          console.log('📊 Método búsqueda en todos:', viaje ? 'Encontrado' : 'No encontrado');
        } catch (err) {
          console.log('⚠️ Error método búsqueda en todos:', err.message);
        }
      }
      
      if (viaje) {
        ctx.body = {
          success: true,
          viaje: {
            id: viaje.id,
            documentId: viaje.documentId,
            nombre: viaje.Nombre || viaje.nombre,
            salidas: viaje.Salidas || [],
            totalSalidas: viaje.Salidas?.length || 0
          }
        };
      } else {
        ctx.body = {
          success: false,
          message: `Viaje con ID ${id} no encontrado`
        };
      }
      
    } catch (error) {
      console.log('❌ Error obteniendo viaje:', error.message);
      ctx.body = {
        success: false,
        error: error.message,
        stack: error.stack
      };
    }
  }
  
}));