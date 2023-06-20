import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellObject = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return <p>{params.value?.name || '-'}</p>
}
export default CellObject
