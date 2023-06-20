import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import qs from 'qs'
import { omit } from 'lodash-es'
import { ParamsObj } from 'features/table/type'
import { useLocation, useNavigate } from 'react-router-dom'

export const getQueryStringObj = (queryString: string) => {
  const result = qs.parse(queryString, { ignoreQueryPrefix: true, comma: true })
  return {
    ...omit(result, ['page', 'pageSize']),
    ...(result.page && Number(result.page) !== 0 && { page: result.page }),
    ...(result.pageSize &&
      Number(result.pageSize) !== 10 && { pageSize: result.pageSize }),
  }
}

// 使用時可以先使用上方 getQueryStringObj 傳入 useLocation 的 search,
// 作為要傳入的 searchParams state 初始值比較好
const useQueryString = (
  searchParams: ParamsObj,
  setSearchParams: Dispatch<SetStateAction<ParamsObj>>,
  page?: number,
  setPage?: Dispatch<SetStateAction<number>>,
  pageSize?: number,
  setPageSize?: Dispatch<SetStateAction<number>>
) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [queryStringDraft, setQueryStringDraft] = useState<string>('')

  const syncState = useCallback(
    (result: qs.ParsedQs) => {
      setPage && setPage(Number(result.page) - 1 || 0)
      setPageSize && setPageSize(Number(result.pageSize) || 10)
      // const omitResult = omit(result, ['page', 'pageSize']) as ParamsObj
      setSearchParams(result)
    },
    [setPage, setPageSize, setSearchParams]
  )

  const processedQueryStringObj = useMemo(
    () => getQueryStringObj(search),
    [search]
  )

  useEffect(() => {
    const processedQueryString = qs.stringify(processedQueryStringObj, {
      encode: false,
      arrayFormat: 'comma',
    })
    const stateUrl = qs.stringify(
      {
        ...omit(searchParams, ['page', 'pageSize']),
        ...(page && page !== 0 && { page: page + 1 }),
        ...(pageSize && pageSize !== 10 && { pageSize: pageSize }),
      },
      { encode: false, arrayFormat: 'comma' }
    )
    if (processedQueryString !== stateUrl) {
      if (stateUrl !== queryStringDraft) navigate(`?${stateUrl}`)
      if (processedQueryString !== queryStringDraft)
        syncState(processedQueryStringObj)
      return
    }
    setQueryStringDraft(processedQueryString)
  }, [
    navigate,
    page,
    pageSize,
    processedQueryStringObj,
    queryStringDraft,
    searchParams,
    syncState,
  ])
}

export default useQueryString
