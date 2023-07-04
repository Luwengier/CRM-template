import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ErrorFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h3">Oops...</Typography>
      <Typography variant="h4">Something went wrong</Typography>
    </Box>
  )
}

export default ErrorFallback
