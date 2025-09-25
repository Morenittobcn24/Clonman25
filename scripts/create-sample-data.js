const strapi = require('@strapi/strapi')();

async function createSampleData() {
  await strapi.load();

  try {
    // Crear proveedor de ejemplo
    const proveedor = await strapi.entityService.create('api::proveedor.proveedor', {
      data: {
        nombre: 'Aventuras Montaña',
        email: 'info@aventuras.com',
        telefono: '912345678',
        direccion: 'Madrid, España'
      }
    });

    // Crear viajes de ejemplo
    const viajes = [
      {
        nombre: 'Camino de Santiago',
        destino: 'Santiago de Compostela',
        precio: 850,
        fechaInicio: '2024-05-15',
        fechaFin: '2024-05-25',
        descripcion: 'Camino francés completo',
        proveedor: proveedor.id
      },
      {
        nombre: 'Picos de Europa',
        destino: 'Asturias',
        precio: 650,
        fechaInicio: '2024-06-10',
        fechaFin: '2024-06-15',
        descripcion: 'Trekking en los Picos de Europa',
        proveedor: proveedor.id
      }
    ];

    for (const viajeData of viajes) {
      await strapi.entityService.create('api::viaje.viaje', {
        data: viajeData
      });
    }

    // Crear clientes de ejemplo
    const clientes = [
      {
        nombre: 'María',
        apellidos: 'García López',
        email: 'maria@email.com',
        telefono: '666123456'
      },
      {
        nombre: 'Juan',
        apellidos: 'Pérez Martín',
        email: 'juan@email.com',
        telefono: '677987654'
      }
    ];

    for (const clienteData of clientes) {
      await strapi.entityService.create('api::cliente.cliente', {
        data: clienteData
      });
    }

    console.log('✅ Datos de ejemplo creados');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await strapi.destroy();
}

createSampleData();
