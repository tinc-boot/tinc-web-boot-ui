import React from "react";
import { useRouteMatch } from "react-router";
import { NetworkPage } from "./NetworkPage";
import styled from "@material-ui/core/styles/styled";
import {BottomNavigation, Container} from "@material-ui/core";

const FlexContainer = styled("div")(() => ({
  flexGrow: 1,
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
}));

const Bottom = styled("div")({});

type MathProps = {
  networkName?: string;
};

export const NetworksPage = () => {
  const match = useRouteMatch<MathProps>("/app/networks/:networkName?");
  return (
    <>
      {match?.params?.networkName
        ? (<NetworkPage networkName={match?.params?.networkName} />)
        : (
          <FlexContainer>
            <Container />
            <Bottom>
              <BottomNavigation />
            </Bottom>
          </FlexContainer>
        )
      }
    </>
  );
};
