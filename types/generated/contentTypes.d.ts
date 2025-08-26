import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiActividadActividad extends Struct.CollectionTypeSchema {
  collectionName: 'actividades';
  info: {
    displayName: 'Actividad';
    pluralName: 'actividades';
    singularName: 'actividad';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descripcion: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Duracion: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::actividad.actividad'
    >;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    reservas: Schema.Attribute.Relation<'manyToMany', 'api::reserva.reserva'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viajes: Schema.Attribute.Relation<'manyToMany', 'api::viaje.viaje'>;
  };
}

export interface ApiAlojamientoAlojamiento extends Struct.CollectionTypeSchema {
  collectionName: 'alojamientos';
  info: {
    displayName: 'Alojamiento';
    pluralName: 'alojamientos';
    singularName: 'alojamiento';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descripcion: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Extra_hab_individual: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Extra_noche: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Imagen: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::alojamiento.alojamiento'
    >;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    reserva: Schema.Attribute.Relation<'oneToOne', 'api::reserva.reserva'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viajes: Schema.Attribute.Relation<'manyToMany', 'api::viaje.viaje'>;
  };
}

export interface ApiClienteCliente extends Struct.CollectionTypeSchema {
  collectionName: 'clientes';
  info: {
    displayName: 'Cliente';
    pluralName: 'clientes';
    singularName: 'cliente';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Ciudad: Schema.Attribute.String;
    Creado_por_web: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    Idioma: Schema.Attribute.Enumeration<['Espa\u00F1ol', 'Ingles', 'Frances']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::cliente.cliente'
    > &
      Schema.Attribute.Private;
    Nombre: Schema.Attribute.String & Schema.Attribute.Required;
    Notas: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    Telefono: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDescuentoDescuento extends Struct.CollectionTypeSchema {
  collectionName: 'descuentos';
  info: {
    displayName: 'Descuento';
    pluralName: 'descuentos';
    singularName: 'descuento';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descuento_por_personas: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Descuento_reserva_anticipada: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::descuento.descuento'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viajes: Schema.Attribute.Relation<'manyToMany', 'api::viaje.viaje'>;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    description: 'Define global settings';
    displayName: 'Global';
    pluralName: 'globals';
    singularName: 'global';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProveedorProveedor extends Struct.CollectionTypeSchema {
  collectionName: 'proveedors';
  info: {
    description: '';
    displayName: 'Proveedor';
    pluralName: 'proveedors';
    singularName: 'proveedor';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Bloqueos: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Condiciones: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Correo_contacto: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Email: Schema.Attribute.Email &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Fechas_asignadas: Schema.Attribute.Component<
      'reservas.fecha-asignada',
      true
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Forma_conexion: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Forma_pago: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::proveedor.proveedor'
    >;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Pais: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Persona_contacto: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    Rating_interno: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Telefono: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Telefono_contacto: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Web: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ApiReservaReserva extends Struct.CollectionTypeSchema {
  collectionName: 'reservas';
  info: {
    description: '';
    displayName: 'Reserva';
    pluralName: 'reservas';
    singularName: 'reserva';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Actividades: Schema.Attribute.Relation<
      'manyToMany',
      'api::actividad.actividad'
    >;
    Alojamiento: Schema.Attribute.Relation<
      'oneToOne',
      'api::alojamiento.alojamiento'
    >;
    Billetes: Schema.Attribute.Boolean;
    Canal: Schema.Attribute.Enumeration<
      ['Web', 'Interno', 'Agencia', 'Whatsapp']
    >;
    cliente: Schema.Attribute.Relation<'oneToOne', 'api::cliente.cliente'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Estado: Schema.Attribute.Enumeration<
      ['Pendiente', 'Confirmada', 'Cancelada']
    >;
    Fecha_reserva: Schema.Attribute.Date & Schema.Attribute.Required;
    Forma_pago: Schema.Attribute.Enumeration<
      ['Online', 'Transferencia', 'Manual']
    >;
    Integrantes: Schema.Attribute.Component<'reservas.integrante-grupo', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    Localizador: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::reserva.reserva'
    > &
      Schema.Attribute.Private;
    Notas_internas: Schema.Attribute.String;
    Personas: Schema.Attribute.Integer;
    Precio_total: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    Reserva_pagada: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    Salida: Schema.Attribute.Component<'viajes.salida', false>;
    Seguro: Schema.Attribute.Relation<'manyToMany', 'api::seguro.seguro'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Viaje: Schema.Attribute.Relation<'oneToOne', 'api::viaje.viaje'>;
  };
}

export interface ApiSeguroSeguro extends Struct.CollectionTypeSchema {
  collectionName: 'seguros';
  info: {
    displayName: 'Seguro';
    pluralName: 'seguros';
    singularName: 'seguro';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Cobertura: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descripcion: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::seguro.seguro'>;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    reservas: Schema.Attribute.Relation<'manyToMany', 'api::reserva.reserva'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viajes: Schema.Attribute.Relation<'manyToMany', 'api::viaje.viaje'>;
  };
}

export interface ApiTransferTransfer extends Struct.CollectionTypeSchema {
  collectionName: 'transfers';
  info: {
    displayName: 'Transfer';
    pluralName: 'transfers';
    singularName: 'transfer';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descripcion: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transfer.transfer'
    >;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    Tipo: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viajes: Schema.Attribute.Relation<'manyToMany', 'api::viaje.viaje'>;
  };
}

export interface ApiViajeViaje extends Struct.CollectionTypeSchema {
  collectionName: 'viajes';
  info: {
    description: '';
    displayName: 'Viaje';
    pluralName: 'viajes';
    singularName: 'viaje';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Actividades: Schema.Attribute.Relation<
      'manyToMany',
      'api::actividad.actividad'
    >;
    Actividades_opcionales: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Alojamiento: Schema.Attribute.Relation<
      'manyToMany',
      'api::alojamiento.alojamiento'
    >;
    Alojamiento_comidas: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Categoria_Unica: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Continente: Schema.Attribute.Enumeration<
      [
        '\u00C1frica',
        'Am\u00E9rica',
        'Asia',
        'Europa',
        'Ocean\u00EDa',
        'Ant\u00E1rtida',
        'Am\u00E9rica del Sur',
        'Centro Am\u00E9rica',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Cordillera: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descripcion_corta: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Descripcion_larga: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Descuento: Schema.Attribute.Relation<
      'manyToMany',
      'api::descuento.descuento'
    >;
    Diferente: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Duracion_total: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Estilo_alojamiento: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Estilo_viaje: Schema.Attribute.Enumeration<
      ['Explorer', 'Confort', 'Luxury', 'Mix']
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Estilo_viaje_explicacion: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Etiqueta_Unica: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Fechas_explicacion: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Forma_viajar: Schema.Attribute.Enumeration<
      ['En Grupo', 'A medida', 'Privado', 'Autoguiado', 'Familia']
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Foto_portada: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Galeria: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Grupo_maximo: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Grupo_minimo: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Guia: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Icono_viaje: Schema.Attribute.Enumeration<
      [
        'Top Ventas',
        'Viaje del Mes',
        'Destino Nuevo',
        'Oferta Flash',
        'Promo dto.',
        'Nada',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Imagen_google: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Info_adicional: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Itinerario: Schema.Attribute.Component<'viajes.itinerario', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::viaje.viaje'>;
    Mapa: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Material_recomendado: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Nivel_dificultad: Schema.Attribute.Enumeration<
      ['F\u00E1cil', 'Medio', 'Experto']
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Nivel_explicacion: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Nombre: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Pais: Schema.Attribute.Enumeration<
      [
        'Francia-Suiza-Italia',
        'Suiza-Italia',
        'Francia-Reuni\u00F3n',
        'Francia-Suiza',
        'Afganist\u00E1n',
        'Albania',
        'Alemania',
        'Andorra',
        'Angola',
        'Antigua y Barbuda',
        'Arabia Saudita',
        'Argelia',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaiy\u00E1n',
        'Bahamas',
        'Banglad\u00E9s',
        'Barbados',
        'Bar\u00E9in',
        'B\u00E9lgica',
        'Belice',
        'Ben\u00EDn',
        'Bielorrusia',
        'Birmania (Myanmar)',
        'Bolivia',
        'Bosnia y Herzegovina',
        'Botsuana',
        'Brasil',
        'Brun\u00E9i',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'But\u00E1n',
        'Cabo Verde',
        'Camboya',
        'Camer\u00FAn',
        'Canad\u00E1',
        'Catar',
        'Chad',
        'Chile',
        'China',
        'Chipre',
        'Colombia',
        'Comoras',
        'Corea del Norte',
        'Corea del Sur',
        'Costa de Marfil',
        'Costa Rica',
        'Croacia',
        'Cuba',
        'Dinamarca',
        'Dominica',
        'Ecuador',
        'Egipto',
        'El Salvador',
        'Emiratos \u00C1rabes Unidos',
        'Eritrea',
        'Eslovaquia',
        'Eslovenia',
        'Espa\u00F1a',
        'Estados Unidos',
        'Estonia',
        'Etiop\u00EDa',
        'Fiyi',
        'Filipinas',
        'Finlandia',
        'Francia',
        'Gab\u00F3n',
        'Gambia',
        'Georgia',
        'Ghana',
        'Granada',
        'Grecia',
        'Guatemala',
        'Guinea',
        'Guinea-Bis\u00E1u',
        'Guinea Ecuatorial',
        'Guyana',
        'Hait\u00ED',
        'Honduras',
        'Hungr\u00EDa',
        'India',
        'Indonesia',
        'Irak',
        'Ir\u00E1n',
        'Irlanda',
        'Islandia',
        'Islas Marshall',
        'Islas Salom\u00F3n',
        'Israel',
        'Italia',
        'Jamaica',
        'Jap\u00F3n',
        'Jordania',
        'Kazajist\u00E1n',
        'Kenia',
        'Kirguist\u00E1n',
        'Kiribati',
        'Kuwait',
        'Laos',
        'Lesoto',
        'Letonia',
        'L\u00EDbano',
        'Liberia',
        'Libia',
        'Liechtenstein',
        'Lituania',
        'Luxemburgo',
        'Macedonia del Norte',
        'Madagascar',
        'Malasia',
        'Malaui',
        'Maldivas',
        'Mal\u00ED',
        'Malta',
        'Marruecos',
        'Mauricio',
        'Mauritania',
        'M\u00E9xico',
        'Micronesia',
        'Moldavia',
        'M\u00F3naco',
        'Mongolia',
        'Montenegro',
        'Mozambique',
        'Namibia',
        'Nauru',
        'Nepal',
        'Nicaragua',
        'N\u00EDger',
        'Nigeria',
        'Noruega',
        'Nueva Zelanda',
        'Om\u00E1n',
        'Pa\u00EDses Bajos',
        'Pakist\u00E1n',
        'Palaos',
        'Panam\u00E1',
        'Pap\u00FAa Nueva Guinea',
        'Paraguay',
        'Per\u00FA',
        'Polonia',
        'Portugal',
        'Reino Unido',
        'Rep\u00FAblica Centroafricana',
        'Rep\u00FAblica Checa',
        'Rep\u00FAblica del Congo',
        'Rep\u00FAblica Democr\u00E1tica del Congo',
        'Rep\u00FAblica Dominicana',
        'Ruanda',
        'Ruman\u00EDa',
        'Rusia',
        'Samoa',
        'San Crist\u00F3bal y Nieves',
        'San Marino',
        'San Vicente y las Granadinas',
        'Santa Luc\u00EDa',
        'Santo Tom\u00E9 y Pr\u00EDncipe',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leona',
        'Singapur',
        'Siria',
        'Somalia',
        'Sri Lanka',
        'Suazilandia (Eswatini)',
        'Sud\u00E1frica',
        'Sud\u00E1n',
        'Sud\u00E1n del Sur',
        'Suecia',
        'Suiza',
        'Surinam',
        'Tailandia',
        'Tanzania',
        'Tayikist\u00E1n',
        'Timor Oriental',
        'Togo',
        'Tonga',
        'Trinidad y Tobago',
        'T\u00FAnez',
        'Turkmenist\u00E1n',
        'Turqu\u00EDa',
        'Tuvalu',
        'Ucrania',
        'Uganda',
        'Uruguay',
        'Uzbekist\u00E1n',
        'Vanuatu',
        'Vaticano',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Yibuti',
        'Zambia',
        'Zimbabue',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    PDF: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio_adulto_extra: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio_base: Schema.Attribute.BigInteger &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Precio_nino_extra: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Preguntas: Schema.Attribute.Component<'viajes.preguntas', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Schema.Attribute.DateTime;
    Regimen_alojamiento: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Regimen_explicacion: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Salidas: Schema.Attribute.Component<'viajes.salida', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Seguros: Schema.Attribute.Relation<'manyToMany', 'api::seguro.seguro'>;
    Servicios_incluidos: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Servicios_no_incluidos: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Slogan: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Slug: Schema.Attribute.UID<'Nombre'>;
    Staff: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Temporada: Schema.Attribute.Enumeration<
      [
        'Invierno',
        'Verano',
        'Primavera',
        'Oto\u00F1o',
        'Semana Santa',
        'Navidad',
        'Verano y Primavera',
        'Invierno y Oto\u00F1o',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Tipo_de_viaje: Schema.Attribute.Enumeration<
      [
        'Trekking',
        'Nature',
        'Esqu\u00ED',
        'Bici',
        'Wellness',
        'Aventura',
        'Alpinismo',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Transfer: Schema.Attribute.Relation<'manyToMany', 'api::transfer.transfer'>;
    Transfer_seleccionable: Schema.Attribute.Enumeration<
      ['Bus', 'Tren', 'Furgoneta o Taxi Privado']
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Transfer_texto: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Transporte: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    Transporte_explicacion: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::actividad.actividad': ApiActividadActividad;
      'api::alojamiento.alojamiento': ApiAlojamientoAlojamiento;
      'api::cliente.cliente': ApiClienteCliente;
      'api::descuento.descuento': ApiDescuentoDescuento;
      'api::global.global': ApiGlobalGlobal;
      'api::proveedor.proveedor': ApiProveedorProveedor;
      'api::reserva.reserva': ApiReservaReserva;
      'api::seguro.seguro': ApiSeguroSeguro;
      'api::transfer.transfer': ApiTransferTransfer;
      'api::viaje.viaje': ApiViajeViaje;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
