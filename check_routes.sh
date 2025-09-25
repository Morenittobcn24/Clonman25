#!/bin/bash

# Script para verificar las rutas disponibles en la API

echo "Comprobando la ruta de exportación CSV..."
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:1337/api/csv-export

echo "Comprobando la ruta de importación CSV..."
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:1337/api/csv-import

echo "Listando todas las rutas disponibles..."
curl -s http://localhost:1337/_health | grep -i routes || echo "No se pudo obtener información sobre las rutas"