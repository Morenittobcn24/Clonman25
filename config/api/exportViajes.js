// Endpoint para exportar viajes como CSV
// Ubicación: config/api/exportViajes.js

const path = require('path');
const fs = require('fs');
const { exportarCSV } = require('../../scripts/exportViajesCSV');

module.exports = async (req, res) => {
  try {
    // Genera el archivo CSV antes de enviarlo
    await exportarCSV();
    const csvPath = path.join(__dirname, '../../scripts/viajes_export.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).send('No se encontró el archivo CSV');
    }
    res.setHeader('Content-Disposition', 'attachment; filename=viajes_export.csv');
    res.setHeader('Content-Type', 'text/csv');
    fs.createReadStream(csvPath).pipe(res);
  } catch (err) {
    res.status(500).json({ message: 'Error al exportar: ' + err.message });
  }
};
