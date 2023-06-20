import React, { Fragment } from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { FullColDef, GridRowModel } from 'types/gridCol'

const CellSchedules = ({
  col,
  params
}: {
  col: FullColDef
  params: GridRenderCellParams<GridRowModel>
}) => {
  return (
    <div className="schedules-wrapper">
      <div className="schedules">
        {params.value &&
          params.value.map(
            (schedule: { time: string; brightness: number }, index: number) => (
              <Fragment key={schedule.time + index}>
                <div className="schedule-span">
                  {schedule.time} - {schedule.brightness}%
                </div>
                {index < params.value.length - 1 && (
                  <span className="schedule-span__delete">{'>>'}</span>
                )}
              </Fragment>
            )
          )}
      </div>
    </div>
  )
}

export default CellSchedules
