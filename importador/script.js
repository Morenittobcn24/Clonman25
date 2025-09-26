let datosImportados = [];
let archivoActual = null;

class ImportadorDatos {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        this.configurarEventListeners();
        this.configurarDropZone();
    }

    configurarEventListeners() {
        const fileInput = document.getElementById('fileInput');
        const processBtn = document.getElementById('processBtn');
        const exportBtn = document.getElementById('exportBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.manejarArchivo(e.target.files[0]));
        }
        
        if (processBtn) {
            processBtn.addEventListener('click', () => this.procesarDatos());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportarDatos());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.limpiarTodo());
        }
    }

    configurarDropZone() {
        const dropZone = document.getElementById('dropZone');
        
        if (!dropZone) return;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.manejarArchivo(files[0]);
            }
        });
    }

    manejarArchivo(archivo) {
        if (!archivo) return;

        archivoActual = archivo;
        this.mostrarInfoArchivo(archivo);
        
        const reader = new FileReader();
        reader.onload = (e) => this.procesarContenidoArchivo(e.target.result, archivo.type);
        reader.readAsText(archivo);
    }

    mostrarInfoArchivo(archivo) {
        const infoDiv = document.getElementById('fileInfo');
        if (!infoDiv) return;

        infoDiv.innerHTML = `
            <div class="file-details">
                <i class="fas fa-file"></i>
                <div>
                    <strong>${archivo.name}</strong>
                    <p>Tamaño: ${this.formatearTamaño(archivo.size)} | Tipo: ${archivo.type || 'Desconocido'}</p>
                </div>
            </div>
        `;
        infoDiv.style.display = 'block';
    }

    procesarContenidoArchivo(contenido, tipo) {
        try {
            if (tipo.includes('json') || archivoActual.name.endsWith('.json')) {
                datosImportados = JSON.parse(contenido);
            } else if (tipo.includes('csv') || archivoActual.name.endsWith('.csv')) {
                datosImportados = this.parsearCSV(contenido);
            } else {
                // Intentar como texto plano con diferentes delimitadores
                datosImportados = this.parsearTextoPlano(contenido);
            }

            this.mostrarVistaPrevia();
            document.getElementById('processBtn').style.display = 'inline-block';
            
        } catch (error) {
            this.mostrarError('Error al procesar el archivo: ' + error.message);
        }
    }

    parsearCSV(contenido) {
        const lineas = contenido.split('\n').filter(linea => linea.trim());
        if (lineas.length === 0) return [];

        const encabezados = lineas[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const datos = [];

        for (let i = 1; i < lineas.length; i++) {
            const valores = lineas[i].split(',').map(v => v.trim().replace(/"/g, ''));
            const fila = {};
            
            encabezados.forEach((encabezado, index) => {
                fila[encabezado] = valores[index] || '';
            });
            
            datos.push(fila);
        }

        return datos;
    }

    parsearTextoPlano(contenido) {
        const lineas = contenido.split('\n').filter(linea => linea.trim());
        return lineas.map((linea, index) => ({
            linea: index + 1,
            contenido: linea.trim()
        }));
    }

    mostrarVistaPrevia() {
        const preview = document.getElementById('preview');
        if (!preview || !datosImportados.length) return;

        const muestra = datosImportados.slice(0, 5);
        let html = '<h3>Vista previa (primeras 5 filas):</h3>';

        if (Array.isArray(muestra[0]) || typeof muestra[0] === 'object') {
            html += '<div class="table-container"><table>';
            
            // Encabezados
            const keys = Object.keys(muestra[0]);
            html += '<thead><tr>';
            keys.forEach(key => {
                html += `<th>${key}</th>`;
            });
            html += '</tr></thead>';

            // Datos
            html += '<tbody>';
            muestra.forEach(fila => {
                html += '<tr>';
                keys.forEach(key => {
                    html += `<td>${fila[key] || ''}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table></div>';
        } else {
            html += '<div class="text-preview">';
            muestra.forEach(item => {
                html += `<div class="preview-line">${item}</div>`;
            });
            html += '</div>';
        }

        preview.innerHTML = html;
        preview.style.display = 'block';
    }

    procesarDatos() {
        if (!datosImportados.length) {
            this.mostrarError('No hay datos para procesar');
            return;
        }

        // Aplicar filtros y transformaciones
        const datos = this.aplicarFiltros(datosImportados);
        
        this.mostrarResultados(datos);
        document.getElementById('exportBtn').style.display = 'inline-block';
    }

    aplicarFiltros(datos) {
        // Aquí se pueden agregar filtros personalizados
        let datosFiltrados = [...datos];

        // Ejemplo: eliminar filas vacías
        datosFiltrados = datosFiltrados.filter(fila => {
            if (typeof fila === 'object') {
                return Object.values(fila).some(valor => valor && valor.toString().trim());
            }
            return fila && fila.toString().trim();
        });

        return datosFiltrados;
    }

    mostrarResultados(datos) {
        const results = document.getElementById('results');
        if (!results) return;

        const estadisticas = this.calcularEstadisticas(datos);
        
        let html = `
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-number">${estadisticas.total}</span>
                    <span class="stat-label">Filas procesadas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${estadisticas.columnas}</span>
                    <span class="stat-label">Columnas detectadas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${estadisticas.vacias}</span>
                    <span class="stat-label">Filas eliminadas</span>
                </div>
            </div>
        `;

        html += '<h3>Datos procesados:</h3>';
        html += '<div class="processed-data">';
        
        if (datos.length > 0 && typeof datos[0] === 'object') {
            html += this.generarTablaHTML(datos);
        } else {
            html += '<div class="text-data">';
            datos.forEach((item, index) => {
                html += `<div class="data-line">${index + 1}. ${item}</div>`;
            });
            html += '</div>';
        }
        
        html += '</div>';
        
        results.innerHTML = html;
        results.style.display = 'block';
    }

    generarTablaHTML(datos) {
        const muestra = datos.slice(0, 50); // Mostrar máximo 50 filas
        const keys = Object.keys(muestra[0]);
        
        let html = '<div class="table-container"><table class="results-table">';
        
        // Encabezados
        html += '<thead><tr>';
        keys.forEach(key => {
            html += `<th>${key}</th>`;
        });
        html += '</tr></thead>';

        // Datos
        html += '<tbody>';
        muestra.forEach(fila => {
            html += '<tr>';
            keys.forEach(key => {
                const valor = fila[key] || '';
                html += `<td>${valor}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table></div>';

        if (datos.length > 50) {
            html += `<p class="table-note">Mostrando 50 de ${datos.length} filas</p>`;
        }

        return html;
    }

    calcularEstadisticas(datos) {
        const original = datosImportados.length;
        const procesado = datos.length;
        
        let columnas = 1;
        if (datos.length > 0 && typeof datos[0] === 'object') {
            columnas = Object.keys(datos[0]).length;
        }

        return {
            total: procesado,
            columnas: columnas,
            vacias: original - procesado
        };
    }

    exportarDatos() {
        if (!datosImportados.length) {
            this.mostrarError('No hay datos para exportar');
            return;
        }

        const formato = document.getElementById('exportFormat')?.value || 'json';
        let contenido = '';
        let extension = '';

        switch (formato) {
            case 'json':
                contenido = JSON.stringify(datosImportados, null, 2);
                extension = 'json';
                break;
            case 'csv':
                contenido = this.convertirACSV(datosImportados);
                extension = 'csv';
                break;
            default:
                contenido = datosImportados.map(item => 
                    typeof item === 'object' ? JSON.stringify(item) : item
                ).join('\n');
                extension = 'txt';
        }

        this.descargarArchivo(contenido, `datos_procesados.${extension}`);
    }

    convertirACSV(datos) {
        if (!datos.length) return '';

        if (typeof datos[0] === 'object') {
            const keys = Object.keys(datos[0]);
            let csv = keys.join(',') + '\n';
            
            datos.forEach(fila => {
                const valores = keys.map(key => {
                    const valor = fila[key] || '';
                    return `"${valor.toString().replace(/"/g, '""')}"`;
                });
                csv += valores.join(',') + '\n';
            });
            
            return csv;
        } else {
            return datos.join('\n');
        }
    }

    descargarArchivo(contenido, nombreArchivo) {
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = nombreArchivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        this.mostrarMensaje('Archivo descargado correctamente', 'success');
    }

    limpiarTodo() {
        datosImportados = [];
        archivoActual = null;
        
        document.getElementById('fileInput').value = '';
        document.getElementById('fileInfo').style.display = 'none';
        document.getElementById('preview').style.display = 'none';
        document.getElementById('results').style.display = 'none';
        document.getElementById('processBtn').style.display = 'none';
        document.getElementById('exportBtn').style.display = 'none';
        
        this.limpiarMensajes();
    }

    formatearTamaño(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    mostrarError(mensaje) {
        this.mostrarMensaje(mensaje, 'error');
    }

    mostrarMensaje(mensaje, tipo = 'info') {
        const container = document.querySelector('.container');
        const existingMsg = document.querySelector('.message');
        
        if (existingMsg) {
            existingMsg.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${tipo}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${tipo === 'error' ? 'exclamation-circle' : tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${mensaje}
        `;
        
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    limpiarMensajes() {
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ImportadorDatos();
});
