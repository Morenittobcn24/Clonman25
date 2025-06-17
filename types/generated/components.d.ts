import type { Attribute, Schema } from '@strapi/strapi';

export interface ReservasIntegranteGrupo extends Schema.Component {
  collectionName: 'components_reservas_integrante_grupos';
  info: {
    displayName: 'integrante_grupo';
    icon: 'user';
  };
  attributes: {
    documento_id: Attribute.String;
    email: Attribute.Email;
    nombre: Attribute.String & Attribute.Required;
    observaciones: Attribute.String;
    telefono: Attribute.String;
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
    displayName: 'salida';
    icon: 'plane';
  };
  attributes: {
    cupo_disponible: Attribute.Integer;
    cupo_total: Attribute.Integer;
    estado: Attribute.Enumeration<
      [
        'Disponible',
        'Confirmado',
        '\u00DAltimas plazas',
        'Completo',
        'Cancelado'
      ]
    >;
    fecha_fin: Attribute.Date;
    fecha_inicio: Attribute.Date;
    precio: Attribute.BigInteger;
    proveedores_asignados: Attribute.Relation<
      'viajes.salida',
      'oneToMany',
      'api::proveedor.proveedor'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
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
