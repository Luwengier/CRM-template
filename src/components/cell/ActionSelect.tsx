import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { Option } from 'types/gridCol'
import { GridRowParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const ActionSelect = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
}) => {
  const value = params.row[col.field]

  const handleChange = (e: SelectChangeEvent, params: GridRowParams) => {
    col.action && col.action(params, e.target.value)
  }

  const renderOptions = (options: Option[]) => {
    return options.map((option, index) => (
      <MenuItem key={index} value={option.id}>
        {option.name}
      </MenuItem>
    ))
  }

  return (
    <div className="cell-input">
      <Select
        size="small"
        value={value}
        onChange={(e) => handleChange(e, params)}
      >
        {renderOptions(col.selectOptions || [])}
      </Select>
    </div>
  )
}

export default ActionSelect
