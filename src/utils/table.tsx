import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react'

import Typography from '@mui/material/Typography'
import IconButtonPanel from 'components/cell/IconButtonPanel'
import CellActionPanel from 'components/cell/_CellActionPanel'
import CellTypePanel from 'components/cell/_CellTypePanel'

import {
  GridRowParams,
  GridRenderCellParams,
  GridColumnHeaderParams,
} from '@mui/x-data-grid'
import { GridColList, GridRowModel, FullColDef } from 'types/gridCol'

export const orderOptions = ['desc', 'asc']

// 切換每頁顯示列數，將頁數切回第一頁
export const handleRowsPerPageChange =
  (
    setPage: Dispatch<SetStateAction<number>>,
    setPageSize: Dispatch<SetStateAction<number>>
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setPageSize(Number(event.target.value))
  }

/* 
預處理表格欄位資料：
使傳入前的 columns(cols) 中的每個 col 物件的值，只有 string, number, boolean 或由他們組成的陣列或物件 (例如 field、headerName、width、colType、cellType)，而不會有 function (例如 renderHeader、renderCell、getActions) 方便 API 儲存資料。
而在這邊將 Component 內部有 state、setState 的 function 藉由 參數(action、handleIconClick) 傳入 getProcessCols，並在 columns(cols) 中的每個 col 物件插入 renderHeader、renderCell、getActions 等 function。
*/
export const getProcessCols = (
  cols: GridColList | null,
  action?: undefined | ((params: GridRowParams) => void),
  handleIconClick?:
    | undefined
    | ((event: MouseEvent<HTMLButtonElement>, col: FullColDef) => void),
  sortPairs?: [string | undefined, string | undefined][]
): GridColList => {
  return (
    cols?.map((col: FullColDef) => {
      return {
        ...col,

        // 取消表格 Header 上預設 sort、menu 按鈕
        ...{ sortable: false, disableColumnMenu: true },

        // 表格 Header 欄位上的 filter、search、sort 按鈕
        ...{
          renderHeader: col.colType
            ? (params: GridColumnHeaderParams<GridRowModel>) => (
                <>
                  {params.colDef.headerName}
                  <IconButtonPanel
                    col={col}
                    sortPairs={sortPairs}
                    handleIconClick={(event, col) => {
                      handleIconClick && handleIconClick(event, col)
                    }}
                  />
                </>
              )
            : undefined,
        },

        // 表格 Row 欄位上的 action 按鈕
        ...(col.actionType && {
          type: 'actions',
          getActions: (params: GridRowParams<GridRowModel>) => [
            <CellActionPanel col={col} params={params} action={action} />,
          ],
          headerAlign: 'left',
          align: 'left',
        }),

        // 表格 Row 欄位上的特殊格式 (tags, link, status...)
        ...(!col.actionType && {
          renderCell: (
            params: GridRenderCellParams<any, GridRowModel, any>
          ) => {
            // 特殊格式
            if (col.cellType) return <CellTypePanel col={col} params={params} />
            // 預設格式
            const cellValue =
              typeof params.value === 'string'
                ? params.value
                : typeof params.value === 'number'
                ? numberWithCommas(params.value)
                : params.value?.name || '-'

            return (
              <Typography variant="chip" noWrap title={cellValue}>
                {cellValue}
              </Typography>
            )
          },
        }),
      }
    }) || []
  )
}

// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}
