import React, { useRef, useState } from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'filtersWrapper',
  'filterContainer',
  'filterTitle',
  'filterContent',
  'filterItem',
  'filterLabel',
  'filterCheckbox',
  'filterCount',
  'filterDropdown',
  'filterOpen',
  'filterCheckboxLine',
  'filterCheckboxContainer',
  'filterCheckboxInner',
  'filterCheckboxBoxWrapper',
  'filterCheckboxBox',
  'filterCheckboxInput',
  'filterCheckboxLabel',
  'filterIconContainer',
  'filterIcon',
  'filterCheckboxBoxSelected',
  'filterIconHover',
  'filterFaceContainer'
]

const CustomFilterNavigator = () => {
  const { searchQuery } = useSearchPage()
  const { setQuery } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)

  const filters = (searchQuery?.data?.facets?.specificationFilters ?? []) as any[]

  // 🔍 Obtener datos de query y map
  const queryFromArgs = searchQuery?.data?.facets?.queryArgs?.query ?? ''
  const mapFromArgs = searchQuery?.data?.facets?.queryArgs?.map ?? ''

  const querySegments = queryFromArgs.split('/').filter(Boolean)
  const mapSegments = mapFromArgs.split(',').filter(Boolean)

  const initialQuery = querySegments.join('/')
  const initialMap = mapSegments.slice(0, querySegments.length).join(',')

  const initialQueryRef = useRef(initialQuery)
  const initialMapRef = useRef(initialMap)

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleFilterToggle = (map: string, value: string, selected: boolean) => {
    const baseQuery = initialQueryRef.current.split('/').filter(Boolean)
    const baseMap = initialMapRef.current.split(',').filter(Boolean)

    const activeFilters = searchQuery?.variables?.query?.split('/') ?? []
    const activeMaps = searchQuery?.variables?.map?.split(',') ?? []

    const extraFilters = activeFilters.slice(baseQuery.length)
    const extraMaps = activeMaps.slice(baseMap.length)

    let additionalQuery = [...extraFilters]
    let additionalMap = [...extraMaps]

    const index = additionalQuery.findIndex((q, i) => q === value && additionalMap[i] === map)

    if (selected && index === -1) {
      additionalQuery.push(value)
      additionalMap.push(map)
    } else if (!selected && index > -1) {
      additionalQuery.splice(index, 1)
      additionalMap.splice(index, 1)
    }

    const finalQuery = [...baseQuery, ...additionalQuery]
    const finalMap = [...baseMap, ...additionalMap]

    setQuery(
      {
        query: `/${finalQuery.join('/')}`,
        map: finalMap.join(','),
        initialQuery: initialQueryRef.current,
        initialMap: initialMapRef.current,
        searchState: '',
      },
      { replace: true }
    )
  }

  if (!Array.isArray(filters) || filters.length === 0) return null

  return (
    <div className={handles.filtersWrapper}>
      {filters.map((facet, index) => {
        if (facet.hidden || !facet.facets?.length) return null

        return (
          <div
            key={facet.name}
            className={`${handles.filterContainer} ${handles.filterContainer}--${facet.name.replace(/\s+/g, '-').toLowerCase()}`}
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <div role="button" className={handles.filterTitle}>
              <span className={handles.filterFaceContainer}>{facet.name}</span>
              <span className={handles.filterIconContainer}>
                <svg
                  className={`${handles.filterIcon} ${openIndex === index ? handles.filterIconHover : ''}`}
                  fill="none"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#nav-caret--up" xlinkHref="#nav-caret--up" />
                </svg>
              </span>
            </div>

            <div
              className={`${handles.filterDropdown} ${openIndex === index ? handles.filterOpen : 'dn'}`}
              style={{ maxHeight: '200px', overflowY: 'auto' }}
            >
              <div className={handles.filterContent}>
                {facet.facets.map((value: any) => (
                  <div
                    key={value.value}
                    className={handles.filterItem}
                    style={{ hyphens: 'auto', wordBreak: 'break-word' }}
                  >
                    <div className={handles.filterCheckboxLine}>
                      <div className={handles.filterCheckboxContainer}>
                        <div className={handles.filterCheckboxInner}></div>
                        <div className={handles.filterCheckboxBoxWrapper}>
                          <div
                            className={`${handles.filterCheckboxBox} ${
                              value.selected ? handles.filterCheckboxBoxSelected : ''
                            }`}
                          />
                        </div>
                        <input
                          className={handles.filterCheckboxInput}
                          id={`${facet.name}-${value.value}`}
                          name={value.name}
                          type="checkbox"
                          tabIndex={0}
                          value={value.value}
                          checked={value.selected}
                          onChange={() =>
                            handleFilterToggle(value.map, value.value, !value.selected)
                          }
                        />
                      </div>
                      <label
                        className={handles.filterCheckboxLabel}
                        htmlFor={`${facet.name}-${value.value}`}
                      >
                        {value.name}{' '}
                        <span className={handles.filterCount}>({value.quantity})</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CustomFilterNavigator
