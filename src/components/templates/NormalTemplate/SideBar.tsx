import { FC, memo } from 'react'
import { CSSObject, Theme, alpha, useTheme } from '@mui/material'
import { routeConfig } from 'Router'

import Box from '@mui/material/Box'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuList from './MenuList'

import CloseIcon from '@mui/icons-material/Close'

interface SideBarProps extends DrawerProps {
  open: boolean
  onClose?: () => void
}

const SideBar: FC<SideBarProps> = ({ open, onClose, ...rest }) => {
  const theme = useTheme()
  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        '.MuiDrawer-paper': {
          // bgcolor: theme.palette.gray.f5
          bgcolor: theme.palette.primary.light3,
          borderColor: theme.palette.primary.light2,
        },

        '.MuiListItem-root': {
          display: 'block',
        },
        '.MuiListItemText-root': {
          textDecoration: 'none',
        },
        '.MuiListItemButton-root': {
          paddingRight: theme.spacing(open ? 2 : 3.5),
          paddingLeft: theme.spacing(3.5),
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
          minHeight: 56,
          justifyContent: open ? 'initial' : 'flex-start',
        },
        ...itemMixin(theme),
      }}
      {...rest}
    >
      <Box
        minWidth="16rem"
        minHeight="4rem"
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">Your App</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <MenuList open={open} routeConfig={routeConfig} handleClose={onClose} />
    </Drawer>
  )
}

const itemMixin = (theme: Theme): CSSObject => ({
  a: {
    color: '#333333',
    textDecoration: 'none',
    width: '100%',
  },
  '.MuiListItem-root a.active > div': {
    backgroundColor: theme.palette.primary.light4,
    boxShadow: `inset 5px 0px 0px ${theme.palette.primary.dark}`,
  },
  '.MuiListItem-root.exact': {
    backgroundColor: alpha(
      theme.palette.primary.light2 || theme.palette.background.paper,
      0.4
    ),
  },
  '.MuiListItem-root.partial': {
    backgroundColor: alpha(
      theme.palette.primary.light2 || theme.palette.background.paper,
      0.8
    ),
  },
  '.MuiSvgIcon-root': {
    transition: theme.transitions.create('transform'),
    '&.verse': {
      transform: 'rotateZ(180deg)',
    },
  },
})

export default memo(SideBar)
