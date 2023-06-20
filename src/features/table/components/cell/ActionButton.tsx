import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { GridRowParams } from '@mui/x-data-grid'
import { GridRowModel, FullColDef } from 'features/table/type'
import { styled } from '@mui/material'

const UnstyledActionButton = ({
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

  return (
    <Button className="action-cell-btn" onClick={handleClick} {...rest}>
      <Typography
        variant="chip"
        title={params.row[col.field]}
        color={'primary.main'}
        fontWeight={500}
        noWrap
      >
        {params.row[col.field]}
      </Typography>
    </Button>
  )
}

const ActionButton = styled(UnstyledActionButton)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    marginLeft: theme.spacing(-1.5),
  },
}))

export default ActionButton
