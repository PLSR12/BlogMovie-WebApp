import { Route, Switch } from 'react-router-dom'

import { Admin, Article, Home, Login } from '../pages'

import LayoutAdmin from 'common/layoutAdmin'

import paths from '../common/constants/paths'

import PrivateRoutes from './private-routes'

export default function RoutesPath() {
  return (
    <Switch>
      <Route exact path={paths.Home} component={Home} />
      <Route exact path={paths.OneArticle} component={Article} />

      <Route exact path={paths.Login} component={Login} />

      <LayoutAdmin>
        <PrivateRoutes exact path={paths.AdminArticles} component={Admin} />
        <PrivateRoutes exact path={paths.NewArticles} component={Admin} />
        <PrivateRoutes exact path={paths.NewCategories} component={Admin} />
        <PrivateRoutes exact path={paths.EditArticle} component={Admin} />
      </LayoutAdmin>
    </Switch>
  )
}
