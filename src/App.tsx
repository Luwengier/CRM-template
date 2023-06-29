import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from 'store'

import Router from 'Router'
import { Provider } from 'react-redux'
import SWRProvider from 'features/swr/SWRProvider'
import AuthProvider from 'features/auth/AuthContext'
import ThemeProvider from 'features/theme/ThemeProvider'
import NotistackProvider from 'features/notification/NotistackProvider'

const Login = lazy(() => import('features/auth/Login'))
const SignOut = lazy(() => import('features/auth/SignOut'))

// 匯出路由器，以方便在不是 Component 內部所以不能使用 useNavigate 等 hooks 的地方，依舊能使用例如轉址的功能。
export const router = createBrowserRouter([
  // 包含 template(SideBar、NavBar 等外層架構) 的路由們
  {
    path: '*',
    element: <Router />,
  },
  // 下面是不需要 template 的路由們
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-out',
    element: <SignOut />,
  },
])

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <SWRProvider>
          <ThemeProvider>
            <NotistackProvider>
              <RouterProvider router={router} />
            </NotistackProvider>
          </ThemeProvider>
        </SWRProvider>
      </Provider>
    </AuthProvider>
  )
}

export default App
