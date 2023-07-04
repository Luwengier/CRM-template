import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ItemList from './ItemList'

const SubPage2 = () => {
  return (
    <Box>
      <Typography variant="h3">SubPage</Typography>
      <Box display="flex">
        <ItemList />
      </Box>
    </Box>
  )
}

export default SubPage2
