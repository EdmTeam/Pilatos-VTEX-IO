import { useState, useRef, useCallback, useEffect, useReducer } from 'react'
// eslint-disable-next-line no-restricted-imports
import { useRuntime } from 'vtex.render-runtime'
import {
  useSearchPageStateDispatch,
  useSearchPageState,
} from 'vtex.search-page-context/SearchPageContext'

import useSearchState from './useSearchState'

export const FETCH_TYPE = {
  NEXT: 'next',
  PREVIOUS: 'previous',
}

function reducer(state, action) {
  const { maxItemsPerPage, rollbackState } = action.args

  switch (action.type) {
    case 'RESET':
      return {
        page: 1,
        nextPage: 2,
        previousPage: 0,
        from: 0,
        to: maxItemsPerPage - 1,
      }

    case 'PERPAGE':
      return {

      }

    case 'ROLLBACK':
      return rollbackState

    default:
  }
}

const handleFetchMore = async (
  from,
  to,
  direction,
  fetchMoreLocked,
  setLoading,
  fetchMore,
  products,
  updateQueryError,
  fuzzy,
  operator,
  searchState
  // eslint-disable-next-line max-params
) => {
  if (fetchMoreLocked.current || products.length === 0) {
    return
  }
  const isForward = direction === FETCH_TYPE.NEXT
  fetchMoreLocked.current = true
  setLoading(true)

  return fetchMore({
    variables: {
      from,
      to,
      fuzzy,
      operator,
      searchState,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
      setLoading(false)
      fetchMoreLocked.current = false

      if (!products || !fetchMoreResult) {
        updateQueryError.current = true

        return
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      // backwards compatibility
      if (prevResult && prevResult.search) {
        return {
          search: {

            products: isForward
              ? [
                ...fetchMoreResult.search.products,
              ]
              : [
                ...fetchMoreResult.search.products,
              ],
          },
        }
      }

      return {
        ...fetchMoreResult,
        productSearch: {
          ...fetchMoreResult.productSearch,
          products: isForward
            ? [...fetchMoreResult.productSearch.products]
            : [...fetchMoreResult.productSearch.products,],
        },
      }
    },
  }).catch(error => {
    setLoading(false)
    fetchMoreLocked.current = false
    updateQueryError.current = true

    return { error }
  })
}

const useFetchingMore = () => {
  const [loading, localSetMore] = useState(false)
  const { isFetchingMore } = useSearchPageState()
  const dispatch = useSearchPageStateDispatch()
  const setFetchMore = useCallback(
    value => {
      dispatch({ type: 'SET_FETCHING_MORE', args: { isFetchingMore: value } })
      localSetMore(value)
    },
    [dispatch]
  )

  const stateValue = isFetchingMore == null ? loading : isFetchingMore

  return [stateValue, setFetchMore]
}

export const useFetchMore = props => {
  const {
    page,
    maxItemsPerPage,
    fetchMore,
    products,
    queryData: { query, map, orderBy, priceRange },
  } = props

  const { setQuery, query: runtimeQuery } = useRuntime()
  const { fuzzy, operator, searchState } = useSearchState()
  const currentPage = (runtimeQuery.page && Number(runtimeQuery.page)) || page
  const initialState = {
    page: currentPage,
    nextPage: currentPage + 1,
    previousPage: currentPage - 1,
    from: (page - 1) * maxItemsPerPage,
    to: currentPage * maxItemsPerPage - 1,
  }

  const [pageState, pageDispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useFetchingMore()
  const isFirstRender = useRef(true)
  const fetchMoreLocked = useRef(false) // prevents the user from sending two requests at once
  /* this is a temporary solution to deal with unexpected
  errors when the search result uses infinite scroll.
  This should be removed once infinite scrolling is removed */
  const [infiniteScrollError, setInfiniteScrollError] = useState(false)
  const updateQueryError = useRef(false) // TODO: refactor this ref
  useEffect(() => {
    if (!isFirstRender.current) {
      pageDispatch({ type: 'RESET', args: { maxItemsPerPage } })
    }

    isFirstRender.current = false
  }, [maxItemsPerPage, query, map, orderBy, priceRange])

  const handleFetchPerPage = async (currPage) => {
    const rollbackState = pageState
    const from = (currPage - 1) * maxItemsPerPage
    const to = currPage * maxItemsPerPage - 1
    const page = currPage
    const previousPage = currPage - 1
    const nextPage = currPage + 1
    const promiseResult = await handleFetchMore(
      from,
      to,
      FETCH_TYPE.PREVIOUS,
      fetchMoreLocked,
      setLoading,
      fetchMore,
      products,
      updateQueryError,
      fuzzy,
      operator,
      sessionStorage.getItem('searchState') ?? searchState
    )

    if (!promiseResult || !updateQueryError.current) {
      return
    }
    pageDispatch({ type: 'PERPAGE', args: { from, to, previousPage, page, nextPage, rollbackState } })
    setQuery(
      {
        page: pageState.page,
      },
      { replace: true, merge: true }
    )
  }

  return {
    handleFetchPerPage,
    loading,
    from: pageState.from,
    to: pageState.to,
    nextPage: pageState.nextPage,
    previousPage: pageState.previousPage,
    infiniteScrollError,
    page: pageState.page
  }
}
