import React from "react"
import {Page} from "../../companents/page/Page";
import { Route, Switch, Redirect } from "react-router-dom";
import {NetworksPage} from "./networks/NetworksPage";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "@material-ui/core/styles/styled";
import {AddNetworksPage} from "./add-networks/AddNetworksPage";

export const LinearProgressFixed = styled(LinearProgress)({
  position: 'fixed',
  left: 0,
  right: 0
})

export const AppPage = () => {

  return (
    <Page>
      <Switch>
        <Route path='/app/add-networks'>
          <AddNetworksPage />
        </Route>
        <Route path='/app/networks'>
          <NetworksPage />
        </Route>
        <Route path='/app'>
          <Redirect to='/app/networks' />
        </Route>
      </Switch>
    </Page>
  )
}
