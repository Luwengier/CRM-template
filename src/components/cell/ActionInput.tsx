import React, { ChangeEvent, useCallback } from 'react'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'

import { GridRowParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

interface Props extends OutlinedInputProps {
  col: FullColDef
  params: GridRowParams<GridRowModel>
}

const ActionInput = ({ col, params, ...rest }: Props) => {
  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      params: GridRowParams
    ) => {
      col.action && col.action(params, e.target.value)
    },
    [col]
  )

  return (
    <div className="cell-input">
      <OutlinedInput
        size="small"
        value={params.row[col.field]}
        onChange={(e) => handleChange(e, params)}
        onKeyDown={(e) => e.stopPropagation()}
        {...rest}
      />
    </div>
  )
}

export default ActionInput
