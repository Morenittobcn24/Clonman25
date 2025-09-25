'use strict';

/**
 * beneficio service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::beneficio.beneficio', ({ strapi }) => ({
  
  // Servicio para validar beneficios
  async validateBenefit(codigo, clienteId = null) {
    try {
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
        return { valid: false, error: 'Código no válido o expirado' };
      }

      const beneficioActual = beneficio[0];

      // Verificar fecha de inicio
      if (beneficioActual.Fecha_inicio && new Date(beneficioActual.Fecha_inicio) > new Date()) {
        return { valid: false, error: 'Este beneficio aún no está disponible' };
      }

      // Verificar límite de uso
      if (beneficioActual.Limite_uso && beneficioActual.Usado_veces >= beneficioActual.Limite_uso) {
        return { valid: false, error: 'Este beneficio ha alcanzado su límite de uso' };
      }

      return { valid: true, beneficio: beneficioActual };
    } catch (error) {
      return { valid: false, error: 'Error al validar el beneficio' };
    }
  },

  // Servicio para calcular descuento
  async calculateDiscount(beneficioId, precio) {
    try {
      const beneficio = await strapi.entityService.findOne('api::beneficio.beneficio', beneficioId);
      
      if (!beneficio) {
        return { success: false, error: 'Beneficio no encontrado' };
      }

      let descuento = 0;
      
      if (beneficio.Tipo === 'Descuento') {
        if (beneficio.Porcentaje) {
          descuento = (precio * beneficio.Porcentaje) / 100;
        } else if (beneficio.Valor) {
          descuento = Math.min(beneficio.Valor, precio);
        }
      }

      return {
        success: true,
        descuento,
        precio_original: precio,
        precio_final: precio - descuento,
        beneficio
      };
    } catch (error) {
      return { success: false, error: 'Error al calcular descuento' };
    }
  },

  // Servicio para obtener beneficios por tipo de cliente
  async getBenefitsByClientType(tipoCliente) {
    try {
      let filters = {
        Activo: true,
        $or: [
          { Fecha_fin: { $null: true } },
          { Fecha_fin: { $gte: new Date() } }
        ]
      };

      if (tipoCliente !== 'Todos') {
        filters.Clientes_elegibles = [tipoCliente, 'Todos'];
      }

      const beneficios = await strapi.entityService.findMany('api::beneficio.beneficio', {
        filters,
        populate: ['Imagen'],
        sort: { createdAt: 'desc' }
      });

      return beneficios;
    } catch (error) {
      throw new Error('Error al obtener beneficios por tipo de cliente');
    }
  }

}));