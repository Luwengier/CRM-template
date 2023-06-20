import { forwardRef } from 'react'
import { styled, Theme } from '@mui/material/styles'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'

import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { CustomContentProps, closeSnackbar } from 'notistack'

// Type
interface ActionItem {
  label: string
  action: () => void
}

interface NotifyAlertProps extends CustomContentProps {
  actions?: ActionItem[]
}
interface AlertProps extends MuiAlertProps {
  handleClose?: () => void
  enableCloseBtn?: boolean
  actions?: ActionItem[]
}

// Component
// Notistack 專用 Alert
export const NotifyAlert = forwardRef<HTMLDivElement, NotifyAlertProps>(
  (props, ref) => {
    const { id, message, actions, variant, style } = props

    return (
      <Alert
        ref={ref}
        style={style}
        severity={variant === 'default' ? undefined : variant}
        handleClose={() => closeSnackbar(id)}
        actions={actions}
        enableCloseBtn
      >
        {message}
      </Alert>
    )
  }
)

// 通用 Alert
export const UnstyledAlert = forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const { handleClose, enableCloseBtn, severity, actions, ...rest } = props

    const renderActions = (actions: ActionItem[]) =>
      actions.map((item) => (
        <Button size="small" onClick={item.action} key={item.label}>
          {item.label}
        </Button>
      ))

    return (
      <MuiAlert
        ref={ref}
        severity={severity}
        iconMapping={{
          error: <HighlightOffIcon fontSize="inherit" />,
          warning: <ErrorOutlineIcon fontSize="inherit" />,
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
        {...(!severity && { icon: <InfoOutlinedIcon fontSize="inherit" /> })}
        action={
          <>
            {renderActions(actions || [])}
            {enableCloseBtn && (
              <IconButton
                size="small"
                onClick={() => {
                  handleClose && handleClose()
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </>
        }
        {...rest}
      />
    )
  }
)

// Style
const Alert = styled(
  forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <UnstyledAlert ref={ref} {...props} />
  ))
)(({ theme, severity }) => ({
  backgroundColor: getBgColor(theme, severity),

  boxShadow: theme.fadeShadows[2],
  color: theme.palette.gray[42],
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(1.5),
  ...theme.typography.body2,

  '.MuiAlert-icon': {
    color: getIconColor(theme, severity),

    marginRight: theme.spacing(1),
    paddingBottom: '0.55rem',
    paddingTop: '0.55rem',
    fontSize: '1rem',
  },

  '.MuiAlert-message': {
    maxHeight: `calc(3rem + ${theme.spacing(2)})`,
    maxWidth: 350,
  },

  '.MuiAlert-action': {
    paddingLeft: theme.spacing(2.5),
    paddingTop: 0,
    alignItems: 'center',

    '.MuiButton-text': {
      marginRight: theme.spacing(1.75),
      textTransform: 'none',
      fontSize: '0.875rem',
      fontWeight: 700,
    },
  },
}))

const getBgColor = (theme: Theme, severity: string | undefined) => {
  switch (severity) {
    case 'error':
      return theme.palette.error.light
    case 'warning':
      return theme.palette.warning.light
    case 'success':
      return theme.palette.success.light
    case 'info':
      return theme.palette.info.light
    default:
      return theme.palette.gray.f5
  }
}

const getIconColor = (theme: Theme, severity: string | undefined) => {
  switch (severity) {
    case 'error':
      return theme.palette.error.dark
    case 'warning':
      return theme.palette.warning.dark
    case 'success':
      return theme.palette.success.dark
    case 'info':
      return theme.palette.info.dark
    default:
      return theme.palette.gray[61]
  }
}

export default Alert
// Reference: https://notistack.com/features/customization
