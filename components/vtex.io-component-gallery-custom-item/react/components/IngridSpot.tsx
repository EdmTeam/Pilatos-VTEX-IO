import React, { useMemo } from 'react'
//@ts-ignore
import { Video } from 'vtex.store-video'
//@ts-ignore
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { IIngridSpot } from '../GalleryImage.types'

const CSS_HANDLES = ['image-gallery']
const CLASS_NAMES =
  'pilatos21-plp-gallery-0-x-galleryItem pilatos21-plp-gallery-0-x-galleryItem--normal pa1 galleryCustom'

export const IngridSpot = ({
  rowStart,
  colStart,
  longCols,
  longRows,
  container,
  link,
  url,
  imageGallery,
  autoPlay,
  loop,
  muted,
}: IIngridSpot) => {
  const { device } = useDevice()
  const handles = useCssHandles(CSS_HANDLES)

  // (mantenemos el cálculo por compatibilidad, aunque en flex no se aplica)
  useMemo(() => {
    void device
    void rowStart
    void colStart
    void longRows
    void longCols
  }, [device, rowStart, colStart, longRows, longCols])

  const Img = (
    <img
      className={handles['image-gallery']}
      src={imageGallery}
      alt="Imagen de la galería"
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )

  return (
    <div className={CLASS_NAMES} /* sin gridArea en flex */>
      {container === 'ContainerVideo' ? (
        <Video src={link} width="100%" height="100%" loop={loop} muted={muted} autoPlay={autoPlay} />
      ) : url ? (
        <Link to={url}>{Img}</Link>
      ) : (
        <div style={{ pointerEvents: 'none' }}>{Img}</div>
      )}
    </div>
  )
}
