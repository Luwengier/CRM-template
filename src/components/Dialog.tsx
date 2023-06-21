import { useState, ReactNode, FC, forwardRef } from 'react'

import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import MuiDialog, { DialogProps } from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface Props
  extends Omit<DialogProps, 'open' | 'onClose' | 'title' | 'children'> {
  title: ReactNode
  label: string
  children?: ReactNode | ((handleClose: () => void) => ReactNode)
  footer?: ReactNode | ((handleClose: () => void) => ReactNode)
  ButtonProps?: ButtonProps
}

const Dialog: FC<Props> = forwardRef(
  ({ title, label, children, footer, ButtonProps, ...rest }, ref) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <Box display="flex" ref={ref}>
        <Button variant="contained" onClick={handleClickOpen} {...ButtonProps}>
          {label}
        </Button>
        <MuiDialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          {...rest}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: (theme) => theme.palette.gray.ff,
              boxShadow: (theme) => `0 0 12px ${theme.palette.gray.e0}`,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              {title}
            </Typography>

            <IconButton size="small" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {typeof children === 'function' ? children(handleClose) : children}

          {typeof footer === 'function'
            ? footer(handleClose)
            : footer || (
                <Box
                  sx={{
                    p: 2,
                    columnGap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button variant="outlined" onClick={handleClose}>
                    關閉
                  </Button>
                </Box>
              )}
        </MuiDialog>
      </Box>
    )
  }
)

export default Dialog
