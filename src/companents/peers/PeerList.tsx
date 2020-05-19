import React, {useEffect} from 'react';
import {usePeers} from "../../hooks/api/usePeers";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {Icon} from "../icon/Icon";
import styled from "@material-ui/core/styles/styled";
import {blueGrey, green} from "@material-ui/core/colors";

type PeerAvatarProps = {online?: boolean}

const PeerAvatar = styled(Avatar)((p: PeerAvatarProps) => ({
  backgroundColor: 'transparent',
  color: p.online ? green[500] : blueGrey[800],
}))

export type PeerListProps = {
  networkName: string
}

export const PeerList = (p: PeerListProps) => {
  const {peers, loadPeers} = usePeers(p.networkName)

  useEffect(() => {
    if (peers) {
      const id = setTimeout(() => loadPeers(true), 2000)
      return () => clearTimeout(id)
    }
  }, [loadPeers, peers])

  return (
    <>
      {peers && (
        <List>
          {
            peers.map(p => (
              <ListItem>
                <ListItemAvatar>
                  <PeerAvatar online={p.online} >
                    <Icon icon={p.online ? "fasCircle" : "farCircle"} />
                  </PeerAvatar>
                </ListItemAvatar>
                <ListItemText primary={p.name} secondary={p.config.ip}/>
              </ListItem>
            ))
          }
        </List>
      )}
    </>
  );
};
