import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'

import { IIngridSpot } from './GalleryImage.types'
import { IngridSpot } from './components/IngridSpot'
import { useGallery } from './hooks/useGallery'

// Tipado del block
type GalleryImageProps = {
  ingridSpots: IIngridSpot[]
}

const GalleryImage: StorefrontFunctionComponent<GalleryImageProps> = ({ ingridSpots = [] }) => {
  // Hook ya devuelve el spot activo y el placeholder (en flex) como target
  const [spot, target] = useGallery(ingridSpots)

  // Evita trabajo si no hay contenido o aún no existe el target en el DOM
  const canRender = useMemo(() => Boolean(spot && target), [spot, target])
  if (!canRender) return null

  return ReactDOM.createPortal(<IngridSpot {...(spot as IIngridSpot)} />, target as HTMLDivElement)
}

GalleryImage.schema = {
  title: 'Ingrid Spots',
  description: 'Contenedor de imágenes/video dentro de la galería de resultados (PLP).',
  type: 'object',
  properties: {
    ingridSpots: {
      title: 'Ingrid Spots activos:',
      type: 'array',
      items: {
        properties: {
          __editorItemTitle: {
            title: 'Nombre de Ingrid Spot',
            type: 'string',
            default: 'Ingrid Spot',
            description:
              'Nombre interno para identificar el spot en el Site Editor (no se muestra al público).',
          },
          activeImageGallery: {
            title: 'Mostrar ingrid spot',
            type: 'boolean',
            default: true,
          },
          showAllPLP: {
            title: 'Mostrar ingrid spot en todas las PLPs',
            type: 'boolean',
            default: false,
          },
          showInSpecificPLP: {
            title: 'Mostrar ingrid spot en PLPs específicas:',
            type: 'array',
            description:
              'URLs relativas (sin filtros) donde se mostrará el spot. Ej: /hombre/ropa',
            default: [],
            items: {
              properties: {
                __editorItemTitle: {
                  title: 'Nombre de la PLP',
                  type: 'string',
                  default: 'PLP Name',
                },
                plpUrl: {
                  title: 'URL de la PLP',
                  type: 'string',
                  description:
                    'Ej: /charms, /brazaletes. Debe coincidir exactamente con la canonicalPath.',
                },
              },
            },
          },

          // Tipo de contenido
          container: {
            title: 'Seleccione el elemento que se desea mostrar',
            enum: ['ContainerVideo', 'ContainerImagen'],
            enumNames: ['Video', 'Imagen'],
            default: 'ContainerImagen',
            widget: { 'ui:widget': 'radio' },
          },

          // Posición (fila/col) y spans (solo usados para cálculo de índice/anchos en flex)
          rowStart: {
            title: 'Fila de inicio',
            type: 'number',
            default: 1,
          },
          colStart: {
            title: 'Columna de inicio',
            type: 'number',
            default: 1,
          },
          longRows: {
            title: 'Longitud de filas a ocupar',
            type: 'number',
            default: 1,
          },
          longCols: {
            title: 'Longitud de columnas a ocupar',
            type: 'number',
            default: 1, // en flex usamos esto para span horizontal (ancho)
          },

          // Imagen
          url: {
            title: 'URL donde debe redirigir la imagen',
            type: 'string',
            default: '/',
          },
          imageGallery: {
            title: 'Imagen',
            type: 'string',
            widget: { 'ui:widget': 'image-uploader' },
          },

          // Video
          link: {
            type: 'string',
            title: 'Link del video (MP4/WEBM/HLS)',
            description:
              'Usa una URL directa al archivo de video (no YouTube). Ej: https://cdn.tu-dominio.com/video.mp4',
            default: 'https://cdn.tu-dominio.com/campaigns/hero.mp4',
          },
          loop: {
            title: 'Loop video',
            type: 'boolean',
            default: false,
          },
          autoPlay: {
            title: 'Auto play video',
            type: 'boolean',
            default: true,
          },
          muted: {
            title: 'Muted video (requerido para autoplay)',
            type: 'boolean',
            default: true,
          },
        },
      },
    },
  },
}

export default GalleryImage
