"use strict";

const XLSX = require("xlsx");

module.exports = {
  async exportToExcel(ctx) {
    // Prueba básica para asegurar que el endpoint funciona
    ctx.body = "Funciona el endpoint de exportación";
  },
};
