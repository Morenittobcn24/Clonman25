#!/bin/bash

echo "🔧 INICIO DE LIMPIEZA COMPLETA DE STRAPI"

# Detener todos los procesos Strapi
echo "🛑 Deteniendo procesos Strapi..."
pkill -9 -f "strapi"
pkill -9 -f "node"

# Limpiar completamente cache y builds
echo "🧹 Limpiando cache y builds..."
rm -rf .tmp/
rm -rf build/
rm -rf dist/
rm -rf .cache/
rm -rf node_modules/.cache/
rm -rf .vite/

# Limpiar logs
echo "📋 Limpiando logs..."
find . -name "*.log" -delete

echo "✅ LIMPIEZA COMPLETA TERMINADA"
echo "🚀 Ahora puedes iniciar el servidor con: npm run develop"