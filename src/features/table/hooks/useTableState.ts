import { useState, MouseEvent, ChangeEvent } from 'react'
import { GridRowModel, ParamsObj } from 'features/table/type'
import { GridColumnVisibilityModel } from '@mui/x-data-grid'

const useTableState = () => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams, setSearchParams] = useState<ParamsObj>({})
  const [selectionRows, setSelectionRows] = useState<GridRowModel[]>([])
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({})

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

export default useTableState
