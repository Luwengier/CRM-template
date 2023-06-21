import { lazy } from 'react'

import { Provider } from 'react-redux'
import SWRProvider from 'features/swr/SWRProvider'
import AuthProvider from 'features/auth/AuthContext'
import ThemeProvider from 'features/theme/ThemeProvider'
import NotistackProvider from 'features/notification/NotistackProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Router from 'Router'
import store from 'store'

const Login = lazy(() => import('features/auth/Login'))
const SignOut = lazy(() => import('features/auth/SignOut'))

export const router = createBrowserRouter([
  {
    path: '*',
    element: <Router />,
  },
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
