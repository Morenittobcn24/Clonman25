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
    console.log('🚀 Admin Bootstrap - Anti Auto-Recarga');
    
    // Variable de control para evitar múltiples ejecuciones
    let adminInitialized = false;
    
    // Función de inicialización con control único
    const initializeAdmin = () => {
      // Prevenir múltiples ejecuciones
      if (adminInitialized) {
        console.log('⚠️ Admin ya inicializado, saltando...');
        return;
      }
      
      try {
        // Verificar que el DOM esté listo
        if (!document || !document.body) {
          console.log('⏳ DOM no está listo, reintentando...');
          setTimeout(initializeAdmin, 1000);
          return;
        }
        
        console.log('✅ Inicializando admin...');
        
        // Marcar como inicializado INMEDIATAMENTE
        adminInitialized = true;
        
        // Agregar botón CSV solo si no existe
        const existingBtn = document.querySelector('#csv-tools-btn');
        if (!existingBtn) {
          const csvBtn = document.createElement('a');
          csvBtn.id = 'csv-tools-btn';
          csvBtn.href = '/csv-tools-advanced.html';
          csvBtn.target = '_blank';
          csvBtn.innerHTML = '🔧 CSV Tools';
          
          // Estilos inline para evitar problemas de CSP
          csvBtn.style.position = 'fixed';
          csvBtn.style.top = '20px';
          csvBtn.style.right = '20px';
          csvBtn.style.backgroundColor = '#28a745';
          csvBtn.style.color = 'white';
          csvBtn.style.padding = '12px 20px';
          csvBtn.style.textDecoration = 'none';
          csvBtn.style.borderRadius = '6px';
          csvBtn.style.zIndex = '99999';
          csvBtn.style.fontWeight = 'bold';
          csvBtn.style.fontSize = '14px';
          csvBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          csvBtn.style.fontFamily = 'Arial, sans-serif';
          
          // Agregar al DOM
          document.body.appendChild(csvBtn);
          console.log('✅ Botón CSV agregado correctamente');
        } else {
          console.log('ℹ️ Botón CSV ya existe');
        }
        
        console.log('🎉 Admin inicializado exitosamente');
        
      } catch (error) {
        console.error('❌ Error inicializando admin:', error);
        // Reset flag para permitir reintentos en caso de error
        adminInitialized = false;
      }
    };
    
    // Usar múltiples estrategias para asegurar la inicialización
    
    // 1. Inmediato (por si el DOM ya está listo)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(initializeAdmin, 500);
    }
    
    // 2. DOMContentLoaded
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeAdmin, 1000);
      });
    }
    
    // 3. Fallback con timeout
    setTimeout(initializeAdmin, 3000);
    
    // 4. Fallback adicional
    setTimeout(() => {
      if (!adminInitialized) {
        console.log('⚠️ Forzando inicialización admin...');
        initializeAdmin();
      }
    }, 5000);
  },
};