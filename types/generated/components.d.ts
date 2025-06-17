import type { Schema, Struct } from '@strapi/strapi';

export interface ReservasIntegranteGrupo extends Struct.ComponentSchema {
  collectionName: 'components_reservas_integrante_grupos';
  info: {
    displayName: 'integrante_grupo';
    icon: 'user';
  };
  attributes: {
    documento_id: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
    observaciones: Schema.Attribute.String;
    telefono: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface ViajesSalida extends Struct.ComponentSchema {
  collectionName: 'components_viajes_salidas';
  info: {
    description: '';
    displayName: 'salida';
    icon: 'plane';
  };
  attributes: {
    cupo_disponible: Schema.Attribute.Integer;
    cupo_total: Schema.Attribute.Integer;
    estado: Schema.Attribute.Enumeration<
      [
        'Disponible',
        'Confirmado',
        '\u00DAltimas plazas',
        'Completo',
        'Cancelado',
      ]
    >;
    fecha_fin: Schema.Attribute.Date;
    fecha_inicio: Schema.Attribute.Date;
    precio: Schema.Attribute.BigInteger;
    proveedores_asignados: Schema.Attribute.Relation<
      'oneToMany',
      'api::proveedor.proveedor'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
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
