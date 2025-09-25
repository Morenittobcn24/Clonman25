export default {
  config: {
    locales: ['es'],
    translations: {
      es: {
        'app.components.HomePage.welcome': 'Bienvenido a Strapi',
      },
    },
  },
  bootstrap(app) {
    console.log('Admin Bootstrap - Versión Ultra Simple');
    
    // Ejecutar solo una vez después de que el DOM esté listo
    const initAdmin = () => {
      try {
        console.log('Iniciando configuración admin...');
        
        // Botón CSV Tools
        if (!document.querySelector('#csv-advanced-btn')) {
          const csvBtn = document.createElement('a');
          csvBtn.id = 'csv-advanced-btn';
          csvBtn.href = '/csv-tools-advanced.html';
          csvBtn.target = '_blank';
          csvBtn.innerHTML = '🔧 CSV Advanced';
          csvBtn.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;z-index:9999;font-weight:bold;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);';
          document.body.appendChild(csvBtn);
          console.log('Botón CSV agregado');
        }
        
      } catch (error) {
        console.error('Error en admin bootstrap:', error);
      }
    };
    
    // Intentar varias veces hasta que el DOM esté listo
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInit = () => {
      attempts++;
      if (document.body && attempts <= maxAttempts) {
        initAdmin();
      } else if (attempts <= maxAttempts) {
        setTimeout(tryInit, 500);
      }
    };
    
    // Iniciar después de 2 segundos
    setTimeout(tryInit, 2000);
  },
};