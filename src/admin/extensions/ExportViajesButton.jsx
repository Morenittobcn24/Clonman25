import React from 'react';

const ExportViajesButton = () => {
  const handleExport = async () => {
    try {
      const res = await fetch('/api/export-viajes');
      if (!res.ok) throw new Error('Error al exportar');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'viajes_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al exportar: ' + err.message);
    }
  };

  return (
    <div style={{padding: '20px'}}>
      <h1>Exportar Viajes</h1>
      <p>Haz clic en el botón para descargar todos los viajes en formato CSV.</p>
      <button onClick={handleExport} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4945ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Exportar CSV
      </button>
    </div>
  );
};

export default ExportViajesButton;