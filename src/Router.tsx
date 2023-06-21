import { lazy, ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { NonIndexRouteObject } from 'react-router-dom'

import {
  IconSuspenseWrapper,
  PageSuspenseWrapper,
} from 'components/SuspenseWrapper'
import NormalTemplate from 'components/templates/NormalTemplate'

// Page
const Home = lazy(() => import('pages/Home'))

// Icon
const InfoIcon = lazy(() => import('@mui/icons-material/Info'))

const Router = () => {
  const routes = useRoutes(routeConfig)

  return <NormalTemplate>{routes}</NormalTemplate>
}

export const routeConfig: RouteItem[] = [
  {
    path: '/',
    name: 'Home',
    element: <PageSuspenseWrapper component={<Home />} />,
    hidden: true,
    icon: <IconSuspenseWrapper component={<InfoIcon />} />,
  },
]

export interface RouteItem extends NonIndexRouteObject {
  name?: string
  icon?: ReactNode
  hidden?: boolean
  disabled?: boolean
  children?: RouteItem[]
}

export default Router
