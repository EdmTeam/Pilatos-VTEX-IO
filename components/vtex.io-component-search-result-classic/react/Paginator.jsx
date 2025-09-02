import React, { useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import { path } from 'ramda'
import classNames from 'classnames'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import LoadingSpinner from './component/loaders/LoadingSpinner'
import { PAGINATION_TYPE } from './constants/paginationType'
import { useFetchMore } from './hooks/useFetchMore'
import { Dropdown, Spinner } from 'vtex.styleguide' // <-- Spinner

const CSS_HANDLES = [
  'paginatorContainer',
  'resultsSummary',
  'paginationRow',
  'arrowPrev',
  'arrowNext',
  'contentSvg',
  'buttonPerPage',
  'buttonPerPageActive',
  'containerDropdown',
  'contentimg',
  'paginationEllipsis',
  'arrowPlaceholder'
]

const PER_PAGE = 3
const MAX_PAGES = 50

// --- Opciones de scroll (ajusta el offset si tienes header sticky)
const SCROLL_ANCHOR_ID = 'search-top-anchor'
const SCROLL_OFFSET = 80

const Paginator = () => {
  const { pagination, searchQuery, maxItemsPerPage, page: currPage } = useSearchPage()
  const handles = useCssHandles(CSS_HANDLES)

  const products = path(['data', 'productSearch', 'products'], searchQuery)
  const recordsFiltered = path(['data', 'productSearch', 'recordsFiltered'], searchQuery)

  const [pageButtons, setPageButtons] = useState([])
  const [currentPage, setCurrentPage] = useState(currPage || 1)

  // página que está cargando ahora (para mostrar spinner en ese botón)
  const [pendingPage, setPendingPage] = useState(null)

  // bandera para scrollear tras terminar de cargar
  const [shouldScrollTop, setShouldScrollTop] = useState(false)

  const totalPages = useMemo(() => {
    const mp = Number(maxItemsPerPage) || 1
    const rf = Number(recordsFiltered) || 0
    return Math.min(Math.ceil(rf / mp), MAX_PAGES)
  }, [maxItemsPerPage, recordsFiltered])

  const [blockStart, setBlockStart] = useState(0)
  const maxBlockStart = Math.max(0, totalPages - PER_PAGE)

  const visible = useMemo(() => {
    const start = Math.max(0, Math.min(blockStart, maxBlockStart))
    return pageButtons.slice(start, start + PER_PAGE)
  }, [pageButtons, blockStart, maxBlockStart])

  const firstItem = ((currentPage - 1) * (Number(maxItemsPerPage) || 1)) + 1
  const lastItem = Math.min(currentPage * (Number(maxItemsPerPage) || 1), Number(recordsFiltered) || 0)

  useEffect(() => {
    if (Number.isFinite(totalPages) && totalPages > 0) {
      setPageButtons(Array.from({ length: totalPages }, (_, i) => i + 1))
      setBlockStart(0)
      setCurrentPage((prev) => prev || 1)
    } else {
      setPageButtons([])
      setBlockStart(0)
      setCurrentPage(1)
    }
  }, [totalPages])

  const fetchMore = path(['fetchMore'], searchQuery)
  const queryData = {
    query: path(['variables', 'query'], searchQuery),
    map: path(['variables', 'map'], searchQuery),
    orderBy: path(['variables', 'orderBy'], searchQuery),
    priceRange: path(['variables', 'selectedFacets'], searchQuery)?.find(
      facet => facet.key === 'priceRange'
    )?.value,
  }

  const { handleFetchPerPage, loading } = useFetchMore({
    page: currentPage,
    recordsFiltered: Number(recordsFiltered) || 0,
    maxItemsPerPage: Number(maxItemsPerPage) || 1,
    fetchMore,
    products,
    queryData,
  })

  // Cuando termina la carga, limpiamos el pendingPage
  useEffect(() => {
    if (!loading) setPendingPage(null)
  }, [loading])

  // Scroll hacia arriba DESPUÉS de cargar la nueva página
  useEffect(() => {
    if (!loading && shouldScrollTop) {
      requestAnimationFrame(() => {
        const el = document.getElementById(SCROLL_ANCHOR_ID)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
          window.scrollTo({ top: y, behavior: 'smooth' })
        } else {
          // fallback si no existe el ancla arriba
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        setShouldScrollTop(false)
      })
    }
  }, [loading, shouldScrollTop])

  const isShowMore = pagination === PAGINATION_TYPE.SHOW_MORE
  const showArrows = totalPages > PER_PAGE
  const atStart = blockStart === 0
  const atEnd = blockStart >= maxBlockStart

  const goPrevBlock = () => setBlockStart((s) => Math.max(0, s - PER_PAGE))
  const goNextBlock = () => setBlockStart((s) => Math.min(maxBlockStart, s + PER_PAGE))

  const goToPage = (page) => {
    setPendingPage(page)            // <- mostrar spinner en ese botón
    setCurrentPage(page)
    // mover al bloque que contiene esa página
    const newBlock = Math.floor((page - 1) / PER_PAGE) * PER_PAGE
    setBlockStart(newBlock)

    // notifica al header (si tienes PaginationStatus arriba)
    try {
      window.dispatchEvent(new CustomEvent('custom:paginator:page', { detail: { page } }))
    } catch (_) {}

    // ejecutar la carga y luego scrollear cuando termine
    setShouldScrollTop(true)
    const maybePromise = handleFetchPerPage(page)
    // si tu hook devuelve promesa, puedes descomentar para limpiar al resolver
    // Promise.resolve(maybePromise).finally(() => setPendingPage(null))
  }

  const options = pageButtons.map((page) => ({ value: page, label: `Página ${page}` }))

  if (!(isShowMore && pageButtons.length > 0 && totalPages > 1)) {
    return <LoadingSpinner loading={loading} />
  }

  return (
    <div className={classNames(handles.paginatorContainer, 'mw6 db')}>
      {/* Resumen */}
      <div className={handles.resultsSummary}>
        {`${firstItem}-${lastItem} de ${recordsFiltered} Resultados`}
      </div>

      {/* Fila de paginación */}
      <div className={classNames(handles.paginationRow, 'justify-center flex items-center')}>

        {/* Flecha izquierda */}
        {showArrows ? (
          <button
            className={handles.arrowPrev}
            onClick={goPrevBlock}
            aria-label="Página anterior"
            style={atStart ? { visibility: 'hidden' } : undefined}
            tabIndex={atStart ? -1 : 0}
          >
            <span className={handles.contentSvg}>
              <img
                className={handles.contentimg}
                src="https://pilatos21.vtexassets.com/assets/vtex.file-manager-graphql/images/9c7f3fe1-e677-452d-8103-09c912a0e43d___4af1785d12725ab599ee71aa5492fcc8.png"
                alt=""
              />
            </span>
          </button>
        ) : (
          <span className={handles.arrowPlaceholder} />
        )}

        {/* Puntos suspensivos a la izquierda */}
        {showArrows && !atStart && (
          <span className={handles.paginationEllipsis} aria-hidden="true">...</span>
        )}

        {/* Botones visibles (con spinner por botón) */}
        {visible.map((btn) => {
          const isActive = btn === currentPage
          const isPending = loading && pendingPage === btn

          return (
            <button
              key={`page-${btn}`}
              id={isActive ? 'active' : undefined}
              onClick={() => goToPage(btn)}
              className={
                isActive
                  ? classNames(handles.buttonPerPage, handles.buttonPerPageActive)
                  : handles.buttonPerPage
              }
              aria-label={`Página ${btn}`}
              aria-busy={isPending ? 'true' : 'false'}
              disabled={isPending} // evita doble click mientras carga esa página
              style={{ minWidth: 40, minHeight: 40, position: 'relative' }}
            >
              {isPending ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Spinner size={16} />
                </span>
              ) : (
                btn
              )}
            </button>
          )
        })}

        {/* Puntos suspensivos a la derecha */}
        {totalPages > PER_PAGE && !atEnd && (
          <span className={handles.paginationEllipsis} aria-hidden="true">...</span>
        )}

        {/* Flecha derecha */}
        {showArrows ? (
          <button
            className={handles.arrowNext}
            onClick={goNextBlock}
            aria-label="Página siguiente"
            style={atEnd ? { visibility: 'hidden' } : undefined}
            tabIndex={atEnd ? -1 : 0}
          >
            <span className={handles.contentSvg}>
              <img
                src="https://pilatos21.vtexassets.com/assets/vtex.file-manager-graphql/images/621dc853-15b7-4fe9-90a3-7f6948ef8afa___d312e24f9457b5bd83a7be047a64fd78.png"
                alt=""
              />
            </span>
          </button>
        ) : (
          <span className={handles.arrowPlaceholder} />
        )}
      </div>

      {/* Dropdown */}
      <div className={classNames(handles.containerDropdown, 'mt5 flex justify-center')}>
        <Dropdown
          variation="inline"
          size="large"
          options={options.slice(0, MAX_PAGES)}
          value={currentPage}
          onChange={(_, v) => {
            const page = Number(v)
            goToPage(page) // también activa spinner en el botón correspondiente
          }}
        />
      </div>
    </div>
  )
}

export default Paginator
