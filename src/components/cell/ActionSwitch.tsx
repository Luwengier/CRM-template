import React from 'react'
import { styled } from '@mui/material/styles'

import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'

import { GridRowParams } from '@mui/x-data-grid'
import { GridRowModel, FullColDef } from 'types/gridCol'

const ActionSwitch = ({
  col,
  params,
  action
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
  action?: ((params: GridRowParams) => void) | undefined
}) => {
  return (
    <Tooltip
      title={params.row.isUsed ? '此係數使用中，於專案中移除後即可禁用' : ''}
      placement="left"
      arrow
    >
      <span>
        <StyledSwitch
          checked={params.row[col.field]}
          onChange={() => {
            action && action(params)
          }}
          disabled={params.row.isUsed}
          inputProps={{ 'aria-label': 'switch' }}
          className="switch"
        />
      </span>
    </Tooltip>
  )
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { opacity: 1 },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.gray.ff,
    borderRadius: 22 / 2,
    border: `1px solid ${theme.palette.gray[61]}`,
    opacity: 1
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.gray[61],
    boxShadow: 'none',
    width: 12,
    height: 12,
    margin: 4
  },
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: theme.palette.gray.ff
  }
}))

export default ActionSwitch
