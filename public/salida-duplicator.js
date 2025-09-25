/**
 * DUPLICADOR DE SALIDAS ESPECÍFICO
 * Solo duplica información de fechas de salida (subcomponente)
 */

console.log('🔧 Cargando duplicador de salidas...');

// Función principal para duplicar salidas
function duplicarSalidaAvanzado() {
  // Detectar si estamos en la página de edición de viajes
  if (!window.location.href.includes('viaje') && !window.location.href.includes('Viaje')) {
    return;
  }
  
  // Buscar contenedores de salidas
  const salidaContainers = document.querySelectorAll('[data-strapi-field*="Salidas"], [data-strapi-field*="salidas"]');
  
  salidaContainers.forEach(container => {
    // Buscar botón "Add an entry" o similar
    const addButtons = container.querySelectorAll('button[type="button"]');
    
    addButtons.forEach(addBtn => {
      if ((addBtn.textContent.includes('Add') || addBtn.textContent.includes('Agregar')) && 
          !addBtn.dataset.salidaDuplicatorAdded) {
        
        addBtn.dataset.salidaDuplicatorAdded = 'true';
        
        // Crear botón duplicador naranja
        const duplicateBtn = document.createElement('button');
        duplicateBtn.type = 'button';
        duplicateBtn.innerHTML = '🔄 DUPLICAR ÚLTIMA SALIDA';
        duplicateBtn.className = 'salida-duplicate-btn';
        
        // Estilos del botón
        duplicateBtn.style.cssText = `
          background: linear-gradient(135deg, #FF8C00, #FF6B35) !important;
          color: white !important;
          border: none !important;
          padding: 10px 15px !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-left: 10px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3) !important;
        `;
        
        // Efectos hover
        duplicateBtn.addEventListener('mouseenter', () => {
          duplicateBtn.style.transform = 'translateY(-2px)';
          duplicateBtn.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.4)';
        });
        
        duplicateBtn.addEventListener('mouseleave', () => {
          duplicateBtn.style.transform = 'translateY(0)';
          duplicateBtn.style.boxShadow = '0 2px 8px rgba(255, 107, 53, 0.3)';
        });
        
        // Funcionalidad de duplicado
        duplicateBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          try {
            const resultado = duplicarDatosDeSalida(container);
            if (resultado.success) {
              // Feedback visual
              duplicateBtn.innerHTML = '✅ DUPLICADO';
              duplicateBtn.style.background = '#28a745';
              
              setTimeout(() => {
                duplicateBtn.innerHTML = '🔄 DUPLICAR ÚLTIMA SALIDA';
                duplicateBtn.style.background = 'linear-gradient(135deg, #FF8C00, #FF6B35)';
              }, 2000);
              
              alert(`✅ Salida duplicada exitosamente!\n${resultado.campos} campos copiados.`);
            } else {
              alert(`⚠️ ${resultado.mensaje}`);
            }
          } catch (error) {
            console.error('Error duplicando salida:', error);
            alert('❌ Error al duplicar la salida');
          }
        });
        
        // Insertar el botón después del botón Add
        addBtn.parentNode.insertBefore(duplicateBtn, addBtn.nextSibling);
        console.log('✅ Botón duplicador de salida agregado');
      }
    });
  });
}

// Función para duplicar datos específicos de salida
function duplicarDatosDeSalida(container) {
  // Buscar todas las salidas en el container
  const salidas = Array.from(container.querySelectorAll('.components-container > div, [data-strapi-field-name] > div')).filter(div => {
    return div.querySelector('input, select, textarea'); // Solo divs que contengan campos de formulario
  });
  
  if (salidas.length < 2) {
    return {
      success: false,
      mensaje: 'Necesitas al menos 2 salidas para duplicar. Agrega una nueva salida primero.'
    };
  }
  
  // La penúltima salida (con datos) y la última (vacía)
  const salidaOrigen = salidas[salidas.length - 2];
  const salidaDestino = salidas[salidas.length - 1];
  
  // Campos específicos de salida que queremos duplicar
  const selectoresCampos = [
    // Fecha de inicio
    'input[name*="Fecha_inicio"]',
    'input[name*="fecha_inicio"]',
    'input[type="date"]',
    
    // Cupo disponible
    'input[name*="Cupo_disponible"]',
    'input[name*="cupo_disponible"]',
    'input[name*="cupo"]',
    
    // Estado
    'select[name*="Estado"]',
    'select[name*="estado"]',
    
    // Precio
    'input[name*="Precio_pax"]',
    'input[name*="precio_pax"]',
    'input[name*="precio"]',
    'input[name*="Precio"]',
    
    // Campos numéricos generales
    'input[type="number"]'
  ];
  
  let camposCopiados = 0;
  const detallesCopiados = [];
  
  selectoresCampos.forEach(selector => {
    const campoOrigen = salidaOrigen.querySelector(selector);
    const campoDestino = salidaDestino.querySelector(selector);
    
    if (campoOrigen && campoDestino && campoOrigen.value && !campoDestino.value) {
      // Copiar el valor
      campoDestino.value = campoOrigen.value;
      
      // Disparar eventos para que Strapi detecte el cambio
      campoDestino.dispatchEvent(new Event('input', { bubbles: true }));
      campoDestino.dispatchEvent(new Event('change', { bubbles: true }));
      campoDestino.dispatchEvent(new Event('blur', { bubbles: true }));
      
      camposCopiados++;
      
      // Guardar detalles para el log
      const fieldName = campoOrigen.name || campoOrigen.getAttribute('data-field') || selector;
      detallesCopiados.push(`${fieldName}: ${campoOrigen.value}`);
    }
  });
  
  if (camposCopiados > 0) {
    console.log('🔄 Salida duplicada:', detallesCopiados);
    return {
      success: true,
      campos: camposCopiados,
      detalles: detallesCopiados
    };
  } else {
    return {
      success: false,
      mensaje: 'No se encontraron campos para duplicar o la nueva salida ya tiene datos.'
    };
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(duplicarSalidaAvanzado, 1000);
    // Revisar cada 3 segundos para nuevos formularios
    setInterval(duplicarSalidaAvanzado, 3000);
  });
} else {
  setTimeout(duplicarSalidaAvanzado, 1000);
  setInterval(duplicarSalidaAvanzado, 3000);
}

// Exportar para uso global
window.duplicarSalidaAvanzado = duplicarSalidaAvanzado;
window.duplicarDatosDeSalida = duplicarDatosDeSalida;

console.log('✅ Duplicador de salidas cargado correctamente');