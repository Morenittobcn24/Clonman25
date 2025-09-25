'use strict';

/**
 * beneficio controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::beneficio.beneficio', ({ strapi }) => ({
  // Método personalizado para obtener beneficios activos
  async findActive(ctx) {
    try {
      const entities = await strapi.entityService.findMany('api::beneficio.beneficio', {
        filters: { 
          Activo: true,
          $or: [
            { Fecha_fin: { $null: true } },
            { Fecha_fin: { $gte: new Date() } }
          ]
        },
        populate: ['Imagen'],
        publicationState: 'live'
      });

      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitizedEntities);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Método para aplicar un beneficio por código
  async applyCode(ctx) {
    try {
      const { codigo } = ctx.request.body;
      
      if (!codigo) {
        return ctx.badRequest('Código requerido');
      }

      const beneficio = await strapi.entityService.findMany('api::beneficio.beneficio', {
        filters: { 
          Codigo: codigo,
          Activo: true,
          $or: [
            { Fecha_fin: { $null: true } },
            { Fecha_fin: { $gte: new Date() } }
          ]
        },
        limit: 1
      });

      if (!beneficio || beneficio.length === 0) {
        return ctx.notFound('Código no válido o expirado');
      }

      const beneficioActual = beneficio[0];

      // Verificar límite de uso
      if (beneficioActual.Limite_uso && beneficioActual.Usado_veces >= beneficioActual.Limite_uso) {
        return ctx.badRequest('Este beneficio ha alcanzado su límite de uso');
      }

      // Incrementar contador de uso
      await strapi.entityService.update('api::beneficio.beneficio', beneficioActual.id, {
        data: {
          Usado_veces: beneficioActual.Usado_veces + 1
        }
      });

      const sanitizedEntity = await this.sanitizeOutput(beneficioActual, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  // Método para obtener estadísticas de beneficios
  async getStats(ctx) {
    try {
      const total = await strapi.entityService.count('api::beneficio.beneficio');
      const activos = await strapi.entityService.count('api::beneficio.beneficio', {
        filters: { Activo: true }
      });
      const usados = await strapi.db.query('api::beneficio.beneficio').count({
        where: { 
          Usado_veces: { $gt: 0 } 
        }
      });

      return {
        total,
        activos,
        inactivos: total - activos,
        usados,
        sin_usar: total - usados
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}));