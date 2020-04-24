import React, {useCallback, useEffect, useMemo} from "react";
import IconButton from "@material-ui/core/IconButton";
import {Icon, IconType} from "../icon/Icon";
import Divider from "@material-ui/core/Divider";
import {Box, ButtonGroup, Typography} from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import {useNetwork} from "../../hooks/api/useNetwork";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";
import FileSaver from "file-saver";

const Header = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});

const HeaderTitle = styled(Typography)({
  flexGrow: 1
})

type P = {
  networkName: string
}

export const NetworkPage = (p: P) => {
  const {network, node, start, stop, remove, fetching, loadNetwork, shared} = useNetwork(p.networkName),
    history = useHistory()

  const {icon, onAction} = useMemo(() => ({
    onAction: network?.running ? stop : start,
    icon: (network?.running ? 'faPause' : 'faPlay') as IconType
  }), [network, start, stop]);

  const onRemove = useCallback(() => {
    remove().finally(() => history.push('/app'))
  }, [history, remove])

  const onShared = useCallback(async () => {
    const res = await shared()
    FileSaver.saveAs(new Blob([res], {type: "text/plain;charset=utf-8"}), p.networkName+'.twbsn')
  }, [p.networkName, shared])

  useEffect(() => {
    loadNetwork()
  }, [loadNetwork])

  return (
    <>
      <Header>
        <HeaderTitle color="textPrimary" variant="h4">
          {p.networkName}
        </HeaderTitle>
        <IconButton onClick={onAction} disabled={fetching}>
          <Icon icon={fetching ? 'faSpinner' : icon} spin={fetching} />
        </IconButton>
      </Header>
      <Divider />
      {
        node && (
          <Typography variant='subtitle1'>subnet: {node.subnet}</Typography>
        )
      }
      <ButtonGroup variant='outlined'>
        <Button disabled={fetching} color='primary' onClick={onShared}>
          shared
        </Button>
        <Button disabled={fetching} color='secondary' onClick={onRemove}>
          delete
        </Button>
      </ButtonGroup>
    </>
  )
}
