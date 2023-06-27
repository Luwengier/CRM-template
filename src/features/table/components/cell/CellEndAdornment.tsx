import React from 'react'

import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

const CellEndAdornment = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  const endAdornment = col?.endAdornment || ''
  const value = params.value || ''
  return (
    <>
      {value}
      {endAdornment}
    </>
  )
}
export default CellEndAdornment
