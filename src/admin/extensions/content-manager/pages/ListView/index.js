import React from 'react';
import ImportViajesButton from '../ImportViajesButton.jsx';
import ExportViajesButton from '../ExportViajesButton.jsx';

const ViajeListView = (props) => {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '1px solid #eee'
      }}>
        <ImportViajesButton />
        <ExportViajesButton />
      </div>
      {props.children}
    </div>
  );
};

export default ViajeListView;