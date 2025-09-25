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
    console.log('🚀 ADMIN SUPER SIMPLE INICIADO');
    
    setTimeout(() => {
      // BOTÓN CSV TOOLS - SUPER VISIBLE
      if (!document.querySelector('#csv-export-btn')) {
        const csvBtn = document.createElement('a');
        csvBtn.id = 'csv-export-btn';
        csvBtn.href = '/admin-csv-tools.html';
        csvBtn.target = '_blank';
        csvBtn.innerHTML = '📊 EXPORTAR CSV';
        csvBtn.style.cssText = `
          position: fixed !important;
          top: 10px !important;
          right: 10px !important;
          background: #FF0000 !important;
          color: white !important;
          padding: 15px 25px !important;
          font-size: 16px !important;
          font-weight: bold !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          z-index: 999999 !important;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5) !important;
          animation: blink 1s infinite !important;
        `;
        document.body.appendChild(csvBtn);
        console.log('✅ BOTÓN CSV AGREGADO');
      }
      
      // CSS PARPADEO
      const style = document.createElement('style');
      style.textContent = `
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        /* FECHA FORMATO ESPAÑOL */
        .fecha-es {
          background: #00FF00 !important;
          color: black !important;
          padding: 3px 6px !important;
          border-radius: 3px !important;
          font-weight: bold !important;
          margin-left: 5px !important;
          font-size: 10px !important;
        }
        
        /* BOTÓN DUPLICAR SIMPLE */
        .dup-btn {
          background: #0066FF !important;
          color: white !important;
          padding: 5px 10px !important;
          border: none !important;
          border-radius: 3px !important;
          margin-left: 5px !important;
          cursor: pointer !important;
          font-size: 10px !important;
          font-weight: bold !important;
        }
      `;
      document.head.appendChild(style);
      
      // CARGAR SCRIPT DUPLICADOR
      const script = document.createElement('script');
      script.src = '/viaje-duplicator.js';
      document.head.appendChild(script);
      
      // PROCESAR FECHAS - MUY SIMPLE
      function processFechas() {
        const fechas = document.querySelectorAll('input[type="date"]');
        fechas.forEach(input => {
          // Indicador de formato
          if (!input.nextElementSibling?.classList?.contains('fecha-es')) {
            const span = document.createElement('span');
            span.className = 'fecha-es';
            span.textContent = input.value ? 
              new Date(input.value + 'T00:00:00').toLocaleDateString('es-ES') : 
              'DD/MM/YYYY';
            input.parentNode.insertBefore(span, input.nextSibling);
          }
          
          // Botón duplicar
          if (!input.parentNode.querySelector('.dup-btn')) {
            const btn = document.createElement('button');
            btn.className = 'dup-btn';
            btn.type = 'button';
            btn.textContent = 'DUPLICAR';
            btn.onclick = function(e) {
              e.preventDefault();
              if (input.value) {
                const otras = document.querySelectorAll('input[type="date"]');
                let copiadas = 0;
                otras.forEach(otra => {
                  if (otra !== input && !otra.value) {
                    otra.value = input.value;
                    otra.dispatchEvent(new Event('change', { bubbles: true }));
                    copiadas++;
                  }
                });
                alert(`Fecha copiada a ${copiadas} campos`);
              }
            };
            input.parentNode.insertBefore(btn, input.nextSibling);
          }
          
          // Actualizar al cambiar
          input.addEventListener('change', function() {
            const span = input.nextElementSibling;
            if (span?.classList?.contains('fecha-es')) {
              span.textContent = input.value ? 
                new Date(input.value + 'T00:00:00').toLocaleDateString('es-ES') : 
                'DD/MM/YYYY';
            }
          });
        });
      }
      
      // EJECUTAR CADA SEGUNDO
      setInterval(processFechas, 1000);
      processFechas();
      
      console.log('✅ ADMIN SUPER SIMPLE CARGADO');
      
    }, 500);
  },
};