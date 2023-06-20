import { lazy, Suspense, FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellTag = lazy(() => import('components/cell/CellTag'))
const CellSignal = lazy(() => import('components/cell/CellSignal'))
const CellLink = lazy(() => import('components/cell/CellLink'))
const CellObject = lazy(() => import('components/cell/CellObject'))
const CellBoolean = lazy(() => import('components/cell/CellBoolean'))
const CellDateTime = lazy(() => import('components/cell/CellDateTime'))
const CellMapping = lazy(() => import('components/cell/CellMapping'))
const CellSchedules = lazy(() => import('components/cell/CellSchedules'))
const CellEndAdornment = lazy(() => import('components/cell/CellEndAdornment'))
const NullComponent = () => null

const CELL_MAPPING: {
  [x: string]: FC<{
    col: FullColDef
    params: GridRenderCellParams<GridRowModel>
  }>
} = {
  tag: CellTag,
  link: CellLink,
  signal: CellSignal,
  object: CellObject,
  boolean: CellBoolean,
  mapping: CellMapping,
  dateTime: CellDateTime,
  schedules: CellSchedules,
  endAdornment: CellEndAdornment,
  '': NullComponent,
}

const CellTypePanel = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRenderCellParams<any, GridRowModel, any>
}) => {
  const Cell = CELL_MAPPING[col.cellType || '']

  return (
    <Suspense fallback={<CellSkeleton />}>
      <Cell col={col} params={params} />
    </Suspense>
  )
}

const CellSkeleton = () => (
  <Skeleton animation="wave" variant="rounded" width="100%" height="1.5rem" />
)

export default CellTypePanel
