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
    
    // FUNCIÓN PARA ACTIVAR DUPLICADOR - MEJORADA
    function activarDuplicadorSalidas() {
      // Buscar TODOS los botones en la página
      const allButtons = document.querySelectorAll('button, [role="button"]');
      
      allButtons.forEach(btn => {
        // Buscar botones Add que no hayan sido procesados
        const esBotonAdd = btn.textContent && (
          btn.textContent.includes('Add') || 
          btn.textContent.includes('Añadir') || 
          btn.textContent.includes('entry') ||
          btn.textContent === '+' ||
          btn.innerHTML.includes('plus') ||
          btn.getAttribute('aria-label')?.includes('Add')
        );
        
        if (esBotonAdd && !btn.dataset.duplicadorSalidas) {
          
          // DETECCIÓN MEJORADA - Buscar indicadores de salidas
          const contenedorPadre = btn.closest('[data-strapi-field-name]');
          const nombreCampo = contenedorPadre?.getAttribute('data-strapi-field-name') || '';
          
          const esSalidaBoton = 
            // 1. Por nombre de campo
            nombreCampo.toLowerCase().includes('salida') ||
            // 2. Por presencia de inputs de fecha en el contenedor
            contenedorPadre?.querySelector('input[type="date"]') ||
            // 3. Por estructura de componente repetible
            btn.closest('[class*="DynamicZone"], [class*="RepeatableComponent"]') ||
            // 4. Por elementos padre con texto relacionado
            btn.closest('div')?.textContent?.toLowerCase().includes('salida') ||
            // 5. Buscar en elementos hermanos
            Array.from(btn.parentElement?.children || []).some(child => 
              child.textContent?.toLowerCase().includes('salida') ||
              child.querySelector?.('input[type="date"]')
            );
          
          if (esSalidaBoton) {
            btn.dataset.duplicadorSalidas = 'true';
            
            // Estilo más visible y llamativo
            btn.style.setProperty('background-color', '#ff6b35', 'important');
            btn.style.setProperty('color', 'white', 'important');
            btn.style.setProperty('font-weight', 'bold', 'important');
            btn.style.setProperty('border', '3px solid #e55100', 'important');
            btn.style.setProperty('box-shadow', '0 0 15px rgba(255, 107, 53, 0.7)', 'important');
            btn.style.setProperty('transform', 'scale(1.05)', 'important');
            
            console.log('🔥 BOTÓN SALIDA DETECTADO Y CONFIGURADO:', btn.textContent);
            console.log('📍 Campo:', nombreCampo);
            console.log('📍 Contenedor:', contenedorPadre);
            
            // Interceptar clic con captura
            btn.addEventListener('click', function(e) {
              console.log('� ¡CLIC EN BOTÓN DE SALIDA DETECTADO!');
              console.log('🎯 Botón:', btn.textContent);
              console.log('🎯 Campo:', nombreCampo);
              
              // Múltiples intentos con diferentes delays
              [2000, 4000, 6000].forEach((delay, index) => {
                setTimeout(() => {
                  console.log(`⏰ Intento ${index + 1} de duplicación (${delay}ms)`);
                  duplicarUltimaSalidaMejorado();
                }, delay);
              });
            }, true);
          }
        }
      });
      
      // Debug: Mostrar cuántos botones "Add" se encontraron
      const totalAddButtons = document.querySelectorAll('button').length;
      const salidaButtons = document.querySelectorAll('button[data-duplicador-salidas="true"]').length;
      console.log(`🔍 Debug: ${totalAddButtons} botones totales, ${salidaButtons} botones de salida configurados`);
    }
    
    // FUNCIÓN DUPLICADORA MEJORADA Y ROBUSTA
    function duplicarUltimaSalidaMejorado() {
      console.log('🔄 INICIANDO DUPLICACIÓN MEJORADA DE SALIDA...');
      
      // MÚLTIPLES ESTRATEGIAS DE BÚSQUEDA MÁS AVANZADAS
      let contenedoresSalida = [];
      
      // Estrategia 1: Buscar por atributo específico de campo Salidas
      contenedoresSalida = document.querySelectorAll('[data-strapi-field-name*="alida"], [data-strapi-field-name*="Salida"], [data-strapi-field-name*="salida"]');
      console.log('🔍 Estrategia 1 - Por field-name salidas:', contenedoresSalida.length);
      
      // Estrategia 2: Buscar componentes dinámicos y repetibles
      if (contenedoresSalida.length === 0) {
        contenedoresSalida = document.querySelectorAll('[class*="DynamicZone"] > div, [class*="RepeatableComponent"] > div, [data-strapi-field*="component"] > div');
        console.log('🔍 Estrategia 2 - Por componentes:', contenedoresSalida.length);
      }
      
      // Estrategia 3: Buscar divs que contengan inputs de fecha + número (patrones típicos de salidas)
      if (contenedoresSalida.length === 0) {
        const candidatos = document.querySelectorAll('div');
        const salidas = [];
        candidatos.forEach(div => {
          const fechas = div.querySelectorAll('input[type="date"]');
          const numeros = div.querySelectorAll('input[type="number"]');
          // Que tenga al menos 1 fecha y 2 números (precio, cupo, etc.)
          if (fechas.length >= 1 && numeros.length >= 2) {
            salidas.push(div);
          }
        });
        contenedoresSalida = salidas;
        console.log('🔍 Estrategia 3 - Por patrón fecha+números:', contenedoresSalida.length);
      }
      
      // Estrategia 4: Buscar por estructura común de Strapi v5
      if (contenedoresSalida.length === 0) {
        contenedoresSalida = document.querySelectorAll('[class*="ComponentEntry"], [class*="component-entry"], [data-testid*="component"]');
        console.log('🔍 Estrategia 4 - Por estructura Strapi v5:', contenedoresSalida.length);
      }
      
      console.log('📦 Total contenedores encontrados:', contenedoresSalida.length);
      
      if (contenedoresSalida.length >= 2) {
        // Tomar los dos últimos contenedores (el penúltimo con datos y el último vacío)
        const salidaConDatos = contenedoresSalida[contenedoresSalida.length - 2];
        const salidaVacia = contenedoresSalida[contenedoresSalida.length - 1];
        
        console.log('🎯 COPIANDO DATOS ENTRE SALIDAS:');
        console.log('📍 Salida origen (con datos):', salidaConDatos);
        console.log('📍 Salida destino (vacía):', salidaVacia);
        
        // Obtener todos los inputs de ambas salidas
        const inputsOrigen = salidaConDatos.querySelectorAll('input, select, textarea');
        const inputsDestino = salidaVacia.querySelectorAll('input, select, textarea');
        
        console.log(`🔍 Inputs - Origen: ${inputsOrigen.length}, Destino: ${inputsDestino.length}`);
        
        let camposCopiados = 0;
        
        // Mapear y copiar por tipo de input
        inputsOrigen.forEach((inputOrigen, index) => {
          if (!inputOrigen.value && inputOrigen.type !== 'checkbox') return;
          
          // Buscar el input correspondiente en destino por tipo y posición
          const inputsDestinoTipo = Array.from(inputsDestino).filter(inp => 
            inp.type === inputOrigen.type || inp.tagName === inputOrigen.tagName
          );
          
          const inputDestino = inputsDestinoTipo.find((inp, i) => {
            // Intentar mapear por posición relativa del mismo tipo
            const origenTipo = Array.from(inputsOrigen).filter(io => 
              io.type === inputOrigen.type || io.tagName === inputOrigen.tagName
            );
            return i === origenTipo.indexOf(inputOrigen);
          });
          
          if (inputDestino && inputOrigen.value) {
            const valorAnterior = inputDestino.value;
            inputDestino.value = inputOrigen.value;
            
            // Disparar múltiples eventos para compatibilidad con React/Strapi
            ['input', 'change', 'blur', 'focus'].forEach(evento => {
              inputDestino.dispatchEvent(new Event(evento, { bubbles: true, cancelable: true }));
            });
            
            // Disparar eventos específicos de React si están disponibles
            if (inputDestino._valueTracker) {
              inputDestino._valueTracker.setValue(valorAnterior);
            }
            
            camposCopiados++;
            console.log(`✅ COPIADO ${inputOrigen.type}: "${inputOrigen.value}" → "${inputDestino.value}"`);
          }
        });
        
        if (camposCopiados > 0) {
          console.log(`🎉 DUPLICACIÓN EXITOSA: ${camposCopiados} campos copiados`);
          mostrarNotificacionDuplicacionMejorada(camposCopiados);
        } else {
          console.log('⚠️ No se copiaron campos - verificar estructura');
          mostrarNotificacionError('No se pudieron copiar datos de la salida anterior');
        }
      } else {
        console.log(`⚠️ Insuficientes contenedores de salida: ${contenedoresSalida.length} (se necesitan al menos 2)`);
        mostrarNotificacionError(`Solo se encontraron ${contenedoresSalida.length} salidas. Necesitas al menos 2 para duplicar.`);
      }
    }
    
    // Mantener la función original también
    function duplicarUltimaSalida() {
      duplicarUltimaSalidaMejorado();
    }
    
    // NOTIFICACIÓN MEJORADA
    function mostrarNotificacionDuplicacionMejorada(camposCopiados = 0) {
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
      
      // Agregar estilos de animación
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
      
      if (salidas.length === 0) {
        // Estrategia 3: Buscar por contenido específico (fecha + precio/cupo)
        const todosDivs = document.querySelectorAll('div');
        const componentesSalida = [];
        
        todosDivs.forEach(div => {
          const fechas = div.querySelectorAll('input[type="date"]');
          const numeros = div.querySelectorAll('input[type="number"]');
          const labels = div.querySelectorAll('label');
          
          // Verificar si es una salida por contenido (fechas + números + labels indicativos)
          const tieneFechas = fechas.length >= 1;
          const tieneNumeros = numeros.length >= 1;
          const tieneLabelsRelacionados = Array.from(labels).some(label => 
            label.textContent && (
              label.textContent.toLowerCase().includes('fecha') ||
              label.textContent.toLowerCase().includes('precio') ||
              label.textContent.toLowerCase().includes('cupo')
            )
          );
          
          if (tieneFechas && tieneNumeros && tieneLabelsRelacionados) {
            // Verificar que sea un contenedor directo (no demasiado amplio)
            if (div.children.length > 0 && div.children.length < 20) {
              componentesSalida.push(div);
            }
          }
        });
        
        salidas = componentesSalida;
        console.log('🔍 Estrategia 3 - Por contenido:', salidas.length);
      }
      
      if (salidas.length === 0) {
        // Estrategia 4: Buscar cualquier div que contenga inputs de fecha (último recurso)
        const contenedores = [];
        document.querySelectorAll('div').forEach(div => {
          if (div.querySelector('input[type="date"]') && div.querySelectorAll('input').length >= 3) {
            contenedores.push(div);
          }
        });
        salidas = contenedores;
        console.log('🔍 Estrategia 4 - Por inputs de fecha:', salidas.length);
      }
      
      console.log('📦 Contenedores de salidas encontrados:', salidas.length);
      console.log('🔍 Selectores utilizados, buscando componentes...');
      
      // Si no encontramos salidas específicas, busquemos todos los componentes
      if (salidas.length === 0) {
        // Buscar todos los div que contengan inputs de fecha y número juntos
        const todosDivs = document.querySelectorAll('div');
        const componentesSalida = [];
        
        todosDivs.forEach(div => {
          const fechas = div.querySelectorAll('input[type="date"]');
          const numeros = div.querySelectorAll('input[type="number"]');
          
          // Si tiene al menos 1 fecha y 1 número, es probablemente una salida
          if (fechas.length >= 1 && numeros.length >= 1) {
            componentesSalida.push(div);
          }
        });
        
        salidas = componentesSalida;
        console.log('📦 Componentes de salida encontrados por contenido:', salidas.length);
      }
      
      if (salidas.length >= 2) {
        const ultimaSalida = salidas[salidas.length - 2]; // Penúltima (con datos)
        const nuevaSalida = salidas[salidas.length - 1]; // Última (vacía)
        
        console.log('🎯 Copiando desde última salida completa');
        console.log('📍 Salida origen:', ultimaSalida);
        console.log('📍 Salida destino:', nuevaSalida);
        
        // Copiar todos los inputs con valor
        const inputsOrigen = ultimaSalida.querySelectorAll('input, select, textarea');
        const inputsDestino = nuevaSalida.querySelectorAll('input, select, textarea');
        
        console.log(`🔍 Inputs encontrados - Origen: ${inputsOrigen.length}, Destino: ${inputsDestino.length}`);
        console.log('📝 Inputs origen:', Array.from(inputsOrigen).map(i => `${i.type || i.tagName}:${i.value}`));
        console.log('📝 Inputs destino:', Array.from(inputsDestino).map(i => `${i.type || i.tagName}:${i.value}`));
        
        // Mapear inputs por tipo y posición
        let fechaIndex = 0, numeroIndex = 0, selectIndex = 0, textIndex = 0, copiados = 0;
        
        inputsOrigen.forEach((inputOrigen) => {
          if (!inputOrigen.value && inputOrigen.type !== 'checkbox') return; // Saltar inputs vacíos
          
          let inputDestino = null;
          
          // Buscar el input correspondiente por tipo
          if (inputOrigen.type === 'date') {
            const fechasDestino = Array.from(inputsDestino).filter(input => input.type === 'date');
            inputDestino = fechasDestino[fechaIndex];
            fechaIndex++;
          } else if (inputOrigen.type === 'number') {
            const numerosDestino = Array.from(inputsDestino).filter(input => input.type === 'number');
            inputDestino = numerosDestino[numeroIndex];
            numeroIndex++;
          } else if (inputOrigen.tagName === 'SELECT') {
            const selectsDestino = Array.from(inputsDestino).filter(input => input.tagName === 'SELECT');
            inputDestino = selectsDestino[selectIndex];
            selectIndex++;
          } else if (inputOrigen.type === 'text' || inputOrigen.type === 'email' || inputOrigen.tagName === 'TEXTAREA') {
            const textsDestino = Array.from(inputsDestino).filter(input => 
              input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA'
            );
            inputDestino = textsDestino[textIndex];
            textIndex++;
          }
          
          // Copiar el valor si encontramos el input destino
          if (inputDestino && inputOrigen.value) {
            const valorAnterior = inputDestino.value;
            inputDestino.value = inputOrigen.value;
            
            // Disparar múltiples eventos para asegurar que Strapi detecte el cambio
            const eventos = ['input', 'change', 'blur', 'keyup', 'focus'];
            eventos.forEach(evento => {
              inputDestino.dispatchEvent(new Event(evento, { bubbles: true }));
            });
            
            // También disparar eventos en React si está disponible
            if (inputDestino._valueTracker) {
              inputDestino._valueTracker.setValue(valorAnterior);
            }
            
            copiados++;
            console.log(`✅ COPIADO ${inputOrigen.type || inputOrigen.tagName}: "${inputOrigen.value}" -> "${inputDestino.value}"`);
          } else if (inputOrigen.value) {
            console.log(`⚠️ NO SE PUDO COPIAR ${inputOrigen.type || inputOrigen.tagName}: "${inputOrigen.value}" (input destino no encontrado)`);
          }
        });
        
        // Mostrar confirmación visual con contador
        console.log(`🎉 DUPLICACIÓN COMPLETADA: ${copiados} campos copiados`);
        mostrarNotificacionDuplicacion(copiados);
        
      } else {
        console.log('⚠️ No hay suficientes salidas para duplicar. Encontradas:', salidas.length);
        console.log('🔍 Debug - Elementos encontrados:', salidas);
        mostrarNotificacionError(`Solo se encontraron ${salidas.length} salidas. Se necesitan al menos 2.`);
      }
    }
    
    // NOTIFICACIÓN VISUAL
    function mostrarNotificacionDuplicacion(copiados = 0) {
      const notif = document.createElement('div');
      notif.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 20px;">🔥</span>
          <div>
            <div style="font-weight: bold;">¡SALIDA DUPLICADA!</div>
            <div style="font-size: 12px; opacity: 0.9;">${copiados > 0 ? `${copiados} campos copiados correctamente` : 'Datos copiados de la última salida'}</div>
          </div>
        </div>
      `;
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        z-index: 999999;
        font-family: Arial, sans-serif;
        box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
      `;
      
      // Agregar animación CSS
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(notif);
      setTimeout(() => {
        notif.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notif.remove(), 300);
      }, 4000);
    }
    
    // NOTIFICACIÓN DE ERROR
    function mostrarNotificacionError(mensaje) {
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