import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellMapping = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  const value =
    (col?.cellTextMapping && col?.cellTextMapping[params.value]) || '---'

  return <div>{value}</div>
}

export default CellMapping
