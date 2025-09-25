const fetch = require('node-fetch');

async function testAllRoutes() {
  const baseUrl = 'http://localhost:1337';
  
  console.log('🧪 Probando todas las rutas...\n');
  
  // Rutas HTML estáticas (sin /public/ en la URL)
  const htmlRoutes = [
    'admin-csv-tools.html',
    'csv-manager.html', 
    'csv-basico.html',
    'csv-simple.html',
    'dashboard.html'
  ];
  
  // Rutas API CSV
  const csvRoutes = [
    'api/csvs/export/viaje',
    'api/csvs/export/alojamiento',
    'api/csvs/export/actividad',
    'api/csvs/export/cliente'
  ];
  
  console.log('📄 Probando páginas HTML:');
  for (const route of htmlRoutes) {
    try {
      const response = await fetch(`${baseUrl}/${route}`);
      console.log(`   ${route}: ${response.status} ${response.status === 200 ? '✅' : '❌'}`);
    } catch (error) {
      console.log(`   ${route}: ERROR ❌ - ${error.message}`);
    }
  }
  
  console.log('\n📊 Probando APIs CSV:');
  for (const route of csvRoutes) {
    try {
      const response = await fetch(`${baseUrl}/${route}`);
      console.log(`   ${route}: ${response.status} ${response.status === 200 ? '✅' : response.status === 404 ? '📭 (sin datos)' : '❌'}`);
    } catch (error) {
      console.log(`   ${route}: ERROR ❌ - ${error.message}`);
    }
  }
}

// Esperar a que el servidor esté listo
setTimeout(testAllRoutes, 3000);