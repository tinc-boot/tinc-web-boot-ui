import React from "react"
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import {AppPage} from "../pages/app/AppPage";


export const Routing = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/app' component={AppPage} />
        <Route path='*'>
          <Redirect to='/app' />
        </Route>
      </Switch>
    </HashRouter>
  )
}
