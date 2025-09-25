import React, { useState } from 'react';
import {
  Box,
  Button,
  ContentLayout,
  Flex,
  HeaderLayout,
  Main,
  Select,
  Option,
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardContent,
  Alert,
  Field,
  FieldLabel,
  FieldInput,
  Grid,
  GridItem,
} from '@strapi/design-system';
import { Download, Upload, Information } from '@strapi/icons';
import { useNotification } from '@strapi/helper-plugin';

const HomePage = () => {
  const [selectedEntity, setSelectedEntity] = useState('viaje');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [exportResult, setExportResult] = useState(null);
  const [importResult, setImportResult] = useState(null);
  
  const toggleNotification = useNotification();

  const entities = [
    { value: 'viaje', label: 'Viajes' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'reserva', label: 'Reservas' },
    { value: 'proveedor', label: 'Proveedores' },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);
    
    try {
      const response = await fetch(`/api/csv-actions/export?entity=${selectedEntity}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedEntity}_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setExportResult({
        success: true,
        message: `Exportación de ${selectedEntity} completada exitosamente`,
        size: blob.size
      });
      
      toggleNotification({
        type: 'success',
        message: `✅ ${selectedEntity} exportado correctamente (${Math.round(blob.size / 1024)} KB)`,
      });
      
    } catch (error) {
      console.error('Error en exportación:', error);
      setExportResult({
        success: false,
        message: `Error en exportación: ${error.message}`
      });
      
      toggleNotification({
        type: 'warning',
        message: `❌ Error exportando ${selectedEntity}: ${error.message}`,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setImportResult(null);
    } else {
      toggleNotification({
        type: 'warning',
        message: 'Por favor selecciona un archivo CSV válido',
      });
    }
  };

  const handleImport = async () => {
    if (!csvFile) {
      toggleNotification({
        type: 'warning',
        message: 'Por favor selecciona un archivo CSV',
      });
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      formData.append('entity', selectedEntity);

      const response = await fetch('/api/csv-actions/import', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error HTTP ${response.status}`);
      }

      setImportResult({
        success: true,
        message: `Importación completada: ${result.created} registros creados`,
        created: result.created,
        errors: result.errors || []
      });

      toggleNotification({
        type: 'success',
        message: `✅ Importación completada: ${result.created} registros de ${selectedEntity}`,
      });

      setCsvFile(null);
      document.getElementById('csv-file-input').value = '';

    } catch (error) {
      console.error('Error en importación:', error);
      setImportResult({
        success: false,
        message: `Error en importación: ${error.message}`
      });

      toggleNotification({
        type: 'warning',
        message: `❌ Error importando ${selectedEntity}: ${error.message}`,
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Main>
      <HeaderLayout
        title="Acciones CSV"
        subtitle="Exportar e importar datos en formato CSV"
        as="h1"
      />
      <ContentLayout>
        <Box padding={8}>
          <Grid gap={6}>
            {/* Selección de Entidad */}
            <GridItem col={12}>
              <Card>
                <CardHeader>
                  <Typography variant="beta">Seleccionar Tipo de Datos</Typography>
                </CardHeader>
                <CardBody>
                  <Field name="entity">
                    <FieldLabel>Entidad a procesar</FieldLabel>
                    <Select
                      value={selectedEntity}
                      onChange={setSelectedEntity}
                      placeholder="Selecciona una entidad"
                    >
                      {entities.map((entity) => (
                        <Option key={entity.value} value={entity.value}>
                          {entity.label}
                        </Option>
                      ))}
                    </Select>
                  </Field>
                </CardBody>
              </Card>
            </GridItem>

            {/* Exportación */}
            <GridItem col={6}>
              <Card>
                <CardHeader>
                  <Flex>
                    <Download />
                    <Box paddingLeft={2}>
                      <Typography variant="beta">Exportar Datos</Typography>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <CardContent>
                    <Typography variant="omega" textColor="neutral600">
                      Descargar todos los registros de {entities.find(e => e.value === selectedEntity)?.label} en formato CSV
                    </Typography>
                  </CardContent>
                  <Box paddingTop={4}>
                    <Button
                      onClick={handleExport}
                      loading={isExporting}
                      disabled={isExporting}
                      startIcon={<Download />}
                      variant="secondary"
                      fullWidth
                    >
                      {isExporting ? 'Exportando...' : `Exportar ${entities.find(e => e.value === selectedEntity)?.label}`}
                    </Button>
                  </Box>
                  
                  {exportResult && (
                    <Box paddingTop={4}>
                      <Alert
                        variant={exportResult.success ? 'success' : 'danger'}
                        title={exportResult.success ? 'Exportación exitosa' : 'Error en exportación'}
                      >
                        {exportResult.message}
                        {exportResult.success && exportResult.size && (
                          <Typography variant="pi" textColor="neutral600">
                            <br />Tamaño del archivo: {Math.round(exportResult.size / 1024)} KB
                          </Typography>
                        )}
                      </Alert>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </GridItem>

            {/* Importación */}
            <GridItem col={6}>
              <Card>
                <CardHeader>
                  <Flex>
                    <Upload />
                    <Box paddingLeft={2}>
                      <Typography variant="beta">Importar Datos</Typography>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <CardContent>
                    <Typography variant="omega" textColor="neutral600">
                      Subir archivo CSV para importar {entities.find(e => e.value === selectedEntity)?.label}
                    </Typography>
                  </CardContent>
                  
                  <Box paddingTop={4}>
                    <Field name="csvFile">
                      <FieldLabel>Archivo CSV</FieldLabel>
                      <FieldInput
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        id="csv-file-input"
                      />
                    </Field>
                  </Box>

                  <Box paddingTop={4}>
                    <Button
                      onClick={handleImport}
                      loading={isImporting}
                      disabled={isImporting || !csvFile}
                      startIcon={<Upload />}
                      variant="secondary"
                      fullWidth
                    >
                      {isImporting ? 'Importando...' : `Importar ${entities.find(e => e.value === selectedEntity)?.label}`}
                    </Button>
                  </Box>

                  {importResult && (
                    <Box paddingTop={4}>
                      <Alert
                        variant={importResult.success ? 'success' : 'danger'}
                        title={importResult.success ? 'Importación exitosa' : 'Error en importación'}
                      >
                        {importResult.message}
                        {importResult.success && importResult.created > 0 && (
                          <Typography variant="pi" textColor="neutral600">
                            <br />Registros creados: {importResult.created}
                          </Typography>
                        )}
                        {importResult.errors && importResult.errors.length > 0 && (
                          <Box paddingTop={2}>
                            <Typography variant="pi" textColor="danger600">
                              Errores encontrados: {importResult.errors.length}
                            </Typography>
                          </Box>
                        )}
                      </Alert>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </GridItem>

            {/* Información */}
            <GridItem col={12}>
              <Card>
                <CardHeader>
                  <Flex>
                    <Information />
                    <Box paddingLeft={2}>
                      <Typography variant="beta">Información Importante</Typography>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <CardContent>
                    <Typography variant="omega" textColor="neutral600">
                      • <strong>Formato de fechas:</strong> Usa DD/MM/YYYY para fechas en español<br />
                      • <strong>Campos requeridos:</strong> Verifica que tu CSV incluya todos los campos obligatorios<br />
                      • <strong>Codificación:</strong> Asegúrate de que tu archivo CSV esté en codificación UTF-8<br />
                      • <strong>Separador:</strong> Utiliza coma (,) como separador de campos
                    </Typography>
                  </CardContent>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default HomePage;