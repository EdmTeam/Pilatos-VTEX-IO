// GalleryImage.types.ts
export type ContainerType = 'ContainerVideo' | 'ContainerImagen'

export interface IPlpTarget {
  __editorItemTitle?: string
  plpUrl: string
}

export interface IIngridSpot {
  __editorItemTitle?: string
  activeImageGallery: boolean
  showAllPLP?: boolean
  showInSpecificPLP?: IPlpTarget[]

  container: ContainerType

  rowStart?: number
  colStart?: number
  longRows?: number
  longCols?: number

  // Imagen
  url?: string
  imageGallery?: string

  // Video
  link?: string
  loop?: boolean
  autoPlay?: boolean
  muted?: boolean
}
