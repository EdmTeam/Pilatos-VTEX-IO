export const renderArt = () => ({
  title: 'Container',
  type: 'object',
  properties: {
    container: {
      title: 'Seleccione el elemento que se desea mostrar',
      enum: ['ContainerVideo', 'ContainerImagen'],
      enumNames: ['Video', 'Imagen'],
      widget: { 'ui:widget': 'radio' },
      // (opcional UI)
      // 'ui:options': { inline: true }
    },
  },
  dependencies: {
    container: {
      oneOf: [
        // ======== VIDEO ========
        {
          properties: {
            container: { enum: ['ContainerVideo'] },
            link: {
              type: 'string',
              title: 'Link del video (MP4 / WEBM / HLS)',
              description:
                'Usa una URL directa al archivo de video (p. ej. https://cdn.tu-dominio.com/video.mp4 o .m3u8). En YouTube/Vimeo no funciona como fuente de <video>.',
              format: 'uri',
              default: 'https://cdn.tu-dominio.com/campaigns/hero.mp4',
              'ui:help':
                'Ejemplos: https://cdn.tu-dominio.com/video.mp4, https://cdn.tu-dominio.com/stream.m3u8',
            },
            loop: {
              title: 'Loop del video',
              type: 'boolean',
              default: false,
            },
            autoPlay: {
              title: 'Reproducir automáticamente (autoplay)',
              type: 'boolean',
              default: true, // ✅ recomendado para spots
            },
            muted: {
              title: 'Silenciar (requerido para autoplay)',
              type: 'boolean',
              default: true, // ✅ necesario para autoplay en la mayoría de navegadores
            },
          },
          required: ['link'],
        },

        // ======== IMAGEN ========
        {
          properties: {
            container: { enum: ['ContainerImagen'] },
            url: {
              title: 'URL donde debe redirigir la imagen',
              type: 'string',
              default: '/',
              description:
                'Destino opcional al hacer clic. Puedes dejar "/" o dejarlo vacío para imagen sin enlace.',
            },
            imageGallery: {
              title: 'Imagen',
              type: 'string',
              widget: { 'ui:widget': 'image-uploader' },
              'ui:help':
                'Sube o pega la URL de la imagen. Idealmente optimizada (webp/jpg) y con proporción acorde al espacio.',
            },
          },
          required: ['imageGallery'],
        },
      ],
    },
  },
})
