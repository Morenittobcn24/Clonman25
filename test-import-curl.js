// Prueba simple de importación con curl
const { spawn } = require('child_process');
const fs = require('fs');

// Crear archivo CSV de prueba
const csvContent = `nombre,descripcion,precio
"Viaje Test 1","Descripción del viaje test",100
"Viaje Test 2","Otro viaje de prueba",200`;

fs.writeFileSync('/tmp/test-viaje.csv', csvContent);

console.log('📤 Probando importación con curl...');

// Usar curl para probar el upload
const curl = spawn('curl', [
  '-v',
  '-X', 'POST',
  '-F', 'csvFile=@/tmp/test-viaje.csv',
  'http://localhost:1337/api/csvs/import/viaje'
]);

curl.stdout.on('data', (data) => {
  console.log('✅ Respuesta:', data.toString());
});

curl.stderr.on('data', (data) => {
  console.log('📡 Info:', data.toString());
});

curl.on('close', (code) => {
  console.log(`🏁 Proceso terminado con código: ${code}`);
  
  // Limpiar archivo temporal
  try {
    fs.unlinkSync('/tmp/test-viaje.csv');
  } catch (e) {}
});