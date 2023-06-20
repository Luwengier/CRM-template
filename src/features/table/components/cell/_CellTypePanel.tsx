import { lazy, Suspense, FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

const CellTag = lazy(() => import('features/table/components/cell/CellTag'))
const CellSignal = lazy(
  () => import('features/table/components/cell/CellSignal')
)
const CellLink = lazy(() => import('features/table/components/cell/CellLink'))
const CellObject = lazy(
  () => import('features/table/components/cell/CellObject')
)
const CellBoolean = lazy(
  () => import('features/table/components/cell/CellBoolean')
)
const CellDateTime = lazy(
  () => import('features/table/components/cell/CellDateTime')
)
const CellMapping = lazy(
  () => import('features/table/components/cell/CellMapping')
)
const CellSchedules = lazy(
  () => import('features/table/components/cell/CellSchedules')
)
const CellEndAdornment = lazy(
  () => import('features/table/components/cell/CellEndAdornment')
)
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
