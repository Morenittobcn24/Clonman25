import type { Schema, Struct } from '@strapi/strapi';

export interface ReservasFechaAsignada extends Struct.ComponentSchema {
  collectionName: 'components_reservas_fecha_asignadas';
  info: {
    displayName: 'Fecha_asignada';
    icon: 'calendar';
  };
  attributes: {
    Fecha: Schema.Attribute.Date & Schema.Attribute.Required;
    Nota: Schema.Attribute.String;
    Viaje_relacionado: Schema.Attribute.Relation<
      'oneToOne',
      'api::viaje.viaje'
    >;
  };
}

export interface ReservasIntegranteGrupo extends Struct.ComponentSchema {
  collectionName: 'components_reservas_integrante_grupos';
  info: {
    displayName: 'Integrante_grupo';
    icon: 'user';
  };
  attributes: {
    Documento_id: Schema.Attribute.String;
    Email: Schema.Attribute.Email;
    Nombre: Schema.Attribute.String & Schema.Attribute.Required;
    Observaciones: Schema.Attribute.String;
    Telefono: Schema.Attribute.String;
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

export interface ViajesItinerario extends Struct.ComponentSchema {
  collectionName: 'components_viajes_itinerarios';
  info: {
    displayName: 'Itinerario';
    icon: 'bulletList';
  };
  attributes: {
    Descripcion_Dia: Schema.Attribute.RichText;
    Imagen_iti: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Titulo_Dia: Schema.Attribute.String;
  };
}

export interface ViajesPreguntas extends Struct.ComponentSchema {
  collectionName: 'components_viajes_preguntas';
  info: {
    displayName: 'Preguntas';
    icon: 'apps';
  };
  attributes: {
    Pregunta: Schema.Attribute.String;
    Respuesta: Schema.Attribute.RichText;
  };
}

export interface ViajesSalida extends Struct.ComponentSchema {
  collectionName: 'components_viajes_salidas';
  info: {
    description: '';
    displayName: 'Salida';
    icon: 'plane';
  };
  attributes: {
    Cupo_disponible: Schema.Attribute.Integer;
    Cupo_total: Schema.Attribute.Integer;
    Estado: Schema.Attribute.Enumeration<
      [
        'Disponible',
        'Confirmado',
        '\u00DAltimas plazas',
        'Completo',
        'Cancelado',
        '\u00A1Corre pocas plazas disponibles!',
        'Cerrado',
        'Privado',
      ]
    >;
    Fecha_fin: Schema.Attribute.Date;
    Fecha_inicio: Schema.Attribute.Date;
    Precio: Schema.Attribute.Decimal;
    Proveedores_asignados: Schema.Attribute.Relation<
      'oneToMany',
      'api::proveedor.proveedor'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'reservas.fecha-asignada': ReservasFechaAsignada;
      'reservas.integrante-grupo': ReservasIntegranteGrupo;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'viajes.itinerario': ViajesItinerario;
      'viajes.preguntas': ViajesPreguntas;
      'viajes.salida': ViajesSalida;
    }
  }
}
