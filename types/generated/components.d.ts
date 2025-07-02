import type { Attribute, Schema } from '@strapi/strapi';

export interface ReservasFechaAsignada extends Schema.Component {
  collectionName: 'components_reservas_fecha_asignadas';
  info: {
    displayName: 'Fecha_asignada';
    icon: 'calendar';
  };
  attributes: {
    Fecha: Attribute.Date & Attribute.Required;
    Nota: Attribute.String;
    Viaje_relacionado: Attribute.Relation<
      'reservas.fecha-asignada',
      'oneToOne',
      'api::viaje.viaje'
    >;
  };
}

export interface ReservasIntegranteGrupo extends Schema.Component {
  collectionName: 'components_reservas_integrante_grupos';
  info: {
    displayName: 'Integrante_grupo';
    icon: 'user';
  };
  attributes: {
    Documento_id: Attribute.String;
    Email: Attribute.Email;
    Nombre: Attribute.String & Attribute.Required;
    Observaciones: Attribute.String;
    Telefono: Attribute.String;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Attribute.Text;
    title: Attribute.String;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Attribute.Text & Attribute.Required;
    metaTitle: Attribute.String & Attribute.Required;
    shareImage: Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Attribute.Media<'images', true>;
  };
}

export interface ViajesSalida extends Schema.Component {
  collectionName: 'components_viajes_salidas';
  info: {
    description: '';
    displayName: 'Salida';
    icon: 'plane';
  };
  attributes: {
    Cupo_disponible: Attribute.Integer;
    Cupo_total: Attribute.Integer;
    Estado: Attribute.Enumeration<
      [
        'Disponible',
        'Confirmado',
        '\u00DAltimas plazas',
        'Completo',
        'Cancelado'
      ]
    >;
    Fecha_fin: Attribute.Date;
    Fecha_inicio: Attribute.Date;
    Precio: Attribute.BigInteger;
    Proveedores_asignados: Attribute.Relation<
      'viajes.salida',
      'oneToMany',
      'api::proveedor.proveedor'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'reservas.fecha-asignada': ReservasFechaAsignada;
      'reservas.integrante-grupo': ReservasIntegranteGrupo;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'viajes.salida': ViajesSalida;
    }
  }
}
