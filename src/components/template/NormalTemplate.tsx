import { ReactNode, Suspense, lazy } from 'react'
import { useTheme, alpha } from '@mui/material'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import NotistackProvider from 'features/notification/components/NotistackProvider'

const NavBar = lazy(() => import('components/NavBar'))

const NormalTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="section"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Suspense fallback={<AppBarFallback />}>
        <NavBar />
      </Suspense>
      <Box
        component="section"
        position="relative"
        display="flex"
        minHeight={0}
        flexGrow={1}
      >
        <NotistackProvider>
          <Box
            component="main"
            flexGrow={1}
            overflow="overlay"
            bgcolor="gray.ff"
            // margin={1.5}
          >
            {children}
          </Box>
        </NotistackProvider>
      </Box>
    </Box>
  )
}

const AppBarFallback = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        ...theme.mixins.toolbar,
        px: 3.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: theme.fadeShadows[2],
        backgroundColor: alpha(theme.palette.primary.light, 0.2),
      }}
    >
      <Box
        display={{ xs: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="start"
        columnGap={2}
      >
        <Skeleton variant="rectangular" width="2rem" height="2rem" />

        <Skeleton variant="rectangular" width="8rem" height="2rem" />
      </Box>

      <Skeleton
        variant="rectangular"
        width="2rem"
        height="2rem"
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      />

      <Skeleton
        variant="rectangular"
        width="8rem"
        height="2rem"
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      />

      <Skeleton
        variant="rounded"
        height="2rem"
        sx={{
          width: { xs: '2rem', md: '9rem' },
        }}
      />
    </Box>
  )
}

export default NormalTemplate
