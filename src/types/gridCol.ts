import {
  GridActionsColDef,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid'
import {
  GridBaseColDef,
  GridSingleSelectColDef,
} from '@mui/x-data-grid/internals'
import { ReactNode } from 'react'

export type GridColList = FullColDef[]
type GridColDef =
  | GridBaseColDef<GridRowModel>
  | (GridActionsColDef<GridRowModel> & GridSingleSelectColDef<GridRowModel>)

export interface FullColDef extends GridColDef {
  icon?: string | ReactNode
  colType?: ColType
  cellType?: CellType
  actionType?: ActionType
  filterOptions?: FilterOption[]
  selectOptions?: Option[]
  checkboxOptions?: string[]
  cellTextMapping?: Record<string, string>
  endAdornment?: string | ReactNode
  action?: (params: GridRowParams, currentValue?: string) => void
}

export interface GridRowModel extends GridValidRowModel {
  id: string | number
  status?: StatusType
}

interface CellFormat {
  mapping: string | number
  dateTime: number
  boolean: boolean
  object: Option
  tag: Option[]
  link: {
    path: string
    name: string
  }
  signal: {
    online: number
    offline: number
  }
  schedules: Record<string, string | number>[]
  endAdornment: string | ReactNode
  icon: string | ReactNode
}
export type CellType = keyof CellFormat
export type ColType = 'filter' | 'search' | 'singleSelect' | 'sort'
type StatusType = 'filling' | 'deploying' | 'done' | 'online' | 'offline'
type ActionType =
  | 'empty'
  | 'script'
  | 'input'
  | 'number-input'
  | 'input:text'
  | 'select'
  | 'select:text'
  | 'button'
  | 'switch'
  | 'checkbox'
  | 'checkbox:disabled'
  | 'icon-button'

export type Option = {
  id: number | string
  name: string
}

export type FilterOption = {
  label: string
  value: any
}

export type ParamsObj = {
  [x: string]: undefined | string | string[] | ParamsObj | ParamsObj[]
}
