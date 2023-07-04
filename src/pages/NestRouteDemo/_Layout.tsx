import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Bomb = () => {
  const [isError, setIsError] = useState(false)

  const handleClick = () => {
    setIsError(true)
  }

  if (isError) {
    throw new Error('💥 CA-BOOM 💥')
  }

  return <button onClick={handleClick}>bomb</button>
}

const Layout = () => {
  const navigate = useNavigate()

  return (
    <Box p={3}>
      <Box
        component="nav"
        sx={{
          mb: 2,
          '.MuiButton-root:not(:last-of-type)': {
            mr: 1,
          },
        }}
      >
        <Button variant="contained" onClick={() => navigate('.')}>
          Tab1
        </Button>
        <Button variant="contained" onClick={() => navigate('./sub-page')}>
          Tab2
        </Button>
      </Box>
      {/* 以及其他該頁面專屬的外框 */}

      {/* Outlet用來顯示子路由的實際內容 */}
      <Outlet />

      <Bomb />
    </Box>
  )
}

export default Layout
