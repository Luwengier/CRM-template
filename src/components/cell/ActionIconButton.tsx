import React from 'react'
import IconButton from '@mui/material/IconButton'

import { GridRowParams } from '@mui/x-data-grid'
import { GridRowModel, FullColDef } from 'types/gridCol'
import { styled } from '@mui/material'

const UnstyledActionIconButton = ({
  col,
  params,
  action,
  ...rest
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
  action?: ((params: GridRowParams) => void) | undefined
}) => {
  const handleClick = () => {
    col.action && col.action(params)
    action && action(params)
  }
  const icon = col.icon || ''

  return (
    <IconButton className="action-cell-btn" onClick={handleClick} {...rest}>
      {icon}
    </IconButton>
  )
}

const ActionIconButton = styled(UnstyledActionIconButton)(({ theme }) => ({
  '.MuiDataGrid-actionsCell': {
    justifyContent: 'center'
  }
}))

export default ActionIconButton
