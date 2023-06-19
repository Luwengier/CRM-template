import {
  IconSuspenseWrapper,
  PageSuspenseWrapper,
} from 'components/SuspenseWrapper'
import { ReactNode, lazy } from 'react'
import { NonIndexRouteObject } from 'react-router-dom'

// Page
const Home = lazy(() => import('pages/Home'))

// Icon
const InfoIcon = lazy(() => import('@mui/icons-material/Info'))

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
