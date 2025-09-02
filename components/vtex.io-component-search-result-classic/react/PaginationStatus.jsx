// react/PaginationStatus.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import { path } from 'ramda'
import classNames from 'classnames'

const CSS_HANDLES = ['paginationStatusContainer','paginationStatusText']

const PaginationStatus = () => {
  const { searchQuery, maxItemsPerPage, page: currPage } = useSearchPage()
  const handles = useCssHandles(CSS_HANDLES)

  const recordsFiltered = path(['data','productSearch','recordsFiltered'], searchQuery)
  const mp = Number(maxItemsPerPage) || 1
  const [currentPage, setCurrentPage] = useState(currPage || 1)

  // escucha cambios del Paginator (evento que disparas al cambiar de página)
  useEffect(() => {
    const onChange = (e) => setCurrentPage(Number(e?.detail?.page) || 1)
    window.addEventListener('custom:paginator:page', onChange)
    return () => window.removeEventListener('custom:paginator:page', onChange)
  }, [])

  const totalPages = useMemo(() => {
    const rf = Number(recordsFiltered) || 0
    return rf > 0 ? Math.ceil(rf / mp) : 0
  }, [recordsFiltered, mp])

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
