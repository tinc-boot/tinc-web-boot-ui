import React, {useEffect, useState} from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled
} from "@material-ui/core";
import QRCode from 'qrcode.react'
import {useAddress} from "../../../hooks/api/useAddress";
import {BaseModal} from "../BaseModal";
import {Endpoint} from "../../../api/tincwebui";

const Content = styled(DialogContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

function endpoint2str(e: Endpoint, token: string) {
  const {protocol, pathname, hash} = window.location
  const {host, port} = e
  return `${protocol}//${host}:${port}${pathname}?token=${token}${hash}`
}

export type QRModalProps = {
  open: boolean
  onClose: () => void
  isMobile?: boolean
}

export const QrModal = ({isMobile, ...p}: QRModalProps) => {
  const {address, getToken} = useAddress(),
    [selected, setSelected] = useState<string>(),
    [token, setToken] = useState<string>()

  useEffect(() => {
    if (!token) {
      getToken().then(setToken)
    }
  }, [getToken, token])

  return (
    <>
      <BaseModal {...p} fullScreen={isMobile}>
        <DialogTitle>Open by phone</DialogTitle>
        <Content>
          <FormControl fullWidth margin="normal">
            <InputLabel>IP local network</InputLabel>
            <Select value={selected} onChange={e => setSelected(e.target.value as string)}>
              {token && address?.map(a => (
                <MenuItem value={endpoint2str(a, token)}>{a.host}:{a.port}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {selected && <QRCode value={selected} includeMargin size={256}/>}
        </Content>
        <DialogActions>
          <Button onClick={p.onClose}>Close</Button>
        </DialogActions>
      </BaseModal>
    </>
  );
};
