const fetch = require('node-fetch');

async function testCSVRoutes() {
  const baseUrl = 'http://localhost:1337';
  
  console.log('🧪 Probando rutas CSV...');
  
  try {
    // Probar ruta de exportación
    console.log('📤 Probando exportación de viajes...');
    const response = await fetch(`${baseUrl}/api/csvs/export/viaje`);
    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, Object.fromEntries(response.headers));
    
    if (response.status === 200) {
      console.log('✅ Exportación exitosa');
    } else {
      const text = await response.text();
      console.log('❌ Error:', text);
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

testCSVRoutes();