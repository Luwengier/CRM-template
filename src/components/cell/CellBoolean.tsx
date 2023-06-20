import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellBoolean = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return Boolean(params.value) ? <p>是</p> : <p>否</p>
}
export default CellBoolean
