import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'features/table/type'

import { TAG_MAPPING } from 'constants/tagMapping'

const CellTag = ({
  col,
  params,
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  if (Array.isArray(params.value)) {
    return (
      <div className="tags">
        {params.value &&
          params.value.map((tag: Record<string, string | number>) =>
            renderTag(String(tag.name))
          )}
      </div>
    )
  }
  return TAG_MAPPING[params.value || params.value.type || 'none']({
    label: params.value.name,
    title: params.value.name,
  })
}

const renderTag = (name: string) => {
  const Tag = TAG_MAPPING['normal']
  return <Tag key={name} label={name} title={name} />
}

export default CellTag
