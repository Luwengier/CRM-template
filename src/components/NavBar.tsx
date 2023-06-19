import { lazy, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { alpha, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import FlareIcon from '@mui/icons-material/Flare'
import LogoutIcon from '@mui/icons-material/Logout'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

import MenuButton from './MenuButton'
import ColorModeContext from 'contexts/ColorModeContext'

const SideBar = lazy(() => import('./SideBar'))

const NavBar = () => {
  const navigate = useNavigate()
  const colorMode = useContext(ColorModeContext)
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev)
  }

  const handleSignOut = () => {
    navigate('/sign-out')
  }

  const theme = useTheme()
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: alpha(theme.palette.primary.light, 0.2),
        boxShadow: theme.fadeShadows[2],
        '.MuiToolbar-root ': {
          px: 2.5,
          columnGap: '0.5rem',
          justifyContent: { xs: 'space-between', md: 'flex-start' },
        },
        '.home-link': {
          textDecoration: 'none',
          color: theme.palette.gray[42],
          display: 'flex',
          alignItems: 'center',
          columnGap: '0.5rem',
        },
      }}
    >
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* Drawer */}
          <SideBar
            open={open}
            onClose={() => setOpen(false)}
            variant="persistent"
          />
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Link className="home-link" to="/">
            <FlareIcon color="secondary" />
            <Typography variant="h5" noWrap>
              Fog Light
            </Typography>
          </Link>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          columnGap={2}
          sx={{
            flexGrow: 0,
            '.account-name': { display: { xs: 'none', md: 'flex' } },
          }}
        >
          <Box className="dark-mode-btn">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Box>
          <MenuButton
            options={[
              {
                label: 'Sign Out',
                icon: <LogoutIcon />,
                action: handleSignOut,
              },
            ]}
          >
            <Box display="flex" columnGap={1} alignItems="center">
              <Avatar
                sx={{
                  '&.MuiAvatar-root': {
                    bgcolor: 'primary.light',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    width: '2rem',
                    height: '2rem',
                  },
                }}
              >
                CT
              </Avatar>
              <Typography className="account-name">Cloud Team</Typography>
            </Box>
          </MenuButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
