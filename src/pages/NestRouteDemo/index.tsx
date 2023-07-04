import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Loading from './_Loading'
import NotFound from './_404'
import ErrorFallback from './_Error'

const Layout = lazy(() => import('./_Layout'))
const Page = lazy(() => import('./_Page'))
const SubPage = lazy(() => import('./SubPage'))

const NestRouteDemo = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Layout />
            </ErrorBoundary>
          </Suspense>
        }
        children={[
          <Route key="root-page" path="/" element={<Page />} />,
          <Route key="sub-page" path="sub-page" element={<SubPage />} />,
        ]}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  // OR //
  // return (
  //   <Box>
  //     或直接將 Layout 的內容寫在這裡並將 Routes 包住
  //     也可以使用簡單的路由設定就好，不用都像上面那樣寫
  //     <Routes>
  //       <Route
  //         key=""
  //         path=""
  //         element={<PageSuspenseWrapper component={<Page />} />}
  //       />
  //       <Route
  //         key="sub-page"
  //         path="sub-page"
  //         element={<PageSuspenseWrapper component={<SubPage />} />}
  //       />
  //     </Routes>
  //   </Box>
  // )
}

export default NestRouteDemo
