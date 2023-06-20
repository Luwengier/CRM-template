import React from 'react'
import { styled, alpha } from '@mui/material'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { GridRowParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  flexWrap: 'nowrap',
  '.MuiFormControlLabel-root .MuiTypography-root.MuiFormControlLabel-label': {
    ...theme.typography.body2,
    color: theme.palette.gray[42]
  },
  '.Mui-disabled .Mui-checked .MuiSvgIcon-root': {
    color: alpha(theme.palette.primary.main, 0.4)
  }
}))

const ActionCheckbox = ({
  col,
  params,
  type,
  action
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
  type?: string
  action?: (params: GridRowParams, curVal: string) => void
}) => {
  // Handler
  const handleCheckboxChange = (curVal: string) => () => {
    action && action(params, curVal)
    col.action && col.action(params, curVal)
  }

  // Variable
  const options = col.checkboxOptions || []
  const checkedMapping: Record<string, boolean> = params.row[col.field] || {}

  // Render function
  const checkboxes = options.map((i) => (
    <FormControlLabel
      key={i}
      label={i}
      disabled={type === 'disabled'}
      control={
        <Checkbox
          checked={Boolean(checkedMapping[i])}
          onChange={handleCheckboxChange(i)}
        />
      }
    />
  ))

  return (
    <StyledFormGroup row className="checkboxes">
      {checkboxes}
    </StyledFormGroup>
  )
}

export default ActionCheckbox
