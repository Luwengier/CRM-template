import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

import { SIGNAL_MAPPING } from 'constants/signalMapping'

const CellSignal = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return (
    <div className="status">
      {SIGNAL_MAPPING.online({ name: params.value?.online })}
      {SIGNAL_MAPPING.offline({ name: params.value?.offline })}
    </div>
  )
}

export default CellSignal
