import React from 'react';

const ImportViajesButton = () => {
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const formData = new FormData();
      formData.append('csv', file);
      
      try {
        const res = await fetch('/api/import-viajes', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        alert(data.message || 'Importación completada');
      } catch (err) {
        alert('Error al importar: ' + err.message);
      }
    };
    input.click();
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>Importar Viajes</h1>
      <p>Selecciona un archivo CSV para importar viajes al sistema.</p>
      <button onClick={handleClick} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4945ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Importar CSV
      </button>
    </div>
  );
};

export default ImportViajesButton;