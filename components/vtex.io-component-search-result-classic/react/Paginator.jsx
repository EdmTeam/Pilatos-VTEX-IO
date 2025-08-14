import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import { path } from 'ramda'
import classNames from 'classnames'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useCssHandles } from 'vtex.css-handles'
import LoadingSpinner from './component/loaders/LoadingSpinner'
import { PAGINATION_TYPE } from './constants/paginationType'
import { useFetchMore } from './hooks/useFetchMore'
import { Slider, Slide } from 'vtex.slider'
import { Dropdown } from 'vtex.styleguide'

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
  'contentimg'
]

const Paginator = () => {
  const { pagination, searchQuery, maxItemsPerPage, page: currPage } = useSearchPage()
  const handles = useCssHandles(CSS_HANDLES)

  let products = path(['data', 'productSearch', 'products'], searchQuery)
  const recordsFiltered = path(
    ['data', 'productSearch', 'recordsFiltered'],
    searchQuery
  )
  const [pageButtons, setpageButtons] = useState([])
  const [currentPage, setCurrentPage] = useState(currPage)
  const [slide, setSlide] = useState(0)
  const numberOfPages = (Math.ceil((recordsFiltered / maxItemsPerPage)) > 50) ? 50 : (Math.ceil((recordsFiltered / maxItemsPerPage)))

  const firstItem = ((currentPage - 1) * maxItemsPerPage) + 1
  const lastItem = Math.min(currentPage * maxItemsPerPage, recordsFiltered)

  useEffect(() => {
    if (typeof (maxItemsPerPage) === 'number' && typeof (recordsFiltered) === 'number') {
      setpageButtons(Array.from({ length: numberOfPages }, (_, i) => i + 1))
    }
  }, [maxItemsPerPage, recordsFiltered])

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
    recordsFiltered,
    maxItemsPerPage,
    fetchMore,
    products,
    queryData,
  })

  const handleChangeSlide = (i) => {
    if (numberOfPages > 5) {
      if (i <= (numberOfPages - 5)) {
        setSlide(i)
      } else {
        setSlide((numberOfPages - 5))
      }
    }
    else {
      setSlide(i)
    }
  }

  const isShowMore = pagination === PAGINATION_TYPE.SHOW_MORE
  const options = pageButtons.map((page) => {
    return {
      value: page, label: `Página ${page}`
    }
  })

  if (isShowMore && pageButtons.length > 0 && numberOfPages > 1) {
    return (
      <div className={classNames(handles.paginatorContainer, 'mw6 db')}>
        {/* Resultados */}
        <div className={handles.resultsSummary}>
          {`${firstItem}-${lastItem} de ${recordsFiltered} Resultados`}
        </div>

        {/* Fila de paginación */}
        <div className={classNames(handles.paginationRow, 'justify-center flex')}>
          {(slide >= 1) && (numberOfPages > 3 ) && (
            <button
              className={handles.arrowPrev}
              onClick={() => { setSlide((prev) => (prev - 1)); }}>
              <span className={handles.contentSvg}>
                <img className={handles.contentimg} src="https://pilatos21.vtexassets.com/assets/vtex.file-manager-graphql/images/9c7f3fe1-e677-452d-8103-09c912a0e43d___4af1785d12725ab599ee71aa5492fcc8.png" alt="" />
              </span>
            </button>
          )}
          <Slider currentSlide={slide} onChangeSlide={() => { handleChangeSlide(slide) }} perPage={3}>
            {pageButtons.map((btn, index) => (
              index <= 49 ? (
                <Slide key={`button ${btn}`}>
                  <button
                    id={btn === currentPage ? 'active' : undefined}
                    onClick={() => {
                      setCurrentPage(btn)
                      handleFetchPerPage(btn)
                      handleChangeSlide(btn - 1)
                    }}
                    className={
                      btn === currentPage
                        ? classNames(handles.buttonPerPage, handles.buttonPerPageActive)
                        : handles.buttonPerPage
                    }
                  >
                    {btn}
                  </button>
                </Slide>
              ) : null
            ))}
          </Slider>
          {/* Puntos suspensivos antes de la flecha */}
          {numberOfPages > 3 && (
            <span className={handles.paginationEllipsis}>...</span>
          )}
          {(slide !== (numberOfPages - 5)) && (slide < 45) && (numberOfPages > 5) && (
            <button
              className={handles.arrowNext}
              onClick={() => { setSlide((prev) => (prev + 1)); }}>
              <span className={handles.contentSvg}>
                <img src="https://pilatos21.vtexassets.com/assets/vtex.file-manager-graphql/images/621dc853-15b7-4fe9-90a3-7f6948ef8afa___d312e24f9457b5bd83a7be047a64fd78.png" alt="" />
                {/* <svg width="17" height="28" viewBox="0 0 17 28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.82219 26.9035L16.4539 13.8744L3.82219 0.845393..." />
                </svg> */}
              </span>
            </button>
          )}
        </div>

        {/* Dropdown */}
        <div className={classNames(handles.containerDropdown, 'mt5 flex justify-center')}>
          <Dropdown
            variation="inline"
            size="large"
            options={options.slice(0, 50)}
            value={currentPage}
            onChange={(_, v) => {
              setCurrentPage(Number(v));
              handleFetchPerPage(Number(v));
              handleChangeSlide(Number(v) - 1);
            }}
          />
        </div>
      </div>
    )
  }

  return <LoadingSpinner loading={loading} />
}

export default Paginator
