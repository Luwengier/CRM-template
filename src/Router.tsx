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
const NestRouteDemo = lazy(() => import('pages/NestRouteDemo'))
const PageLayout = lazy(() => import('pages/NestRouteDemo/_Layout'))
const SubPage1 = lazy(() => import('pages/NestRouteDemo/SubPage1'))
const SubPage2 = lazy(() => import('pages/NestRouteDemo/SubPage2'))

// Icon
const HomeRoundedIcon = lazy(() => import('@mui/icons-material/HomeRounded'))

const Router = () => {
  const routes = useRoutes(routeConfig)
  return <NormalTemplate>{routes}</NormalTemplate>
}

export const routeConfig: RouteItem[] = [
  {
    path: '/',
    name: 'Home',
    element: <PageSuspenseWrapper component={<Home />} />,
    icon: <IconSuspenseWrapper component={<HomeRoundedIcon />} />,
  },
  {
    path: '/nest-sidebar-demo',
    name: 'NavRouteDemo',
    element: <PageSuspenseWrapper component={<PageLayout />} />,
    children: [
      {
        path: '',
        name: 'SubPage1',
        element: <PageSuspenseWrapper component={<SubPage1 />} />,
        hidden: true,
      },
      {
        path: 'sub-page1',
        name: 'SubPage1',
        element: <PageSuspenseWrapper component={<SubPage1 />} />,
      },
      {
        path: 'sub-page2',
        name: 'SubPage2',
        element: <PageSuspenseWrapper component={<SubPage2 />} />,
      },
    ],
  },
  {
    path: '/nest-route-demo/*',
    name: 'NestRouteDemo',
    element: <PageSuspenseWrapper component={<NestRouteDemo />} />,
    hidden: true,
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
