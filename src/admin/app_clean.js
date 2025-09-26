export default {
  config: {
    locales: ['es', 'en'],
    translations: {
      es: {
        'app.components.HomePage.welcome': 'Bienvenido a Strapi',
      },
      en: {
        'app.components.HomePage.welcome': 'Welcome to Strapi',
      },
    },
  },
  bootstrap(app) {
    console.log('🔥 DUPLICADOR DE SALIDAS ACTIVADO');
    
    // FUNCIÓN PARA ACTIVAR DUPLICADOR
    function activarDuplicadorSalidas() {
      const allButtons = document.querySelectorAll('button, [role="button"]');
      
      allButtons.forEach(btn => {
        const esBotonAdd = btn.textContent && (
          btn.textContent.includes('Add') || 
          btn.textContent.includes('Añadir') || 
          btn.textContent.includes('entry') ||
          btn.textContent === '+' ||
          btn.innerHTML.includes('plus') ||
          btn.getAttribute('aria-label')?.includes('Add')
        );
        
        if (esBotonAdd && !btn.dataset.duplicadorSalidas) {
          const contenedorPadre = btn.closest('[data-strapi-field-name]');
          const nombreCampo = contenedorPadre?.getAttribute('data-strapi-field-name') || '';
          
          const esSalidaBoton = 
            nombreCampo.toLowerCase().includes('salida') ||
            contenedorPadre?.querySelector('input[type="date"]') ||
            btn.closest('[class*="DynamicZone"], [class*="RepeatableComponent"]') ||
            btn.closest('div')?.textContent?.toLowerCase().includes('salida') ||
            Array.from(btn.parentElement?.children || []).some(child => 
              child.textContent?.toLowerCase().includes('salida') ||
              child.querySelector?.('input[type="date"]')
            );
          
          if (esSalidaBoton) {
            btn.dataset.duplicadorSalidas = 'true';
            
            btn.style.setProperty('background-color', '#ff6b35', 'important');
            btn.style.setProperty('color', 'white', 'important');
            btn.style.setProperty('font-weight', 'bold', 'important');
            btn.style.setProperty('border', '3px solid #e55100', 'important');
            btn.style.setProperty('box-shadow', '0 0 15px rgba(255, 107, 53, 0.7)', 'important');
            btn.style.setProperty('transform', 'scale(1.05)', 'important');
            
            console.log('🔥 BOTÓN SALIDA DETECTADO:', btn.textContent);
            console.log('📍 Campo:', nombreCampo);
            
            btn.addEventListener('click', function(e) {
              console.log('🚀 CLIC EN BOTÓN DE SALIDA DETECTADO');
              console.log('🎯 Botón:', btn.textContent);
              console.log('🎯 Campo:', nombreCampo);
              
              [2000, 4000, 6000].forEach((delay, index) => {
                setTimeout(() => {
                  console.log(`⏰ Intento ${index + 1} de duplicación (${delay}ms)`);
                  duplicarUltimaSalida();
                }, delay);
              });
            }, true);
          }
        }
      });
      
      const totalAddButtons = document.querySelectorAll('button').length;
      const salidaButtons = document.querySelectorAll('button[data-duplicador-salidas="true"]').length;
      console.log(`🔍 Debug: ${totalAddButtons} botones totales, ${salidaButtons} botones de salida configurados`);
    }
    
    // FUNCIÓN DUPLICADORA
    function duplicarUltimaSalida() {
      console.log('🔄 INICIANDO DUPLICACIÓN DE SALIDA...');
      
      let contenedoresSalida = [];
      
      // Estrategia 1: Por field-name salidas
      contenedoresSalida = document.querySelectorAll('[data-strapi-field-name*="alida"], [data-strapi-field-name*="Salida"], [data-strapi-field-name*="salida"]');
      console.log('🔍 Estrategia 1 - Por field-name salidas:', contenedoresSalida.length);
      
      // Estrategia 2: Por componentes dinámicos
      if (contenedoresSalida.length === 0) {
        contenedoresSalida = document.querySelectorAll('[class*="DynamicZone"] > div, [class*="RepeatableComponent"] > div, [data-strapi-field*="component"] > div');
        console.log('🔍 Estrategia 2 - Por componentes:', contenedoresSalida.length);
      }
      
      // Estrategia 3: Por patrón fecha+números
      if (contenedoresSalida.length === 0) {
        const candidatos = document.querySelectorAll('div');
        const salidas = [];
        candidatos.forEach(div => {
          const fechas = div.querySelectorAll('input[type="date"]');
          const numeros = div.querySelectorAll('input[type="number"]');
          if (fechas.length >= 1 && numeros.length >= 2) {
            salidas.push(div);
          }
        });
        contenedoresSalida = salidas;
        console.log('🔍 Estrategia 3 - Por patrón fecha+números:', contenedoresSalida.length);
      }
      
      // Estrategia 4: Por estructura Strapi v5
      if (contenedoresSalida.length === 0) {
        contenedoresSalida = document.querySelectorAll('[class*="ComponentEntry"], [class*="component-entry"], [data-testid*="component"]');
        console.log('🔍 Estrategia 4 - Por estructura Strapi v5:', contenedoresSalida.length);
      }
      
      console.log('📦 Total contenedores encontrados:', contenedoresSalida.length);
      
      if (contenedoresSalida.length >= 2) {
        const salidaConDatos = contenedoresSalida[contenedoresSalida.length - 2];
        const salidaVacia = contenedoresSalida[contenedoresSalida.length - 1];
        
        console.log('🎯 COPIANDO DATOS ENTRE SALIDAS:');
        console.log('📍 Salida origen (con datos):', salidaConDatos);
        console.log('📍 Salida destino (vacía):', salidaVacia);
        
        const inputsOrigen = salidaConDatos.querySelectorAll('input, select, textarea');
        const inputsDestino = salidaVacia.querySelectorAll('input, select, textarea');
        
        console.log(`🔍 Inputs - Origen: ${inputsOrigen.length}, Destino: ${inputsDestino.length}`);
        
        let camposCopiados = 0;
        
        inputsOrigen.forEach((inputOrigen, index) => {
          if (!inputOrigen.value && inputOrigen.type !== 'checkbox') return;
          
          const inputsDestinoTipo = Array.from(inputsDestino).filter(inp => 
            inp.type === inputOrigen.type || inp.tagName === inputOrigen.tagName
          );
          
          const inputDestino = inputsDestinoTipo.find((inp, i) => {
            const origenTipo = Array.from(inputsOrigen).filter(io => 
              io.type === inputOrigen.type || io.tagName === inputOrigen.tagName
            );
            return i === origenTipo.indexOf(inputOrigen);
          });
          
          if (inputDestino && inputOrigen.value) {
            const valorAnterior = inputDestino.value;
            inputDestino.value = inputOrigen.value;
            
            ['input', 'change', 'blur', 'focus'].forEach(evento => {
              inputDestino.dispatchEvent(new Event(evento, { bubbles: true, cancelable: true }));
            });
            
            if (inputDestino._valueTracker) {
              inputDestino._valueTracker.setValue(valorAnterior);
            }
            
            camposCopiados++;
            console.log(`✅ COPIADO ${inputOrigen.type}: "${inputOrigen.value}" → "${inputDestino.value}"`);
          }
        });
        
        if (camposCopiados > 0) {
          console.log(`🎉 DUPLICACIÓN EXITOSA: ${camposCopiados} campos copiados`);
          mostrarNotificacion(camposCopiados);
        } else {
          console.log('⚠️ No se copiaron campos - verificar estructura');
          mostrarError('No se pudieron copiar datos de la salida anterior');
        }
      } else {
        console.log(`⚠️ Insuficientes contenedores de salida: ${contenedoresSalida.length} (se necesitan al menos 2)`);
        mostrarError(`Solo se encontraron ${contenedoresSalida.length} salidas. Necesitas al menos 2 para duplicar.`);
      }
    }
    
    // NOTIFICACIÓN EXITOSA
    function mostrarNotificacion(camposCopiados) {
      const notif = document.createElement('div');
      notif.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="font-size: 24px; animation: bounce 1s infinite;">🔥</span>
          <div>
            <div style="font-weight: bold; font-size: 16px;">¡SALIDA DUPLICADA EXITOSAMENTE!</div>
            <div style="font-size: 13px; opacity: 0.9; margin-top: 5px;">
              ${camposCopiados} campos copiados automáticamente
            </div>
          </div>
        </div>
      `;
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35, #f39c12);
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        animation: slideInBounce 0.5s ease-out forwards;
      `;
      
      if (!document.getElementById('duplicator-styles')) {
        const style = document.createElement('style');
        style.id = 'duplicator-styles';
        style.textContent = `
          @keyframes slideInBounce {
            0% { transform: translateX(100%); opacity: 0; }
            60% { transform: translateX(-10px); opacity: 1; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(notif);
      setTimeout(() => {
        notif.style.animation = 'slideInBounce 0.5s ease-out reverse';
        setTimeout(() => notif.remove(), 500);
      }, 5000);
    }
    
    // NOTIFICACIÓN DE ERROR
    function mostrarError(mensaje) {
      const notif = document.createElement('div');
      notif.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 20px;">⚠️</span>
          <div>
            <div style="font-weight: bold;">Error en Duplicación</div>
            <div style="font-size: 12px; opacity: 0.9;">${mensaje}</div>
          </div>
        </div>
      `;
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #dc3545, #fd7e14);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        z-index: 999999;
        font-family: Arial, sans-serif;
        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 5000);
    }
    
    // EJECUTAR CADA 2 SEGUNDOS PARA DETECTAR NUEVOS BOTONES
    setInterval(activarDuplicadorSalidas, 2000);
    
    // EJECUTAR INMEDIATAMENTE
    setTimeout(activarDuplicadorSalidas, 1000);
    
    console.log('🚀 DUPLICADOR DE SALIDAS CONFIGURADO Y ACTIVO');
  },
};