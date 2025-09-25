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
    console.log('🚀 Admin Bootstrap - Versión Limpia');
    
    // Una sola ejecución sin loops infinitos
    setTimeout(() => {
      console.log('✅ Configurando admin...');
      
      // Botón CSV Tools
      if (!document.querySelector('#csv-tools-btn')) {
        const csvBtn = document.createElement('a');
        csvBtn.id = 'csv-tools-btn';
        csvBtn.href = '/csv-tools-fixed.html';
        csvBtn.target = '_blank';
        csvBtn.innerHTML = '📊 CSV Tools';
        csvBtn.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #28a745;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          z-index: 9999;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(csvBtn);
        console.log('✅ Botón CSV agregado');
      }
      
    }, 1500); // Dar tiempo suficiente para que cargue el DOM
  },
};