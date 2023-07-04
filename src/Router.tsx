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
const DemoPage = lazy(() => import('pages/NestRouteDemo/_Page'))
const SubPage = lazy(() => import('pages/NestRouteDemo/SubPage'))

// Icon
const HomeRoundedIcon = lazy(() => import('@mui/icons-material/HomeRounded'))
const SegmentIcon = lazy(() => import('@mui/icons-material/Segment'))
const AutoAwesomeRoundedIcon = lazy(
  () => import('@mui/icons-material/AutoAwesomeRounded')
)

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
    // 以 Next.js App Router 的設計模式，可進入 /NestRouteDemo/index.tsx 查看
    path: '/next-pattern/*',
    name: 'NextPattern',
    element: <PageSuspenseWrapper component={<NestRouteDemo />} />,
    icon: <IconSuspenseWrapper component={<AutoAwesomeRoundedIcon />} />,
  },
  {
    // 在 routeConfig 中設定路由，並在 children 中設定子路由可顯示巢狀側邊欄
    path: '/layered-sidebar',
    name: 'LayeredSidebar',
    icon: <IconSuspenseWrapper component={<SegmentIcon />} />,
    element: <PageSuspenseWrapper component={<PageLayout />} />,
    children: [
      {
        path: '',
        name: 'DemoPage',
        element: <PageSuspenseWrapper component={<DemoPage />} />,
      },
      {
        path: 'sub-page',
        name: 'SubPage',
        element: <PageSuspenseWrapper component={<SubPage />} />,
      },
    ],
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
