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
  'buttonShowMoreLayout',
  'arrowPrev',
  'arrowNext',
  'contentSvg',
  'buttonPerPage',
  'containerDropdown'
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
      <div className={classNames(handles.buttonShowMoreLayout, 'mw6 justify-center db')}>
        <div className="w-60 justify-center flex">
          {(slide >= 1) && (numberOfPages > 5) && (
            <button
              className={classNames('mr2', handles.arrowPrev)}
              onClick={() => { setSlide((prev) => (prev - 1)); }}>
              <p className={handles.contentSvg}>
                <svg width="17" height="28" viewBox="0 0 17 28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.82219 26.9035L16.4539 13.8744L3.82219 0.845393..." />
                </svg>
              </p>
            </button>
          )}
          <Slider currentSlide={slide} onChangeSlide={() => { handleChangeSlide(slide) }} perPage={5}>
            {pageButtons.map((btn, index) => (
              index <= 49 ? (
                <Slide key={`button ${btn}`}>
                  <button
                    id={`${(btn === currentPage) ? 'active' : 'noActive'}`}
                    onClick={() => {
                      setCurrentPage(btn)
                      handleFetchPerPage(btn)
                      handleChangeSlide(btn - 1)
                    }}
                    className={handles.buttonPerPage}
                  >
                    {btn}
                  </button>
                </Slide>
              ) : null
            ))}
          </Slider>
          {(slide !== (numberOfPages - 5)) && (slide < 45) && (numberOfPages > 5) && (
            <button
              className={classNames('ml2', handles.arrowNext)}
              onClick={() => { setSlide((prev) => (prev + 1)); }}>
              <p className={handles.contentSvg}>
                <svg width="17" height="28" viewBox="0 0 17 28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.82219 26.9035L16.4539 13.8744L3.82219 0.845393..." />
                </svg>
              </p>
            </button>
          )}
        </div>

        <div className={classNames('mt5 flex justify-center', handles.containerDropdown)}>
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
