import { useNavigate, Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Layout = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <nav>
        <Button variant="contained" onClick={() => navigate('./sub-page1')}>
          Tab1
        </Button>
        <Button variant="contained" onClick={() => navigate('./sub-page2')}>
          Tab2
        </Button>
      </nav>
      {/* 以及其他該頁面專屬的外框 */}

      <Outlet />
    </Box>
  )
}

export default Layout
