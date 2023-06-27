import React from 'react'
import dayjs from 'dayjs'

import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

const CellDateTime = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return <p>{dayjs(params.value).format('YYYY-MM-DD HH:mm') || '-'}</p>
}

export default CellDateTime
