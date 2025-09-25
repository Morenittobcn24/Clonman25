export default {
  config: {
    locales: ['es'],
  },
  bootstrap() {
    console.log('🚀 Admin Ultra Limpio - Cargado');
    
    // Una sola función que se ejecuta después de 3 segundos
    setTimeout(() => {
      try {
        // Solo agregar el botón CSV si no existe
        if (document.body && !document.querySelector('#csv-btn-final')) {
          const btn = document.createElement('a');
          btn.id = 'csv-btn-final';
          btn.href = '/csv-tools-advanced.html';
          btn.target = '_blank';
          btn.textContent = '🔧 CSV Tools';
          btn.setAttribute('style', 'position:fixed;top:20px;right:20px;background:#007bff;color:white;padding:15px;border-radius:8px;text-decoration:none;font-weight:bold;z-index:99999;box-shadow:0 4px 8px rgba(0,0,0,0.3);');
          document.body.appendChild(btn);
          console.log('✅ Botón CSV agregado exitosamente');
        }
      } catch (err) {
        console.warn('Error agregando botón:', err);
      }
    }, 3000);
  },
};