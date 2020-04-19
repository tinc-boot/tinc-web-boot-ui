import React from "react";
import {Page} from "../../companents/page/Page";
import {Route, Switch} from "react-router-dom";
import {NetworksPage} from "./networks/NetworksPage";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {NetworkList} from "./networks/NetworkList";

export const AppPage = () => {
  return (
    <Page>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item md={false} lg={3}>
            <NetworkList/>
          </Grid>
          <Grid item md={12} lg={9}>
            <Switch>
              <Route path="/app/networks">
                <NetworksPage/>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
