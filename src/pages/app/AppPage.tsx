import React from "react";
import { Page } from "../../companents/page/Page";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NetworksPage } from "../../companents/networks/NetworksPage";
import { Container, styled, useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { NetworkList } from "../../companents/networks/NetworkList";
import { NetworksBottomControl } from "../../companents/networks/NetworksBottomControl";

const FlexContainer = styled("div")({
  flexGrow: 1,
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
});

const FlexGrid = styled(Grid)({
  flexGrow: 1,
});

const FlexGridBorder = styled(FlexGrid)((p) => ({
  borderLeftWidth: 1,
  borderLeftStyle: "solid",
  borderLeftColor: p.theme.palette.divider,
  [p.theme.breakpoints.down("sm")]: {
    borderLeftWidth: 0,
  },
}));

export const AppPage = () => {
  const matchNetworks = useRouteMatch("/app/networks/:id"),
    theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Page>
        <FlexGrid container spacing={0}>
          <FlexGrid
            item
            xs={12}
            md={5}
            lg={4}
            hidden={isMobile && !!matchNetworks}
          >
            <FlexContainer>
              <Container>
                <NetworkList isMobile={isMobile} />
              </Container>
              <NetworksBottomControl />
            </FlexContainer>
          </FlexGrid>
          <FlexGridBorder
            item
            xs={12}
            md={7}
            lg={8}
            hidden={isMobile && !matchNetworks}
          >
            <Switch>
              <Route path="/app/networks">
                <NetworksPage />
              </Route>
            </Switch>
          </FlexGridBorder>
        </FlexGrid>
      </Page>
    </>
  );
};
