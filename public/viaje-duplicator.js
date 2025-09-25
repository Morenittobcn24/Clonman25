// Extensión para duplicar la última salida de un viaje
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Cargando extensión de duplicar salidas...');
  
  // Función para duplicar la última salida
  function duplicateLastSalida() {
    // Buscar todos los componentes de salida
    const salidaComponents = document.querySelectorAll('[data-strapi-field*="Salidas"]');
    
    if (salidaComponents.length === 0) {
      console.log('❌ No se encontraron componentes de salidas');
      return;
    }
    
    console.log(`✅ Encontrados ${salidaComponents.length} componentes de salidas`);
    
    // Buscar el último componente con datos
    let lastSalidaWithData = null;
    let lastSalidaData = {};
    
    salidaComponents.forEach((component, index) => {
      const fechaInput = component.querySelector('input[type="date"]');
      const precioInput = component.querySelector('input[type="number"]');
      const cupoInput = component.querySelector('input[name*="Cupo"]');
      
      if (fechaInput && fechaInput.value) {
        lastSalidaWithData = component;
        lastSalidaData = {
          fecha: fechaInput.value,
          precio: precioInput ? precioInput.value : '',
          cupo: cupoInput ? cupoInput.value : ''
        };
        console.log(`📋 Datos de salida ${index}:`, lastSalidaData);
      }
    });
    
    if (!lastSalidaWithData) {
      alert('❌ No se encontró ninguna salida con datos para duplicar');
      return;
    }
    
    // Buscar una salida vacía para llenar
    let emptySalida = null;
    salidaComponents.forEach(component => {
      const fechaInput = component.querySelector('input[type="date"]');
      if (fechaInput && !fechaInput.value && !emptySalida) {
        emptySalida = component;
      }
    });
    
    if (!emptySalida) {
      alert('❌ No se encontró ninguna salida vacía para duplicar los datos');
      return;
    }
    
    // Duplicar los datos
    const targetFechaInput = emptySalida.querySelector('input[type="date"]');
    const targetPrecioInput = emptySalida.querySelector('input[type="number"]');
    const targetCupoInput = emptySalida.querySelector('input[name*="Cupo"]');
    
    if (targetFechaInput) {
      targetFechaInput.value = lastSalidaData.fecha;
      targetFechaInput.dispatchEvent(new Event('input', { bubbles: true }));
      targetFechaInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    if (targetPrecioInput && lastSalidaData.precio) {
      targetPrecioInput.value = lastSalidaData.precio;
      targetPrecioInput.dispatchEvent(new Event('input', { bubbles: true }));
      targetPrecioInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    if (targetCupoInput && lastSalidaData.cupo) {
      targetCupoInput.value = lastSalidaData.cupo;
      targetCupoInput.dispatchEvent(new Event('input', { bubbles: true }));
      targetCupoInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    alert('✅ Datos de la última salida duplicados correctamente');
  }
  
  // Agregar botón de duplicar
  function addDuplicateButton() {
    if (document.querySelector('.duplicate-salida-btn')) {
      return; // Ya existe
    }
    
    // Buscar donde agregar el botón
    const salidaSection = document.querySelector('[data-strapi-field*="Salidas"]');
    if (salidaSection) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'duplicate-salida-btn';
      button.innerHTML = '🔄 DUPLICAR ÚLTIMA SALIDA';
      button.style.cssText = `
        background: #FF6B35 !important;
        color: white !important;
        border: none !important;
        padding: 10px 15px !important;
        border-radius: 5px !important;
        font-weight: bold !important;
        margin: 10px 0 !important;
        cursor: pointer !important;
        font-size: 12px !important;
      `;
      
      button.onclick = duplicateLastSalida;
      
      // Insertar el botón al principio de la sección
      salidaSection.insertBefore(button, salidaSection.firstChild);
      
      console.log('✅ Botón de duplicar salida agregado');
    }
  }
  
  // Ejecutar cada 2 segundos
  setInterval(addDuplicateButton, 2000);
  
  // Ejecutar inmediatamente
  setTimeout(addDuplicateButton, 1000);
});

// También ejecutar cuando la página cambie (navegación SPA)
window.addEventListener('popstate', function() {
  setTimeout(() => {
    console.log('🔄 Página cambiada, reagregando botón...');
    addDuplicateButton();
  }, 1000);
});