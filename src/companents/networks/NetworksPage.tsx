import React from "react";
import {useRouteMatch} from "react-router";
import {NetworkPage} from "./NetworkPage";
import Box from "@material-ui/core/Box";

type MathProps = {
  networkName?: string
}

export const NetworksPage = () => {
  const match = useRouteMatch<MathProps>('/app/networks/:networkName?');
  return (
    <>
      {match?.params?.networkName && (
        <Box p={3}>
          <NetworkPage networkName={match?.params?.networkName} />
        </Box>
      )}
    </>
  );
};
