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
    console.log('🔥 DUPLICADOR DIRECTO INICIADO');
    
    // FUNCIÓN PRINCIPAL - MUY DIRECTA
    function activarDuplicador() {
      // Buscar TODOS los botones que contengan "Add"
      const todosLosButtons = document.querySelectorAll('button');
      
      todosLosButtons.forEach(btn => {
        if (btn.textContent && btn.textContent.includes('Add') && !btn.dataset.duplicadorActivo) {
          btn.dataset.duplicadorActivo = 'true';
          
          // Cambiar color para confirmar que está activo
          btn.style.backgroundColor = '#28a745';
          btn.style.color = 'white';
          
          console.log('✅ BOTÓN INTERCEPTADO:', btn.textContent);
          
          // Interceptar el clic
          btn.addEventListener('click', function(e) {
            console.log('🔥 CLIC INTERCEPTADO EN:', btn.textContent);
            
            setTimeout(() => {
              duplicarUltimaSalida();
            }, 1000);
          }, true);
        }
      });
    }
    
    // FUNCIÓN DUPLICADORA DIRECTA
    function duplicarUltimaSalida() {
      console.log('🔄 INTENTANDO DUPLICAR...');
      
      // Buscar campos de fecha
      const fechas = document.querySelectorAll('input[type="date"]');
      console.log('📅 Fechas encontradas:', fechas.length);
      
      if (fechas.length >= 2) {
        const fechaOrigen = fechas[fechas.length - 2];
        const fechaDestino = fechas[fechas.length - 1];
        
        if (fechaOrigen.value && !fechaDestino.value) {
          fechaDestino.value = fechaOrigen.value;
          fechaDestino.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ FECHA DUPLICADA:', fechaOrigen.value);
        }
      }
      
      // Buscar campos numéricos
      const numeros = document.querySelectorAll('input[type="number"]');
      console.log('🔢 Números encontrados:', numeros.length);
      
      if (numeros.length >= 2) {
        const numeroOrigen = numeros[numeros.length - 2];
        const numeroDestino = numeros[numeros.length - 1];
        
        if (numeroOrigen.value && !numeroDestino.value) {
          numeroDestino.value = numeroOrigen.value;
          numeroDestino.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ NÚMERO DUPLICADO:', numeroOrigen.value);
        }
      }
      
      // Buscar selects
      const selects = document.querySelectorAll('select');
      console.log('📋 Selects encontrados:', selects.length);
      
      if (selects.length >= 2) {
        const selectOrigen = selects[selects.length - 2];
        const selectDestino = selects[selects.length - 1];
        
        if (selectOrigen.value && !selectDestino.value) {
          selectDestino.value = selectOrigen.value;
          selectDestino.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ SELECT DUPLICADO:', selectOrigen.value);
        }
      }
      
      // Mostrar notificación
      const notif = document.createElement('div');
      notif.innerHTML = '🔥 DUPLICACIÓN AUTOMÁTICA EJECUTADA';
      notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #FF6B35;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 999999;
        font-weight: bold;
      `;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 3000);
    }
    
    // EJECUTAR CADA SEGUNDO
    setInterval(() => {
      activarDuplicador();
    }, 1000);
    
    // EJECUTAR INMEDIATAMENTE
    setTimeout(() => {
      activarDuplicador();
    }, 500);
    
    console.log('🔥 DUPLICADOR DIRECTO CONFIGURADO');
  },
};