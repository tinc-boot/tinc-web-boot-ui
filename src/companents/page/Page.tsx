import React, { ReactNode } from "react";
import { WebBootAppBar } from "../header/WebBootAppBar";
import { SWAlert } from "../alerts/sw/SWAlert";
import styled from "@material-ui/core/styles/styled";

const Screen = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
  minHeight: "100vh",
});

const ScreenTop = styled("div")({});

const ScreenContent = styled("div")({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

type P = {
  children?: ReactNode;
};

export const Page = ({ children }: P) => {
  return (
    <Screen>
      <ScreenTop>
        <WebBootAppBar />
      </ScreenTop>
      <ScreenContent>
        <SWAlert />
        {children}
      </ScreenContent>
    </Screen>
  );
};
