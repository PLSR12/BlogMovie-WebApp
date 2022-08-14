import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component, ...rest }: any) {
  const user = localStorage.getItem('blogmovie:userData')

  if (!user) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Route {...rest} component={component} />
    </>
  )
}

export default PrivateRoute
