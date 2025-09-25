const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testImport() {
  console.log('🧪 Probando importación CSV...\n');
  
  // Crear un archivo CSV de prueba
  const csvContent = `nombre,descripcion,precio
Viaje Test 1,Descripción del viaje test,100
Viaje Test 2,Otro viaje de prueba,200`;

  fs.writeFileSync('/tmp/test-import.csv', csvContent);
  
  try {
    const formData = new FormData();
    formData.append('csvFile', fs.createReadStream('/tmp/test-import.csv'));
    
    console.log('📤 Enviando archivo CSV de prueba...');
    const response = await fetch('http://localhost:1337/api/csvs/import/viaje', {
      method: 'POST',
      body: formData
    });
    
    console.log(`Status: ${response.status}`);
    const responseText = await response.text();
    console.log('Response:', responseText);
    
    if (response.status === 200) {
      console.log('✅ Importación exitosa');
    } else {
      console.log('❌ Error en importación');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Limpiar archivo temporal
    try {
      fs.unlinkSync('/tmp/test-import.csv');
    } catch (e) {}
  }
}

// Esperar a que el servidor esté listo
setTimeout(testImport, 2000);