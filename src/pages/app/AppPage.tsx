import React from "react";
import {Page} from "../../companents/page/Page";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {NetworksPage} from "./networks/NetworksPage";
import {Container, useMediaQuery, useTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {NetworkList} from "./networks/NetworkList";

export const AppPage = () => {
  const matchNetworks = useRouteMatch('/app/networks/:id'),
    theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Page>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={5} lg={4} hidden={isMobile && !!matchNetworks}>
            <NetworkList/>
          </Grid>
          <Grid item xs={12} md={7} lg={8} hidden={isMobile && !matchNetworks}>
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
