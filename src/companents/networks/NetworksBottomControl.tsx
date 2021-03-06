import React from 'react';
import {BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme} from "@material-ui/core";
import {Icon} from "../icon/Icon";
import {AddNetworkModal} from "./AddNetworkModal";
import {useBoolean} from "../../hooks/useBoolean";
import {ImportNetworkDialog} from "./ImportNetworkDialog";
import {QrModal} from "../modals/qr/QRModal";

export const NetworksBottomControl = () => {
  const [isNew, onOpenNew, onCloseNew] = useBoolean(),
    [isImport, onOpenImport, onCloseImport] = useBoolean(),
    [isQR, onOpenQR, onCloseQR] = useBoolean()

  const theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Add"
          onClick={onOpenNew}
          icon={<Icon icon="faPlus" size="2x"/>}
        />
        <BottomNavigationAction
          label="Import"
          onClick={onOpenImport}
          icon={<Icon icon="faUpload" size="2x"/>}
        />
        <BottomNavigationAction
          label="QR code"
          onClick={onOpenQR}
          icon={<Icon icon="faQrcode" size="2x"/>}
        />
      </BottomNavigation>
      <AddNetworkModal isOpen={isNew} onClose={onCloseNew} isMobile={isMobile}/>
      <ImportNetworkDialog isOpen={isImport} onClose={onCloseImport} isMobile={isMobile}/>
      <QrModal open={isQR} onClose={onCloseQR} isMobile={isMobile}/>
    </>
  );
};
