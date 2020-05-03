import React, { useCallback, useEffect, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Icon, IconType } from "../icon/Icon";
import Divider from "@material-ui/core/Divider";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  ButtonGroup,
  Container,
  Typography,
} from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import { useNetwork } from "../../hooks/api/useNetwork";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import FileSaver from "file-saver";

const Header = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const HeaderTitle = styled(Typography)({
  flexGrow: 1,
});

const FlexContainer = styled("div")((p) => ({
  flexGrow: 1,
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
}));

const Content = styled(Container)(p => ({
  flexGrow: 1,
  paddingTop: p.theme.spacing(2)
}));
const Bottom = styled("div")({})

type P = {
  networkName: string;
};

export const NetworkPage = (p: P) => {
  const {
      network,
      node,
      start,
      stop,
      remove,
      fetching,
      loadNetwork,
      shared,
    } = useNetwork(p.networkName),
    history = useHistory();

  const { icon, onAction, mainActionName } = useMemo(
    () => ({
      onAction: network?.running ? stop : start,
      icon: (network?.running ? "faPause" : "faPlay") as IconType,
      mainActionName: network?.running ? 'Stop' : 'Start'
    }),
    [network, start, stop]
  );

  const onRemove = useCallback(() => {
    remove().finally(() => history.push("/app"));
  }, [history, remove]);

  const onShared = useCallback(async () => {
    const res = await shared();
    FileSaver.saveAs(
      new Blob([res], { type: "text/plain;charset=utf-8" }),
      p.networkName + ".twbsn"
    );
  }, [p.networkName, shared]);

  useEffect(() => {
    loadNetwork();
  }, [loadNetwork]);

  return (
    <FlexContainer>
      <Content>
        <Header>
          <HeaderTitle color="textPrimary" variant="h4">
            {p.networkName}
          </HeaderTitle>
        </Header>
        <Divider />
        {node && (
          <Typography variant="subtitle1">subnet: {node.subnet}</Typography>
        )}
      </Content>
      <Bottom>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            disabled={fetching}
            label="Shared"
            onClick={onShared}
            icon={<Icon icon="faDownload" size='2x' />}
          />
          <BottomNavigationAction
            disabled={fetching}
            label={mainActionName}
            showLabel={!fetching}
            onClick={onAction}
            icon={<Icon icon={fetching ? "faSpinner" : icon} spin={fetching} size='2x' />}
          />
          <BottomNavigationAction
            disabled={fetching}
            label="Delete"
            color="secondary"
            onClick={onRemove}
            icon={<Icon icon="faTrash" size='2x' />}
          />
        </BottomNavigation>
      </Bottom>
    </FlexContainer>
  );
};
