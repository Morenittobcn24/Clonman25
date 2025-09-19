// Endpoint para importar viajes desde CSV vía admin
// Ubicación: config/api/importViajes.js

const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const { importViajes } = require('../../scripts/importViajesCSV');

module.exports = async (req, res) => {
  try {
    if (!req.files || !req.files.csv) {
      return res.status(400).json({ message: 'No se envió archivo CSV' });
    }
    const tempPath = path.join(__dirname, '../../data/temp_import.csv');
    await req.files.csv.mv(tempPath);
    // Ejecuta el importador usando el archivo subido
    await importViajes(tempPath);
    fs.unlinkSync(tempPath);
    return res.json({ message: 'Importación completada' });
  } catch (err) {
    return res.status(500).json({ message: 'Error al importar: ' + err.message });
  }
};
