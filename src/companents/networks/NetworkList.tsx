import React, { useCallback, useEffect } from "react";
import {
  Button,
  Divider,
  List,
  ListSubheader,
} from "@material-ui/core";
import { NetworkIListItem } from "./NetworkIListItem";
import { useNetworks } from "../../hooks/api/useNetworks";
import { useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {Network} from "../../api/tincweb";
import {ImportNetworkDialog} from "./ImportNetworkDialog";
import {AddNetworkForm} from "./AddNetworkForm";

type P = {
  isMobile?: boolean
}

export const NetworkList = (p: P) => {
  const { networks, loadNetworks } = useNetworks(),
    history = useHistory();

  const onClick = useCallback(
    (n: Network) => () => {
      history.push("/app/networks/" + n.name);
    },
    [history]
  );

  useEffect(() => {
    loadNetworks();
  }, [loadNetworks]);

  return (
    <>
      {networks && (
        <List subheader={<ListSubheader>Networks</ListSubheader>}>
          <AnimatePresence>
            {networks?.map((n) => (
              <NetworkIListItem
                key={"network-" + n.name}
                network={n}
                onClick={onClick(n)}
              />
            ))}
          </AnimatePresence>
        </List>
      )}
      <Divider />
      <AddNetworkForm />
      <ImportNetworkDialog isMobile={p.isMobile} />
    </>
  );
};
