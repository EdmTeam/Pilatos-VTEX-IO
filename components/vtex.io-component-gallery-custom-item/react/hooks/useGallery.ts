import { useEffect, useMemo, useRef, useState } from 'react'
import { IIngridSpot } from '../GalleryImage.types'
import { useRuntime, canUseDOM } from 'vtex.render-runtime'

type TIngridSpotReturn = [IIngridSpot | undefined, HTMLDivElement | undefined]

// Selector de la grilla de productos (VTEX)
const GALLERY_SELECTOR = '.vtex-search-result-3-x-gallery'
const PLACEHOLDER_ID = 'ingrid-spot-placeholder'

function getGalleryEl(): HTMLDivElement | null {
  const el = document.querySelector(GALLERY_SELECTOR)
  return (el as HTMLDivElement) || null
}

function fromEnd<T>(arr: T[], pred: (x: T) => boolean): T | undefined {
  for (let i = arr.length - 1; i >= 0; i--) if (pred(arr[i])) return arr[i]
  return undefined
}

// Lee columnas del flex-basis del primer hijo (25% => 4 cols)
function getCols(container: HTMLDivElement): number {
  const first = container.children[0] as HTMLElement | undefined
  if (!first) return 4
  const basis =
    first.style.flexBasis ||
    getComputedStyle(first).flexBasis ||
    first.style.maxWidth ||
    getComputedStyle(first).maxWidth
  if (basis && basis.endsWith('%')) {
    const pct = parseFloat(basis)
    if (pct > 0) return Math.max(1, Math.round(100 / pct))
  }
  return 4
}

function ensurePlaceholderAtIndex(
  container: HTMLDivElement,
  index: number,
  cols: number,
  spanCols: number
): HTMLDivElement {
  const children = Array.from(container.children) as HTMLElement[]
  const safeIndex = Math.max(0, Math.min(index, children.length))

  let placeholder = container.querySelector(`#${PLACEHOLDER_ID}`) as HTMLDivElement | null
  const basisPct = 100 / Math.max(1, cols)
  const spanPct = Math.min(100, basisPct * Math.max(1, spanCols))

  if (!placeholder) {
    placeholder = document.createElement('div')
    placeholder.id = PLACEHOLDER_ID
    // mismas clases que un item de VTEX (ajusta a tus clases reales si difieren)
    placeholder.className =
      'vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--whole'
    placeholder.style.display = 'block'
    placeholder.style.flexBasis = `${spanPct}%`
    placeholder.style.maxWidth = `${spanPct}%`
    placeholder.style.boxSizing = 'border-box'
    // inserta en la posición deseada
    container.insertBefore(placeholder, safeIndex >= children.length ? null : children[safeIndex])
  } else {
    // si ya existe, actualiza el ancho y muévelo si hace falta
    placeholder.style.flexBasis = `${spanPct}%`
    placeholder.style.maxWidth = `${spanPct}%`
    const currentIndex = children.indexOf(placeholder)
    if (currentIndex !== safeIndex) {
      container.insertBefore(placeholder, safeIndex >= children.length ? null : children[safeIndex])
    }
  }

  return placeholder
}

export const useGallery = (ingridSpots: IIngridSpot[]): TIngridSpotReturn => {
  const { route } = useRuntime()
  const [spot, setSpot] = useState<IIngridSpot>()
  const [target, setTarget] = useState<HTMLDivElement>()
  const obsRef = useRef<MutationObserver | null>(null)

  const canonicalPath: string = useMemo(() => {
    // @ts-ignore
    return route?.canonicalPath ?? window.location?.pathname ?? '/'
  }, [route?.canonicalPath])

  // Elegir el spot (prioriza específico; si no, general)
  useEffect(() => {
    if (!Array.isArray(ingridSpots) || ingridSpots.length === 0) {
      setSpot(undefined)
      return
    }
    const visibles = ingridSpots.filter((s) => s?.activeImageGallery)

    const specific = fromEnd(
      visibles,
      (s) => Array.isArray(s?.showInSpecificPLP) && s.showInSpecificPLP.some((p: any) => p?.plpUrl === canonicalPath)
    )
    if (specific) {
      setSpot({ ...specific })
      return
    }

    const general = fromEnd(visibles, (s) => !!s?.showAllPLP)
    setSpot(general ? { ...general } : undefined)
  }, [ingridSpots, canonicalPath])

  // Encontrar la galería y crear/mover placeholder a la posición pedida (FLEX)
  useEffect(() => {
    if (!canUseDOM || !spot) return

    let tries = 0
    const maxTries = 20
    const intervalMs = 1000

    const tryFind = () => {
      const container = getGalleryEl()
      if (!container) return null

      const cols = getCols(container) // p.ej. 4
      const rs = Number(spot.rowStart) || 1
      const cs = Number(spot.colStart) || 1
      const lc = Number(spot.longCols) || 1

      // índice 0-based
      const index = (rs - 1) * cols + (cs - 1)
      const placeholder = ensurePlaceholderAtIndex(container, index, cols, lc)
      return placeholder
    }

    const tick = () => {
      const ph = tryFind()
      tries++
      if (ph) {
        setTarget(ph)
        clearInterval(interval)
      } else if (tries >= maxTries) {
        clearInterval(interval)
        // fallback: observar hasta que aparezca la grilla
        const obs = new MutationObserver(() => {
          const ph2 = tryFind()
          if (ph2) {
            setTarget(ph2)
            if (obsRef.current) {
              obsRef.current.disconnect()
              obsRef.current = null
            }
          }
        })
        obs.observe(document.body, { childList: true, subtree: true })
        obsRef.current = obs
      }
    }

    const interval = setInterval(tick, intervalMs)
    tick() // intenta de inmediato

    return () => {
      clearInterval(interval)
      if (obsRef.current) {
        obsRef.current.disconnect()
        obsRef.current = null
      }
    }
  }, [spot, canonicalPath])

  // Debug opcional
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[GalleryImage:flex]', {
      path: canonicalPath,
      spot: spot?.__editorItemTitle,
      hasTarget: !!target,
    })
  }, [canonicalPath, spot, target])

  return [spot, target]
}
