import React from 'react'

import TerminalIcon from '@mui/icons-material/Terminal'

import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid'
import { GridRowModel, FullColDef } from 'types/gridCol'

const ActionScript = ({
  col,
  params,
  action,
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
  action?: ((params: GridRowParams) => void) | undefined
}) => {
  return (
    <GridActionsCellItem
      icon={<TerminalIcon />}
      label={col.actionType || ''}
      onClick={() => {
        action && action(params)
      }}
    />
  )
}

export default ActionScript
