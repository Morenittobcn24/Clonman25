// Script para exportar todos los viajes y sus fechas a un archivo CSV
// Ejecuta: node scripts/exportViajesCSV.js

const fs = require('fs');
const { parse } = require('json2csv');
const axios = require('axios');
const path = require('path');

// Configura la URL de la API de Strapi (ajusta si usas otra ruta)
const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api/viajes?populate=fechas';
const outputCSV = path.join(__dirname, 'viajes_export.csv');

async function getViajesConFechas() {
  try {
    const res = await axios.get(API_URL);
    if (!res.data || !Array.isArray(res.data.data)) throw new Error('Respuesta inesperada de la API');
    return res.data.data.map(viaje => {
      const attrs = viaje && viaje.attributes ? viaje.attributes : {};
      let fechas = '';
      if (attrs.fechas && Array.isArray(attrs.fechas.data)) {
        fechas = attrs.fechas.data
          .map(f => (f && f.attributes && f.attributes.fecha ? f.attributes.fecha : ''))
          .filter(Boolean)
          .join('|');
      }
      return {
        id: viaje.id || '',
        nombre: attrs.nombre || attrs.Nombre || '',
        fechas
      };
    });
  } catch (err) {
    throw new Error('Error consultando la API: ' + err.message);
  }
}

async function exportarCSV() {
  try {
    const viajes = await getViajesConFechas();
    const csv = parse(viajes, { fields: ['id', 'nombre', 'fechas'] });
    fs.writeFileSync(outputCSV, csv);
    console.log('Exportación completada:', outputCSV);
  } catch (err) {
    console.error('Error al exportar:', err.message);
    process.exit(1);
  }
}

module.exports = { exportarCSV };
