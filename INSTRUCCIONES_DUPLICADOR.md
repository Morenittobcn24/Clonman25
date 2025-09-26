# 🔥 INSTRUCCIONES PARA PROBAR EL DUPLICADOR DE SALIDAS

## Estado del Sistema
- ✅ Servidor Strapi funcionando en http://localhost:1337
- ✅ Duplicador mejorado implementado en `/src/admin/app.js`
- ✅ Detección automática activada cada 2 segundos

---

## 🚀 PASOS PARA PROBAR EL DUPLICADOR:

### 1. Acceder al Admin Panel
- Abrir: http://localhost:1337/admin
- Hacer login si es necesario

### 2. Navegar a un Viaje
- Ir a "Content Manager" → "Collection Types" → "Viaje"
- Abrir cualquier viaje existente para editarlo

### 3. Buscar la Sección de Salidas
- Buscar el campo "Salidas" en el formulario
- Este debería ser un componente repetible

### 4. Verificar Detección Automática
- **Abrir las herramientas de desarrollador (F12)**
- **Ir a la pestaña Console**
- Deberías ver mensajes como:
  ```
  🔥 DUPLICADOR DE SALIDAS ACTIVADO
  🔍 Debug: X botones totales, Y botones de salida configurados
  ```

### 5. Identificar Botones Interceptados
- Los botones "Add entry" de salidas deberían aparecer en **color naranja/rojo** (#ff6b35)
- Esto indica que el duplicador los ha detectado

### 6. Probar la Duplicación
1. **Llenar los datos de una salida** (fecha, precio, cupo, etc.)
2. **Hacer clic en "Add entry"** para agregar una nueva salida vacía
3. **En la consola deberías ver:**
   ```
   🚀 ¡CLIC EN BOTÓN DE SALIDA DETECTADO!
   🔄 INICIANDO DUPLICACIÓN MEJORADA DE SALIDA...
   🔍 Estrategia X - Por field-name salidas: Y
   ✅ COPIADO date: "valor" → "valor"
   🎉 DUPLICACIÓN EXITOSA: X campos copiados
   ```
4. **Debería aparecer una notificación** en la esquina superior derecha

### 7. Verificar Resultado
- La nueva salida vacía debería llenarse automáticamente con los datos de la salida anterior
- Los campos copiados incluyen: fechas, precios, cupos, estados, etc.

---

## 🔍 DEBUGGING - Si No Funciona:

### Verificar en Console:
1. ¿Se muestra "🔥 DUPLICADOR DE SALIDAS ACTIVADO"?
2. ¿Hay botones detectados? ("X botones de salida configurados")
3. ¿Los botones "Add entry" están en naranja/rojo?
4. ¿Se ejecuta la función cuando haces clic?

### Posibles Problemas:
- **No se detectan botones**: El selector puede haber cambiado en Strapi v5
- **No se encuentran salidas**: Los selectores de contenedores necesitan ajuste
- **No se copian datos**: Los eventos de React pueden requerir enfoques diferentes

### Información de Debug:
- El duplicador usa 4 estrategias de detección diferentes
- Se ejecuta automáticamente cada 2 segundos
- Compatible con la estructura de Strapi 5.15.1

---

## 📋 RESULTADOS ESPERADOS:

✅ **Funcionamiento Correcto:**
- Botones "Add entry" de salidas en color naranja
- Logs detallados en consola
- Copia automática de datos
- Notificación visual de confirmación
- Campos llenos en la nueva salida

❌ **Si No Funciona:**
- Revisar consola para errores
- Verificar estructura HTML de Strapi
- Ajustar selectores si es necesario

---

## 💡 TIPS:

1. **Siempre tener la consola abierta** para ver los logs
2. **Probar con al menos 2 salidas** (una con datos, una vacía)
3. **Los cambios se aplican inmediatamente** (hot reload activado)
4. **Si no funciona**, refrescar la página y volver a intentar

¡El duplicador está diseñado para funcionar automáticamente sin intervención manual!