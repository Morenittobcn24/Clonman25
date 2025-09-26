const { createStrapi } = require('@strapi/strapi');

async function createAdminUser() {
  const strapi = await createStrapi().load();
  
  try {
    // Verificar si ya existe un admin
    const adminUser = await strapi.query('admin::user').findOne({});
    
    if (adminUser) {
      console.log('❌ Ya existe un usuario administrador');
      process.exit(0);
    }

    // Crear el primer usuario administrador
    const adminRole = await strapi.query('admin::role').findOne({
      where: { code: 'strapi-super-admin' }
    });

    if (!adminRole) {
      console.log('❌ No se encontró el rol de super admin');
      process.exit(1);
    }

    const newAdmin = await strapi.query('admin::user').create({
      data: {
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@strapi.local',
        password: await strapi.service('admin::auth').hashPassword('Admin123!'),
        isActive: true,
        roles: [adminRole.id],
        registrationToken: null,
      }
    });

    console.log('✅ Usuario administrador creado exitosamente');
    console.log('📧 Email: admin@strapi.local');
    console.log('🔑 Password: Admin123!');
    
  } catch (error) {
    console.error('❌ Error al crear usuario admin:', error);
  } finally {
    await strapi.destroy();
    process.exit(0);
  }
}

createAdminUser();