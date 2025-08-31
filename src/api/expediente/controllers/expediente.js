"use strict";

const XLSX = require("xlsx");

module.exports = {
  async exportToExcel(ctx) {
    const XLSX = require('xlsx');
    // Obtener expedientes con relaciones
    const expedientes = await strapi.entityService.findMany('api::expediente.expediente', {
      populate: ['viaje', 'reservas', 'proveedores'],
    });

    // Preparar los datos para el Excel
    const data = expedientes.map(e => ({
      Viaje: e.viaje?.nombre || '',
      FechaSalida: e.fecha_salida || '',
      Proveedores: e.proveedores?.map(p => p.nombre).join(', ') || '',
      Reservas: e.reservas?.length || 0,
      PrecioVenta: e.precio_venta,
      PrecioCoste: e.precio_coste,
      Ganancia: e.ganancia,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expedientes');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.set('Content-Disposition', 'attachment; filename="expedientes.xlsx"');
    ctx.body = buffer;
  },
};
