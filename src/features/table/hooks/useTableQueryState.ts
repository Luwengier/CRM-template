import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
} from 'react'
import qs from 'qs'
import { omit } from 'lodash-es'
import { GridRowModel, ParamsObj } from 'features/table/type'
import { useLocation, useNavigate } from 'react-router-dom'
import { GridColumnVisibilityModel } from '@mui/x-data-grid'

export interface TableStateProps {
  searchParams: ParamsObj
  setSearchParams: Dispatch<SetStateAction<ParamsObj>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  columnVisibilityModel: GridColumnVisibilityModel
  setColumnVisibilityModel: Dispatch<SetStateAction<GridColumnVisibilityModel>>
}

const getQueryStringObj = (queryString: string): qs.ParsedQs => {
  const result = qs.parse(queryString, { ignoreQueryPrefix: true, comma: true })
  return {
    ...omit(result, ['page', 'pageSize']),
    ...(result.page && Number(result.page) !== 0 && { page: result.page }),
    ...(result.pageSize &&
      Number(result.pageSize) !== 10 && { pageSize: result.pageSize }),
  }
}

const useTableQueryState = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const processedQueryStringObj = useMemo(
    () => getQueryStringObj(search),
    [search]
  )
  const [page, setPage] = useState(
    Number(processedQueryStringObj.page) - 1 || 0
  )
  const [pageSize, setPageSize] = useState(
    Number(processedQueryStringObj.pageSize) || 10
  )
  const [searchParams, setSearchParams] = useState<ParamsObj>(
    processedQueryStringObj as ParamsObj
  )
  const [selectionRows, setSelectionRows] = useState<GridRowModel[]>([])
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({})
  const [queryStringDraft, setQueryStringDraft] = useState<string>('')

  const syncState = useCallback(
    (result: qs.ParsedQs) => {
      setPage(Number(result.page) - 1 || 0)
      setPageSize(Number(result.pageSize) || 10)
      // const omitResult = omit(result, ['page', 'pageSize']) as ParamsObj
      setSearchParams(result)
    },
    [setPage, setPageSize, setSearchParams]
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

  const handlePageChange = (
    e: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0)
    setPageSize(Number(event.target.value))
  }

  return {
    searchParams,
    setSearchParams,
    page,
    setPage,
    pageSize,
    setPageSize,
    selectionRows,
    setSelectionRows,
    handlePageChange,
    handleRowsPerPageChange,
    columnVisibilityModel,
    setColumnVisibilityModel,
  }
}

export default useTableQueryState
