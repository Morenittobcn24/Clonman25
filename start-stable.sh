#!/bin/bash
# Script para iniciar Strapi de forma ultra-estable

export NODE_ENV=production
export STRAPI_ADMIN_AUTO_RELOAD=false
export FAST_REFRESH=false
export WEBPACK_HOT_RELOAD=false
export STRAPI_DISABLE_UPDATE_NOTIFICATION=true

echo "🚀 Iniciando Strapi en modo ULTRA-ESTABLE..."

# Matar procesos previos
pkill -f strapi 2>/dev/null

# Esperar
sleep 2

# Iniciar en background
nohup npm run develop > strapi.log 2>&1 &

# Mostrar PID
echo "🎯 Strapi iniciado con PID: $!"
echo "📊 Log disponible en: strapi.log"
echo "🌐 Admin URL: https://automatic-train-5g4pv6xq6x5p34764-1337.app.github.dev/admin"
echo "📁 CSV Tools: https://automatic-train-5g4pv6xq6x5p34764-1337.app.github.dev/csv-tools-advanced.html"

# Esperar y verificar
sleep 10
if pgrep -f strapi > /dev/null; then
    echo "✅ Strapi funcionando correctamente"
else
    echo "❌ Error al iniciar Strapi"
    cat strapi.log | tail -10
fi