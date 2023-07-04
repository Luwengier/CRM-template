import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InfoCard from './InfoCard'

const Page = () => {
  return (
    <Box>
      <Typography variant="h3">Page</Typography>
      <Box display="flex" mt={2}>
        <InfoCard />
      </Box>
    </Box>
  )
}

export default Page
