// react/PaginationStatus.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import { path } from 'ramda'
import classNames from 'classnames'
import { useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES = ['paginationStatusContainer','paginationStatusText']

const getPageFromUrl = () => {
  try {
    const usp = new URLSearchParams(window.location.search)
    const p = Number(usp.get('page'))
    return Number.isFinite(p) && p > 0 ? p : undefined
  } catch { return undefined }
}

const getPageFromVariables = (variables, mp) => {
  if (!variables) return undefined
  const from = typeof variables.from === 'number' ? variables.from : undefined
  const to = typeof variables.to === 'number' ? variables.to : undefined
  if (from == null) return undefined
  // itemsPerPage real: si hay to/from válidos, úsalo; si no, cae al mp de contexto
  const perPage = (to != null && to >= from) ? (to - from + 1) : mp
  const page = Math.floor(from / Math.max(perPage || 1, 1)) + 1
  return page > 0 ? page : undefined
}

const PaginationStatus = () => {
  const { searchQuery, maxItemsPerPage, page: currPageFromContext } = useSearchPage()
  const { query, setQuery } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)

  const mp = Number(maxItemsPerPage) || 10
  const recordsFiltered = path(['data','productSearch','recordsFiltered'], searchQuery)
  const totalPages = useMemo(() => {
    const rf = Number(recordsFiltered) || 0
    return rf > 0 ? Math.ceil(rf / mp) : 0
  }, [recordsFiltered, mp])

  // Estado local
  const [currentPage, setCurrentPage] = useState(() => {
    // Prioridad: URL ?page -> variables from/to -> contexto -> 1
    return (
      getPageFromUrl() ||
      getPageFromVariables(searchQuery?.variables, mp) ||
      Number(currPageFromContext) || 1
    )
  })

  // Rehidratar cuando cambie la búsqueda (facetas, orden, etc.)
  useEffect(() => {
    const urlPage =
      Number(query?.page) ||
      getPageFromUrl() ||
      getPageFromVariables(searchQuery?.variables, mp) ||
      Number(currPageFromContext) || 1

    setCurrentPage(urlPage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery?.variables, query?.page, mp, currPageFromContext])

  // Escuchar tu evento custom y también persistir en URL
  useEffect(() => {
    const onChange = (e) => {
      const next = Number(e?.detail?.page) || 1
      setCurrentPage(next)
      // Escribe ?page=next en la URL para que un reload respete la página
      // Nota: setQuery fusiona por defecto; evita sobreescribir otros parámetros
      try {
        setQuery({ page: String(next) })
      } catch {
        // Fallback sin romper navegación
        const usp = new URLSearchParams(window.location.search)
        usp.set('page', String(next))
        window.history.replaceState({}, '', `${window.location.pathname}?${usp.toString()}`)
      }
    }
    window.addEventListener('custom:paginator:page', onChange)
    return () => window.removeEventListener('custom:paginator:page', onChange)
  }, [setQuery])

  // Mantener sync si el usuario navega con back/forward
  useEffect(() => {
    const onPop = () => {
      const p = getPageFromUrl()
      if (p) setCurrentPage(p)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (!recordsFiltered || totalPages <= 0) return null

  const firstItem = ((currentPage - 1) * mp) + 1
  const lastItem  = Math.min(currentPage * mp, Number(recordsFiltered) || 0)

  return (
    <div id="search-top-anchor" className={classNames(handles.paginationStatusContainer, 'pv3')}>
      <div className={classNames(handles.paginationStatusText, 'f6')}>
        {`Página ${currentPage} de ${totalPages}`}
        {/* {`Página ${currentPage} de ${totalPages} · ${firstItem}-${lastItem} de ${recordsFiltered} resultados`} */}
      </div>
    </div>
  )
}

export default PaginationStatus
