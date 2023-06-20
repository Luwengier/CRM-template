import React from 'react'
import { Link } from 'react-router-dom'

import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellLink = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return (
    <Link to={params.value?.path || '.'}>{params.value?.name || 'link'}</Link>
  )
}
export default CellLink
