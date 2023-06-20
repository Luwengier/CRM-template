import { FC } from 'react'
import Tag from 'features/table/components/Tag'
import { ChipProps } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

export const TAG_MAPPING: { [x: string]: FC<ChipProps> } = {
  normal: (props) => <Tag color="secondary" variant="outlined" {...props} />,
  none: (props) => <Tag className="none" {...props} />,
  filling: (props) => <Tag color="default" label="Filling" {...props} />,
  deploying: (props) => <Tag color="warning" label="Deploying" {...props} />,
  done: (props) => <Tag color="success" label="Done" {...props} />,
  online: (props) => <Tag color="success" label="Online" {...props} />,
  offline: (props) => <Tag color="error" label="Offline" {...props} />,
  active: (props) => <Tag className="active" label="Active" {...props} />,
  inactive: (props) => <Tag className="inactive" label="Inactive" {...props} />,
  alert: (props) => <Tag className="alert" label="Alert" {...props} />,
  abnormal: (props) => <Tag className="abnormal" label="Abnormal" {...props} />,
  success: () => <CheckIcon color="success" />,
  fail: () => <CloseIcon color="error" />,
}
