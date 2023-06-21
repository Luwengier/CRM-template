import { useRoutes } from 'react-router-dom'
import { routeConfig } from 'configs/route'

import NormalTemplate from 'components/templates/NormalTemplate'

const Router = () => {
  const routes = useRoutes(routeConfig)

  return <NormalTemplate>{routes}</NormalTemplate>
}

export default Router
