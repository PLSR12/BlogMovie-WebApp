import { Switch, Route } from 'react-router-dom'

import { Home, Article } from '../pages'

import paths from '../common/constants/paths'

export default function RoutesPath() {
  return (
    <Switch>
      <Route exact path={paths.Home} component={Home} />
      <Route exact path={paths.OneArticle} component={Article} />
    </Switch>
  )
}
