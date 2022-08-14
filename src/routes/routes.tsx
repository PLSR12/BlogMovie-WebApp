import { Switch, Route } from 'react-router-dom'

import { Home, Article, Admin, Login } from '../pages'

import paths from '../common/constants/paths'

import PrivateRoutes from './private-routes'

export default function RoutesPath() {
  return (
    <Switch>
      <Route exact path={paths.Home} component={Home} />
      <Route exact path={paths.OneArticle} component={Article} />
      <Route exact path={paths.Login} component={Login} />

      <PrivateRoutes exact path={paths.AdminArticles} component={Admin} />
    </Switch>
  )
}
