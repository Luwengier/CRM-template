import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NotFound = () => {
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
      <Typography variant="h3">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
    </Box>
  )
}

export default NotFound
