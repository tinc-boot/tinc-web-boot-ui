import React, { useCallback, useEffect } from "react";
import {
  Divider,
  List,
  ListSubheader,
} from "@material-ui/core";
import { NetworkIListItem } from "./NetworkIListItem";
import { useNetworks } from "../../hooks/api/useNetworks";
import { useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {Network} from "../../api/tincweb";

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
    </>
  );
};
