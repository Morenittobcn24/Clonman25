// Script Node.js para importar CSV en Viajes
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const axios = require('axios').default;

const csvFilePath = path.join(__dirname, '../data/viajes.csv'); // Ajusta la ruta si es necesario

async function importViajes() {
  try {
    const viajes = await csv().fromFile(csvFilePath);
    for (const viaje of viajes) {
      await axios.post('http://localhost:1337/api/viajes', { data: viaje });
      console.log('Importado:', viaje);
    }
    console.log('Importación completada.');
  } catch (err) {
    console.error('Error al importar:', err);
  }
}

importViajes();