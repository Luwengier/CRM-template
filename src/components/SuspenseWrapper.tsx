import { Suspense, ReactNode } from 'react'
import { alpha, styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import CircularProgress from '@mui/material/CircularProgress'

export const SuspenseWrapper = ({ component }: { component: ReactNode }) => {
  return <Suspense fallback={<div>loading...</div>}>{component}</Suspense>
}

export const PageSuspenseWrapper = ({
  component,
  isFlex,
}: {
  component: ReactNode
  isFlex?: boolean
}) => {
  return (
    <Suspense fallback={<LoadingPage isFlex={isFlex} />}>{component}</Suspense>
  )
}

export const IconSuspenseWrapper = ({
  component,
  height,
  width,
}: {
  component: ReactNode
  height?: number | string
  width?: number | string
}) => {
  return (
    <Suspense
      fallback={
        <Skeleton
          variant="circular"
          width={width || 24}
          height={height || 24}
        />
      }
    >
      {component}
    </Suspense>
  )
}

export const LoadingPage = styled(
  ({ isFlex, ...rest }: { isFlex?: boolean } & BoxProps) => (
    <Box {...rest}>
      <CircularProgress color="secondary" size="1rem" />
      Loading...
    </Box>
  )
)(({ theme, isFlex }) => ({
  ...(isFlex ? { flexGrow: 1 } : { minHeight: '100%' }),
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  color: theme.palette.gray['9e'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  flexGrow: 1,
  fontWeight: 700,
  letterSpacing: '0.2em',
  '.MuiCircularProgress-root': {
    marginRight: theme.spacing(2),
  },
}))
