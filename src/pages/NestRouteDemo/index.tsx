import { lazy } from 'react'
import { PageSuspenseWrapper } from 'components/SuspenseWrapper'
import { Route, Routes } from 'react-router-dom'
// import { Box } from '@mui/material'

const Layout = lazy(() => import('./_Layout'))
const SubPage1 = lazy(() => import('./SubPage1'))
const SubPage2 = lazy(() => import('./SubPage2'))

const NestRouteDemo = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<PageSuspenseWrapper component={<Layout />} />}
        children={[
          <Route
            key=""
            path=""
            element={<PageSuspenseWrapper component={<SubPage1 />} />}
          />,
          <Route
            key="sub-page1"
            path="sub-page1"
            element={<PageSuspenseWrapper component={<SubPage1 />} />}
          />,
          <Route
            key="sub-page2"
            path="sub-page2"
            element={<PageSuspenseWrapper component={<SubPage2 />} />}
          />,
        ]}
      />
    </Routes>
  )

  // OR //

  // return (
  //   <Box>
  //     或直接將 Layout 的內容寫在這裡並將 Routes 包住
  //     <Routes>
  //       <Route
  //         key=""
  //         path=""
  //         element={<PageSuspenseWrapper component={<SubPage1 />} />}
  //       />
  //       <Route
  //         key="sub-page1"
  //         path="sub-page1"
  //         element={<PageSuspenseWrapper component={<SubPage1 />} />}
  //       />
  //       <Route
  //         key="sub-page2"
  //         path="sub-page2"
  //         element={<PageSuspenseWrapper component={<SubPage2 />} />}
  //       />
  //     </Routes>
  //   </Box>
  // )
}

export default NestRouteDemo
