import React, { useState } from 'react';

const ImportViajesButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('csv', file);
      const res = await fetch('/api/import-viajes', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setMessage(result.message || 'Importación completada');
    } catch (err) {
      setMessage('Error al importar: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{padding: '8px 16px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>
        Importar Viajes CSV
      </button>
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
          <div style={{background: '#fff', padding: 24, borderRadius: 8, minWidth: 300}}>
            <h2>Importar CSV de Viajes</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleImport} disabled={loading} style={{marginTop: 12, padding: '8px 16px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>
              {loading ? 'Importando...' : 'Importar'}
            </button>
            {message && <p>{message}</p>}
            <button onClick={() => setShowModal(false)} style={{marginTop: 12, padding: '4px 12px', background: '#f5f5f5', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer'}}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportViajesButton;