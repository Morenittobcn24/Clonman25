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
    console.log('🔥 DUPLICADOR DE SALIDAS ACTIVADO');
    
    // FUNCIÓN PARA ACTIVAR DUPLICADOR
    function activarDuplicadorSalidas() {
      // Buscar botones "Add" específicamente en salidas
      const addButtons = document.querySelectorAll('button[type="button"]');
      
      addButtons.forEach(btn => {
        if (btn.textContent && btn.textContent.includes('Add') && !btn.dataset.duplicadorSalidas) {
          // Verificar si estamos en la sección de salidas
          const container = btn.closest('[data-strapi-field-name*="salida"], [data-strapi-field*="salida"]') || 
                           btn.closest('div').querySelector('[data-strapi-field-name*="Salida"]');
          
          if (container || btn.textContent.toLowerCase().includes('entry')) {
            btn.dataset.duplicadorSalidas = 'true';
            
            // Cambiar color del botón para confirmar activación
            btn.style.backgroundColor = '#28a745';
            btn.style.color = 'white';
            btn.style.fontWeight = 'bold';
            
            console.log('✅ BOTÓN SALIDA INTERCEPTADO:', btn.textContent);
            
            // Interceptar el clic
            btn.addEventListener('click', function(e) {
              console.log('🔥 CLIC EN BOTÓN SALIDA DETECTADO');
              
              // Esperar a que se cree la nueva entrada y duplicar
              setTimeout(() => {
                duplicarUltimaSalida();
              }, 1500);
              
              setTimeout(() => {
                duplicarUltimaSalida();
              }, 3000);
            }, true);
          }
        }
      });
    }
    
    // FUNCIÓN DUPLICADORA MEJORADA
    function duplicarUltimaSalida() {
      console.log('🔄 INICIANDO DUPLICACIÓN DE SALIDA...');
      
      // Buscar contenedores de salidas más específicamente
      const salidas = document.querySelectorAll('[data-strapi-field-name*="alida"], [class*="repeatable"], [class*="component"]');
      console.log('📦 Contenedores de salidas encontrados:', salidas.length);
      
      if (salidas.length >= 2) {
        const ultimaSalida = salidas[salidas.length - 2]; // Penúltima (con datos)
        const nuevaSalida = salidas[salidas.length - 1]; // Última (vacía)
        
        console.log('🎯 Copiando desde última salida completa');
        
        // Copiar fechas
        const fechasOrigen = ultimaSalida.querySelectorAll('input[type="date"]');
        const fechasDestino = nuevaSalida.querySelectorAll('input[type="date"]');
        
        fechasOrigen.forEach((fecha, index) => {
          if (fechasDestino[index] && fecha.value) {
            fechasDestino[index].value = fecha.value;
            fechasDestino[index].dispatchEvent(new Event('input', { bubbles: true }));
            fechasDestino[index].dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ FECHA COPIADA:', fecha.value);
          }
        });
        
        // Copiar números (precios, plazas)
        const numerosOrigen = ultimaSalida.querySelectorAll('input[type="number"]');
        const numerosDestino = nuevaSalida.querySelectorAll('input[type="number"]');
        
        numerosOrigen.forEach((numero, index) => {
          if (numerosDestino[index] && numero.value) {
            numerosDestino[index].value = numero.value;
            numerosDestino[index].dispatchEvent(new Event('input', { bubbles: true }));
            numerosDestino[index].dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ PRECIO/NÚMERO COPIADO:', numero.value);
          }
        });
        
        // Copiar selects (proveedor)
        const selectsOrigen = ultimaSalida.querySelectorAll('select');
        const selectsDestino = nuevaSalida.querySelectorAll('select');
        
        selectsOrigen.forEach((select, index) => {
          if (selectsDestino[index] && select.value) {
            selectsDestino[index].value = select.value;
            selectsDestino[index].dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ PROVEEDOR COPIADO:', select.options[select.selectedIndex].text);
          }
        });
        
        // Mostrar confirmación visual
        mostrarNotificacionDuplicacion();
        
      } else {
        console.log('⚠️ No hay suficientes salidas para duplicar');
      }
    }
    
    // NOTIFICACIÓN VISUAL
    function mostrarNotificacionDuplicacion() {
      const notif = document.createElement('div');
      notif.innerHTML = '🔥 SALIDA DUPLICADA AUTOMÁTICAMENTE';
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 999999;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
      `;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 4000);
    }
    
    // EJECUTAR CADA 2 SEGUNDOS PARA DETECTAR NUEVOS BOTONES
    setInterval(activarDuplicadorSalidas, 2000);
    
    // EJECUTAR INMEDIATAMENTE
    setTimeout(activarDuplicadorSalidas, 1000);
    
    console.log('🚀 DUPLICADOR DE SALIDAS CONFIGURADO Y ACTIVO');
  },
};