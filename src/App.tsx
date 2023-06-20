import { lazy } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'providers/ThemeProvider'
import SWRProvider from 'features/swr/SWRProvider'
import NotistackProvider from 'features/notification/components/NotistackProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Router from 'Router'
import store from 'store'

const Login = lazy(() => import('pages/Auth/Login'))
const SignOut = lazy(() => import('pages/Auth/SignOut'))

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
    <Provider store={store}>
      <ThemeProvider>
        <SWRProvider>
          <NotistackProvider>
            <RouterProvider router={router} />
          </NotistackProvider>
        </SWRProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
