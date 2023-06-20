import { FC } from 'react'
import { SvgIconProps, Typography } from '@mui/material'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export const SIGNAL_MAPPING: { [x: string]: FC<SvgIconProps> } = {
  online: (props) => <Signal color="success" {...props} />,
  offline: (props) => <Signal color="error" {...props} />,
}

const Signal = ({ name, color }: SvgIconProps<'svg', {}>) => (
  <>
    <FiberManualRecordIcon color={color} />
    <Typography variant="body2">{name}</Typography>
  </>
)
