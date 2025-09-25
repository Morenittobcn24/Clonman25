export default {
  config: {
    locales: ['es'],
  },
  bootstrap() {
    // Log inicial
    console.log('Admin Bootstrap - Versión Ultra Minimalista');
    
    // Una sola función que se ejecuta una vez y ya
    const addCSVButton = () => {
      try {
        // Verificar que existe document.body
        if (!document.body) {
          console.log('DOM no listo, reintentando...');
          setTimeout(addCSVButton, 2000);
          return;
        }
        
        // Solo agregar si no existe
        if (document.getElementById('csv-btn')) {
          console.log('Botón ya existe');
          return;
        }
        
        // Crear botón simple
        const btn = document.createElement('a');
        btn.id = 'csv-btn';
        btn.href = '/csv-tools-advanced.html';
        btn.target = '_blank';
        btn.textContent = 'CSV Tools';
        
        // Estilos básicos inline
        btn.style.cssText = 'position:fixed;top:20px;right:20px;background:#007bff;color:white;padding:10px;border-radius:5px;text-decoration:none;z-index:9999;';
        
        // Agregar al DOM
        document.body.appendChild(btn);
        console.log('Botón CSV agregado');
        
      } catch (error) {
        console.error('Error agregando botón:', error);
      }
    };
    
    // Ejecutar después de 4 segundos (una sola vez)
    setTimeout(addCSVButton, 4000);
  },
};