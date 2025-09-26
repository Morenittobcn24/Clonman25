let fechasOriginales = [];
let fechasDuplicadas = [];

function cargarDatos() {
    const datos = document.getElementById('inputDatos').value.trim();
    
    if (!datos) {
        mostrarError('Por favor, ingrese datos para procesar');
        return;
    }

    try {
        // Limpiar arrays
        fechasOriginales = [];
        fechasDuplicadas = [];
        
        // Procesar línea por línea
        const lineas = datos.split('\n');
        
        lineas.forEach((linea, index) => {
            const lineaTrim = linea.trim();
            if (lineaTrim) {
                // Buscar fechas en formato DD/MM/YYYY o DD-MM-YYYY
                const fechaMatch = lineaTrim.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
                
                if (fechaMatch) {
                    const [_, dia, mes, año] = fechaMatch;
                    const fechaOriginal = new Date(año, mes - 1, dia);
                    
                    if (!isNaN(fechaOriginal.getTime())) {
                        fechasOriginales.push({
                            linea: index + 1,
                            texto: lineaTrim,
                            fecha: fechaOriginal,
                            fechaTexto: `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${año}`
                        });
                    }
                }
            }
        });

        if (fechasOriginales.length === 0) {
            mostrarError('No se encontraron fechas válidas en el formato DD/MM/YYYY o DD-MM-YYYY');
            return;
        }

        mostrarFechasOriginales();
        document.getElementById('controles').style.display = 'block';
        
    } catch (error) {
        mostrarError('Error al procesar los datos: ' + error.message);
    }
}

function mostrarFechasOriginales() {
    const container = document.getElementById('fechasOriginales');
    container.innerHTML = '<h3>Fechas Encontradas:</h3>';
    
    fechasOriginales.forEach(item => {
        const div = document.createElement('div');
        div.className = 'fecha-item';
        div.innerHTML = `
            <span class="linea">Línea ${item.linea}:</span>
            <span class="fecha">${item.fechaTexto}</span>
            <span class="texto">${item.texto}</span>
        `;
        container.appendChild(div);
    });
}

function duplicarFechas() {
    const dias = parseInt(document.getElementById('diasDuplicar').value);
    const veces = parseInt(document.getElementById('vecesDuplicar').value);
    
    if (isNaN(dias) || isNaN(veces) || dias <= 0 || veces <= 0) {
        mostrarError('Ingrese valores válidos para días y número de duplicaciones');
        return;
    }

    fechasDuplicadas = [];
    
    fechasOriginales.forEach(item => {
        // Agregar fecha original
        fechasDuplicadas.push({
            ...item,
            esDuplicada: false
        });
        
        // Generar duplicadas
        for (let i = 1; i <= veces; i++) {
            const nuevaFecha = new Date(item.fecha);
            nuevaFecha.setDate(nuevaFecha.getDate() + (dias * i));
            
            const dia = nuevaFecha.getDate().toString().padStart(2, '0');
            const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0');
            const año = nuevaFecha.getFullYear();
            const nuevaFechaTexto = `${dia}/${mes}/${año}`;
            
            // Reemplazar fecha en el texto original
            const nuevoTexto = item.texto.replace(
                /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
                nuevaFechaTexto
            );
            
            fechasDuplicadas.push({
                linea: item.linea,
                texto: nuevoTexto,
                fecha: nuevaFecha,
                fechaTexto: nuevaFechaTexto,
                esDuplicada: true,
                duplicadaNum: i
            });
        }
    });
    
    mostrarResultados();
}

function mostrarResultados() {
    const container = document.getElementById('resultado');
    container.innerHTML = '<h3>Resultados:</h3>';
    
    fechasDuplicadas.forEach(item => {
        const div = document.createElement('div');
        div.className = `fecha-item ${item.esDuplicada ? 'duplicada' : 'original'}`;
        
        const tipo = item.esDuplicada ? `Duplicada ${item.duplicadaNum}` : 'Original';
        
        div.innerHTML = `
            <span class="tipo">${tipo}</span>
            <span class="fecha">${item.fechaTexto}</span>
            <span class="texto">${item.texto}</span>
        `;
        container.appendChild(div);
    });
    
    document.getElementById('exportar').style.display = 'block';
}

function exportarResultados() {
    if (fechasDuplicadas.length === 0) {
        mostrarError('No hay resultados para exportar');
        return;
    }
    
    const contenido = fechasDuplicadas.map(item => item.texto).join('\n');
    
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fechas_duplicadas_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function limpiarTodo() {
    document.getElementById('inputDatos').value = '';
    document.getElementById('diasDuplicar').value = '30';
    document.getElementById('vecesDuplicar').value = '3';
    document.getElementById('fechasOriginales').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('controles').style.display = 'none';
    document.getElementById('exportar').style.display = 'none';
    fechasOriginales = [];
    fechasDuplicadas = [];
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error') || crearElementoError();
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function crearElementoError() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';
    errorDiv.className = 'error-message';
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.container').firstChild);
    return errorDiv;
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners a los botones
    document.getElementById('cargarDatos').addEventListener('click', cargarDatos);
    document.getElementById('duplicar').addEventListener('click', duplicarFechas);
    document.getElementById('exportar').addEventListener('click', exportarResultados);
    document.getElementById('limpiar').addEventListener('click', limpiarTodo);
    
    // Permitir carga con Enter en el textarea
    document.getElementById('inputDatos').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            cargarDatos();
        }
    });
});
