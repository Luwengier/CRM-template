import React from 'react'
import { numberWithCommas } from 'features/table/utils'
import { GridRowParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

export const ActionInputText = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
}) => {
  return (
    <>
      {params.row[col.field]
        ? typeof params.row[col.field] === 'number'
          ? numberWithCommas(params.row[col.field])
          : params.row[col.field]
        : typeof params.row[col.field] === 'number'
        ? 0
        : '-'}
    </>
  )
}

export const ActionSelectText = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRowParams<GridRowModel>
}) => {
  const option =
    col.selectOptions &&
    col.selectOptions.find((i) => i.id === params.row[col.field])

  return <>{option ? option.name : ''}</>
}
