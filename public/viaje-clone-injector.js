// Archivo: /workspaces/Clonman25/src/admin/extensions/viaje-clone-injector.js

(function() {
  'use strict';

  // Función para agregar el botón de clonar fecha
  function addCloneDateButton() {
    // Verificar si estamos en la página de edición de viajes
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/content-manager/collection-types/api::viaje.viaje/')) {
      return;
    }

    // Buscar el contenedor de salidas
    const salidasSection = document.querySelector('[data-strapi-field="Salidas"]');
    if (!salidasSection) {
      setTimeout(addCloneDateButton, 1000); // Reintentar después de 1 segundo
      return;
    }

    // Verificar si ya existe el botón
    if (document.getElementById('clone-date-btn')) {
      return;
    }

    // Crear el botón de clonar fecha
    const cloneButton = document.createElement('button');
    cloneButton.id = 'clone-date-btn';
    cloneButton.innerHTML = '📅 Clonar Fecha';
    cloneButton.className = 'clone-date-button';
    cloneButton.style.cssText = `
      background: #4945ff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      margin: 8px 0;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    `;

    cloneButton.addEventListener('click', showCloneDialog);

    // Insertar el botón cerca de la sección de salidas
    const headerSection = salidasSection.querySelector('[role="button"]') || salidasSection.firstChild;
    if (headerSection && headerSection.parentNode) {
      headerSection.parentNode.insertBefore(cloneButton, headerSection.nextSibling);
    }
  }

  // Función para mostrar el diálogo de clonación
  function showCloneDialog() {
    // Obtener datos actuales de salidas
    const salidaCards = document.querySelectorAll('[data-strapi-field="Salidas"] .card');
    
    if (salidaCards.length === 0) {
      alert('No hay fechas de salida para clonar. Agrega al menos una fecha primero.');
      return;
    }

    // Crear el diálogo
    const dialogHTML = `
      <div id="clone-date-dialog" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      ">
        <div style="
          background: white;
          padding: 24px;
          border-radius: 8px;
          min-width: 400px;
          max-width: 500px;
        ">
          <h3 style="margin-top: 0;">🔄 Clonar Fecha de Salida</h3>
          <p>Selecciona una fecha existente para clonar con nuevas fechas:</p>
          
          <div style="margin: 16px 0;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">
              Fecha Original a Clonar:
            </label>
            <select id="original-salida-select" style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            ">
              <option value="">Selecciona una fecha...</option>
            </select>
          </div>

          <div style="margin: 16px 0;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">
              Nueva Fecha de Inicio:
            </label>
            <input type="date" id="new-start-date" style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            ">
          </div>

          <div style="margin: 16px 0;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">
              Nueva Fecha de Fin:
            </label>
            <input type="date" id="new-end-date" style="
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
            ">
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
            <button onclick="closeCloneDialog()" style="
              background: #f6f6f9;
              color: #666;
              border: 1px solid #ddd;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
            ">
              Cancelar
            </button>
            <button onclick="executeClone()" style="
              background: #4945ff;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
            ">
              Clonar Fecha
            </button>
          </div>
        </div>
      </div>
    `;

    // Agregar el diálogo al DOM
    document.body.insertAdjacentHTML('beforeend', dialogHTML);

    // Poblar el select con las fechas existentes
    populateSalidaSelect();
  }

  // Función para poblar el select con fechas existentes
  function populateSalidaSelect() {
    const select = document.getElementById('original-salida-select');
    const salidaInputs = document.querySelectorAll('[data-strapi-field="Salidas"] input[type="date"]');
    
    salidaInputs.forEach((input, index) => {
      if (input.value) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Fecha ${index + 1}: ${formatDateToSpanish(input.value)}`;
        select.appendChild(option);
      }
    });
  }

  // Función para formatear fecha en español
  function formatDateToSpanish(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES');
  }

  // Función para cerrar el diálogo
  window.closeCloneDialog = function() {
    const dialog = document.getElementById('clone-date-dialog');
    if (dialog) {
      dialog.remove();
    }
  };

  // Función para ejecutar la clonación
  window.executeClone = function() {
    const originalIndex = document.getElementById('original-salida-select').value;
    const newStartDate = document.getElementById('new-start-date').value;
    const newEndDate = document.getElementById('new-end-date').value;

    if (!originalIndex) {
      alert('Por favor selecciona una fecha original para clonar.');
      return;
    }

    if (!newStartDate) {
      alert('Por favor selecciona la nueva fecha de inicio.');
      return;
    }

    // Buscar los campos de la salida original
    const salidaCards = document.querySelectorAll('[data-strapi-field="Salidas"] > div > div > div');
    if (!salidaCards[originalIndex]) {
      alert('Error: No se pudo encontrar la fecha original.');
      return;
    }

    try {
      // Encontrar el botón de agregar nueva salida
      const addButton = document.querySelector('[data-strapi-field="Salidas"] button[aria-label*="Add"]') || 
                       document.querySelector('[data-strapi-field="Salidas"] button[type="button"]:last-of-type');
      
      if (addButton) {
        addButton.click();
        
        // Esperar a que se cree la nueva salida y luego llenar los datos
        setTimeout(() => {
          cloneSalidaData(originalIndex, newStartDate, newEndDate);
          closeCloneDialog();
        }, 500);
      } else {
        alert('No se pudo encontrar el botón para agregar nueva salida.');
      }
    } catch (error) {
      console.error('Error al clonar fecha:', error);
      alert('Error al clonar la fecha. Verifica la consola para más detalles.');
    }
  };

  // Función para clonar los datos de una salida
  function cloneSalidaData(originalIndex, newStartDate, newEndDate) {
    const salidaCards = document.querySelectorAll('[data-strapi-field="Salidas"] > div > div > div');
    const originalCard = salidaCards[originalIndex];
    const newCard = salidaCards[salidaCards.length - 1]; // La última es la nueva

    if (!originalCard || !newCard) {
      console.error('No se encontraron las tarjetas de salida');
      return;
    }

    // Copiar todos los campos excepto fechas
    const originalInputs = originalCard.querySelectorAll('input, select, textarea');
    const newInputs = newCard.querySelectorAll('input, select, textarea');

    originalInputs.forEach((originalInput, index) => {
      const newInput = newInputs[index];
      if (!newInput) return;

      // No copiar fechas, usar las nuevas
      if (originalInput.type === 'date') {
        if (originalInput.name && originalInput.name.includes('inicio')) {
          newInput.value = newStartDate;
        } else if (originalInput.name && originalInput.name.includes('fin')) {
          newInput.value = newEndDate || newStartDate;
        }
      } else {
        // Copiar otros valores
        newInput.value = originalInput.value;
      }

      // Disparar evento de cambio
      newInput.dispatchEvent(new Event('input', { bubbles: true }));
      newInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    alert(`✅ Fecha clonada exitosamente con fechas ${formatDateToSpanish(newStartDate)} - ${formatDateToSpanish(newEndDate || newStartDate)}`);
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCloneDateButton);
  } else {
    addCloneDateButton();
  }

  // También reintentar cuando cambie la ruta (navegación SPA)
  let currentUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      setTimeout(addCloneDateButton, 1000);
    }
  });
  
  observer.observe(document, { childList: true, subtree: true });

})();