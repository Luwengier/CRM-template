import { useRoutes } from 'react-router-dom'
import NormalTemplate from 'components/template/NormalTemplate'
import { routeConfig } from 'configs/route'

const Router = () => {
  const routes = useRoutes(routeConfig)

  return <NormalTemplate>{routes}</NormalTemplate>
}

export default Router
