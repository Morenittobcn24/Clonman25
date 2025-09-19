import React, { useState } from 'react';

const ExportViajesButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <button onClick={handleExport} disabled={loading} style={{padding: '8px 16px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>
      {loading ? 'Exportando...' : 'Exportar Viajes CSV'}
    </button>
  );
};

export default ExportViajesButton;
