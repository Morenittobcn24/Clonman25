module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // 1. Generar localizador automático
    const fecha = new Date().toISOString().split("T")[0].replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    data.localizador = `RES-${fecha}-${random}`;

    // 2. Restar cupos automáticamente
    if (data.salida && data.personas) {
      const salidaId = data.salida;
      const personas = data.personas;

      const salida = await strapi.entityService.findOne('api::salida.salida', salidaId, {
        fields: ['cupo_disponible']
      });

      if (salida && salida.cupo_disponible >= personas) {
        await strapi.entityService.update('api::salida.salida', salidaId, {
          data: {
            cupo_disponible: salida.cupo_disponible - personas
          }
        });
      } else {
        throw new Error("No hay suficientes plazas disponibles.");
      }
    }
  }
};
