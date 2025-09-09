'use strict';

const ENUM_DISPONIBLES = new Set([
  'Disponible',
  'Confirmado',
  'Últimas plazas',
  '¡Corre pocas plazas disponibles!',
]);
const ENUM_CERRADAS = new Set(['Completo', 'Cancelado', 'Cerrado', 'Privado']);

const toDMY = (iso) => {
  if (!iso) return 'sin fecha';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const J = (v, max = 400) => {
  let s; try { s = typeof v === 'string' ? v : JSON.stringify(v); } catch { s = String(v); }
  return s.length > max ? s.slice(0, max) + '…' : s;
};

// ——— lectura completa desde BD (ahora pidiendo Precio_pax)
async function getPersistedForCalc(id, locale) {
  if (!id) return { nombre: null, salidas: [] };
  const full = await strapi.entityService.findOne('api::viaje.viaje', id, {
    populate: { Salidas: { fields: ['Fecha_inicio', 'Cupo_disponible', 'Estado', 'Precio_pax'] } },
    fields: ['Nombre'],
    locale: locale || undefined,
  });
  strapi.log.info(`[viaje:load] DB id=${id} salidas=${full?.Salidas?.length || 0} nombre="${full?.Nombre || ''}"`);
  return { nombre: full?.Nombre ?? null, salidas: full?.Salidas ?? [] };
}

// ——— mapeo robusto de una salida (acepta variantes del admin)
// BACKCOMPAT: intenta Precio_pax y, si no existe, cae a Precio
function mapSalida(raw, idx) {
  const s = raw && typeof raw === 'object' ? raw : {};
  const a = s.attributes || s.value || s; // soporta {attributes:{...}} o {value:{...}} o plano

  const get = (k) =>
    a?.[k] ??
    a?.[k?.toLowerCase?.()] ??
    a?.[k.replace(/_/g, '')] ??
    null;

  const Fecha_inicio = get('Fecha_inicio');
  const Cupo_disponible = get('Cupo_disponible');
  const Estado = get('Estado');

  // lee Precio_pax; si no, Precio (para entradas antiguas)
  const Precio_raw = get('Precio_pax') ?? get('Precio');

  const mapped = {
    Fecha_inicio: Fecha_inicio || null,
    Cupo_disponible: Cupo_disponible != null ? Number(Cupo_disponible) : null,
    Estado: Estado || null,
    // internamente seguimos usando la clave Precio para todos los cálculos
    Precio: Precio_raw != null ? Number(Precio_raw) : null,
  };

  strapi.log.info(`[viaje:mapSalida] #${idx} in=${J(s)} -> ${J(mapped)}`);
  return mapped;
}

// ——— calculadora de índices (EXTENDIDA con índices de fechas)
function calcularIndices(nombre, salidasRaw) {
  const nombreViaje = nombre || 'Sin nombre';
  const salidas = Array.isArray(salidasRaw) ? salidasRaw.map(mapSalida) : [];

  const anyDisp = salidas.some(
    (s) => ENUM_DISPONIBLES.has(String(s.Estado || '')) && Number(s.Cupo_disponible) > 0
  );
  const allCancelado = salidas.length > 0 && salidas.every((s) => String(s.Estado || '') === 'Cancelado');
  const allNoDisp = salidas.length > 0 && salidas.every((s) => {
    const estado = String(s.Estado || '');
    const cupo = s.Cupo_disponible;
    if (cupo == null && !ENUM_CERRADAS.has(estado)) return false;
    return ENUM_CERRADAS.has(estado) || Number(cupo) <= 0;
  });

  const Estado_viaje =
    salidas.length === 0
      ? 'Sin salidas'
      : anyDisp ? 'Disponible' : (allCancelado ? 'Cancelado' : (allNoDisp ? 'Agotado' : 'Mixto'));

  const Cupo_disponible_total = salidas.reduce((acc, s) => acc + (Number(s.Cupo_disponible) || 0), 0);

  const fechasISO = salidas
    .map((s) => (s.Fecha_inicio ? String(s.Fecha_inicio).slice(0, 10) : null))
    .filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d));

  const fechasOrdenadas = [...new Set(fechasISO)].sort(); // únicas ASC
  const hoyISO = new Date().toISOString().slice(0, 10);
  const futuras = fechasOrdenadas.filter((d) => d >= hoyISO);

  const Proxima_salida = futuras[0] || (fechasOrdenadas[0] ?? null);
  const Primer_salida = fechasOrdenadas[0] ?? null;
  const Ultima_salida = fechasOrdenadas.length ? fechasOrdenadas[fechasOrdenadas.length - 1] : null;

  const mesesOrdenados = [...new Set(fechasOrdenadas.map((d) => d.slice(0, 7)))].sort();

  // precios: ahora ya vienen de mapped.Precio (que proviene de Precio_pax o Precio)
  const precios = salidas.map((s) => s.Precio).filter((v) => Number.isFinite(v) && v >= 0);
  const Precio_minimo = precios.length ? Math.min(...precios) : null;

  const Resumen_salidas = salidas.length
    ? [...salidas]
        .sort((a, b) => {
          const da = a?.Fecha_inicio ? new Date(a.Fecha_inicio).getTime() : Infinity;
          const db = b?.Fecha_inicio ? new Date(b.Fecha_inicio).getTime() : Infinity;
          return da - db;
        })
        .map((s, i) =>
          `#${i + 1} Viaje: ${nombreViaje} | Estado: ${Estado_viaje} | Salida: ${toDMY(s.Fecha_inicio)} | Cupos disponibles: ${s.Cupo_disponible ?? '-'}`
        )
        .join('\n')
    : `Viaje: ${nombreViaje} | Estado: ${Estado_viaje} | Sin salidas`;

  const Fechas_salida_index = fechasOrdenadas;
  const Fechas_salida_index_text = fechasOrdenadas.join('|');
  const Meses_salida_index = mesesOrdenados.join('|');

  const idx = {
    Estado_viaje,
    Cupo_disponible_total,
    Proxima_salida,
    Precio_minimo,
    Resumen_salidas,
    Viaje_nombre_index: nombreViaje,

    Primer_salida,
    Ultima_salida,
    Fechas_salida_index,
    Fechas_salida_index_text,
    Meses_salida_index,
  };

  strapi.log.info(`[viaje:calc] RESULT ${J(idx, 800)}`);
  return { idx, salidas: salidas }; // devolvemos ya mapeadas
}

function todasVacias(salidasMap) {
  if (!Array.isArray(salidasMap) || salidasMap.length === 0) return true;
  return salidasMap.every(s =>
    (s.Fecha_inicio == null || s.Fecha_inicio === '') &&
    (s.Cupo_disponible == null || Number.isNaN(Number(s.Cupo_disponible))) &&
    (s.Precio == null || Number.isNaN(Number(s.Precio))) &&
    (s.Estado == null || s.Estado === '')
  );
}

module.exports = {
  async beforeCreate(event) {
    try {
      const data = event.params.data || {};
      const nombre = data.Nombre ?? null;
      const salidasRaw = Array.isArray(data.Salidas) ? data.Salidas : [];

      strapi.log.info(`[viaje:beforeCreate] payload Salidas.len=${salidasRaw.length} nombre="${nombre}"`);
      const { idx, salidas } = calcularIndices(nombre, salidasRaw);

      if (todasVacias(salidas)) {
        strapi.log.info(`[viaje:beforeCreate] Todas las salidas del payload vienen vacías -> mantengo idx pero revisa el formulario/admin.`);
      }

      Object.assign(data, idx);
      strapi.log.info(`[viaje:beforeCreate] asignado idx OK`);
    } catch (e) {
      strapi.log.error(`[viaje:beforeCreate] ERROR ${e?.stack || e?.message}`);
    }
  },

  async beforeUpdate(event) {
    try {
      const data = event.params.data || {};
      const id = event.params?.where?.id;
      const locale = data?.locale || undefined;

      const payloadSalidas = Array.isArray(data.Salidas) ? data.Salidas : [];
      const nombrePayload = data.Nombre ?? null;

      strapi.log.info(`[viaje:beforeUpdate] id=${id} locale=${locale || '(default)'} payload.Salidas.len=${payloadSalidas.length} nombrePayload="${nombrePayload || ''}"`);

      let nombre = nombrePayload;
      let salidasParaCalc = payloadSalidas;

      // 1) Intentamos con lo que viene en payload
      let prelim = calcularIndices(nombre, salidasParaCalc);

      // 2) Si TODAS las salidas del payload están vacías, releemos desde BD (ya pidiendo Precio_pax)
      if (todasVacias(prelim.salidas)) {
        strapi.log.info(`[viaje:beforeUpdate] Payload trae salidas vacías -> releyendo desde BD para completar…`);
        const current = await getPersistedForCalc(id, locale);
        nombre = nombre || current.nombre;
        salidasParaCalc = current.salidas;

        prelim = calcularIndices(nombre, salidasParaCalc);
      }

      Object.assign(data, prelim.idx);
      strapi.log.info(`[viaje:beforeUpdate] asignado idx OK`);
    } catch (e) {
      strapi.log.error(`[viaje:beforeUpdate] ERROR ${e?.stack || e?.message}`);
    }
  },
};