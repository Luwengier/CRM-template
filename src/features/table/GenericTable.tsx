import {
  memo,
  useState,
  useMemo,
  Dispatch,
  MouseEvent,
  SetStateAction,
  ChangeEventHandler,
  FC,
} from 'react'
import { keyBy, difference, unzip, zip } from 'lodash-es'
import { useTheme, styled, alpha } from '@mui/material/styles'
import { getProcessCols, orderOptions } from './utils'

import TablePagination from '@mui/material/TablePagination'
import SearchPopover from './components/popover/SearchPopover'
import FilterPopover from './components/popover/FilterPopover'

import { GridRowModel, FullColDef, GridColList, ParamsObj } from './type'
import {
  DataGrid,
  DataGridProps,
  GridRowParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid'

// Component
const Table: FC<TableProps> = ({
  rowData,
  columns,
  // Selection
  selectionRows,
  setSelectionRows,
  // Filter and Sort
  searchParams,
  setSearchParams,
  // Pagination
  page,
  count,
  pageSize,
  setPage,
  setPageSize,
  handlePageChange,
  handleRowsPerPageChange,

  action,
  ...rest
}: TableProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
  const [currentCol, setCurrentCol] = useState<null | FullColDef>(null)
  const paginationRowCount = count || rowData.length || 0
  // const [paginationModel, setPaginationModel] = useState({
  //   pageSize,
  //   page: paginationRowCount <= 0 ? 0 : page!
  // })

  const paginationModel = useMemo(() => {
    return {
      pageSize: pageSize || 10,
      page: paginationRowCount <= 0 ? 0 : page!,
    }
  }, [page, pageSize, paginationRowCount])

  const sortPairs = useMemo(() => {
    if (
      !searchParams ||
      !searchParams._sort ||
      !searchParams._order ||
      // typeof searchParams._sort !== 'string' ||
      // typeof searchParams._order !== 'string'
      !Array.isArray(searchParams._sort) ||
      !Array.isArray(searchParams._order)
    )
      return []
    const sortArr = searchParams._sort as Array<ParamsObj | string>
    // .split(',')
    const orderArr = searchParams._order as Array<ParamsObj | string>
    // .split(',')
    if (sortArr.length !== orderArr.length) return []
    if (
      sortArr.every((sort) => typeof sort !== 'string') ||
      orderArr.every((order) => typeof order !== 'string')
    )
      return []
    return zip(sortArr, orderArr) as [string, string][]
  }, [searchParams])

  // 當 column header 上的 iconButton 被點擊時，打開對應的 Popover
  // 由 Popover 本身用其收到的 props 決定是否開啟或有哪些 function 能用
  const handleIconClick = (
    event: MouseEvent<HTMLButtonElement>,
    col: FullColDef
  ) => {
    if (!col.colType) return
    if (col.colType === 'sort' && setSearchParams && searchParams) {
      handleSortClick(col)
      const unZipSortPair = unzip<string>(sortPairs)
      const sort = unZipSortPair[0]
      // .join(',')
      const order = unZipSortPair[1]
      // .join(',')
      setSearchParams((prev) => {
        return { ...prev, _sort: sort, _order: order }
      })
    }
    setCurrentCol(col)
    setAnchorEl(event.currentTarget)
  }

  // 要 getProcessCols 的目的可以看它來源上方的註解
  const processCols = getProcessCols(
    columns,
    action,
    handleIconClick,
    sortPairs
  )

  const carouselValue = (target: string | undefined) => {
    let count = orderOptions.findIndex((item: string) => item === target)
    if (count < 0) return 'desc'
    count++
    if (count >= orderOptions.length) count = 0
    return orderOptions[count]
  }

  const handleSortClick = (col: FullColDef) => {
    const targetIndex = sortPairs.findIndex((item) => item[0] === col.field)
    if (targetIndex >= 0) {
      sortPairs[targetIndex][1] = carouselValue(sortPairs[targetIndex][1])
      // sortPairs[targetIndex][1] === 'desc' ? 'asc' : 'desc'
      return
    }
    sortPairs.push([col.field, 'desc'])
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  // 表格 checkbox 點擊時 selectionRows 的處理
  const handleSelectionModelChange = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    if (!selectionRows || !setSelectionRows) return

    if (newSelectionModel.length >= selectionModel.length) {
      const newRowIds = difference(newSelectionModel, selectionModel)
      setSelectionRows((prev) => [
        ...prev,
        ...newRowIds.map((id) => rowDataMapping[id]),
      ])
    } else {
      const filteredIds = difference(selectionModel, newSelectionModel)
      setSelectionRows((prev) =>
        prev.filter((item) => !(item.id && filteredIds.includes(item.id)))
      )
    }
  }

  // 表格 checkbox 點擊時，目前分頁每橫列的 id 與 其詳細資料 的對照表
  const rowDataMapping = useMemo(() => {
    return keyBy(rowData, 'id')
  }, [rowData])

  // 使 selectionModel 與 selectionRows 對應
  const selectionModel = useMemo(() => {
    return selectionRows?.map((row) => row.id) || []
  }, [selectionRows])

  return (
    <>
      {/* Table */}
      <StyledDataGrid
        rows={rowData}
        columns={processCols}
        autoHeight
        hideFooter
        paginationModel={paginationModel}
        // onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        keepNonExistentRowsSelected
        {...(selectionRows &&
          setSelectionRows && {
            checkboxSelection: true,
            rowSelectionModel: selectionModel,
            onRowSelectionModelChange: handleSelectionModelChange,
          })}
        {...rest}
      />

      {/* Pagination */}
      {handlePageChange && (
        <TablePagination
          component="div"
          rowsPerPage={pageSize!}
          count={paginationRowCount}
          page={paginationRowCount <= 0 ? 0 : page!}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          sx={{
            marginTop: theme.spacing(1.375),
            overflow: 'visible',
          }}
        />
      )}

      {/* Popover */}
      {searchParams && setSearchParams && currentCol && (
        <>
          <SearchPopover
            anchorEl={anchorEl}
            col={currentCol}
            handleClose={handlePopoverClose}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setPage={setPage}
            disablePortal
          />

          <FilterPopover
            anchorEl={anchorEl}
            col={currentCol}
            handleClose={handlePopoverClose}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            disablePortal
          />
        </>
      )}
    </>
  )
}

// Style
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-main': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.gray.ff
        : theme.palette.gray.fa,
  },
  '.MuiDataGrid-columnHeaders': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.gray.fa
        : theme.palette.gray.f5,
  },
  '.MuiDataGrid-overlay': {
    color: theme.palette.gray['9e'],
  },
  '.MuiSkeleton-root': {
    backgroundColor: theme.palette.gray.f5,
  },
  '.MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeaderCheckbox)':
    {
      padding: theme.spacing(0, 2),
    },
  '.MuiDataGrid-columnHeaderTitleContainerContent, .MuiDataGrid-columnHeaderTitle':
    {
      color: theme.palette.gray[61],
      fontWeight: 700,
    },
  '.MuiDataGrid-iconSeparator': {
    visibility: 'hidden',
  },
  '.MuiDataGrid-row .MuiDataGrid-cell:not(.MuiDataGrid-cellCheckbox)': {
    padding: theme.spacing(0, 2),
  },
  '.MuiDataGrid-cell .tags': {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minWidth: 0,
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(0.75),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    overflow: 'overlay',
  },
  '.MuiDataGrid-row:not(:hover) .tags::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
  // '.MuiDataGrid-cell .action': {
  //   flex: 1,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   flexWrap: 'wrap',
  //   padding: theme.spacing(2, 0)
  // },
  '.MuiDataGrid-cell .cell-input': {
    margin: theme.spacing(0, -2),
    padding: theme.spacing(0.75),
    flex: 1,
  },
  '.MuiDataGrid-cell .MuiDataGrid-actionsCell': {
    width: '100%',
  },
  '.MuiDataGrid-cell .MuiOutlinedInput-root': {
    width: '100%',
  },
  '.MuiDataGrid-cell .action-cell-btn': {
    maxWidth: '9rem',
  },
  '.MuiDataGrid-cell .status': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing(0.25),
    '.MuiSvgIcon-root': {
      width: '0.75rem',
    },
  },
  '.MuiDataGrid-cell .MuiButton-root': {
    // fontSize: theme.typography.chip.fontSize
  },
  '.action-icon': {
    fontSize: '1rem',
  },
  '.MuiDataGrid-cell .schedules-wrapper': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    overflowX: 'overlay',
  },
  '.MuiDataGrid-cell .schedules': {
    display: 'flex',
    columnGap: theme.spacing(0.5),
  },
  '.MuiDataGrid-cell .schedules .schedule-span': {
    display: 'flex',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
  '.MuiDataGrid-row:not(:hover) .schedules-wrapper::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
})) as typeof DataGrid

// Type
interface TableProps extends Omit<DataGridProps, 'rows' | 'columns'> {
  page?: number
  pageSize?: number
  rowData: GridRowModel[]
  columns: GridColList | null
  searchParams?: ParamsObj
  selectionRows?: GridRowModel[]
  count?: number
  handleRowsPerPageChange?: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >
  handlePageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void
  setPage?: Dispatch<SetStateAction<number>>
  setPageSize?: Dispatch<SetStateAction<number>>
  setSearchParams?: Dispatch<SetStateAction<ParamsObj>>
  setSelectionRows?: Dispatch<SetStateAction<GridRowModel[]>>
  action?: (params: GridRowParams, curVal?: string) => void
}

export default memo(Table)
