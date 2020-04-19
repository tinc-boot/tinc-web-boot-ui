import {
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@material-ui/core";
import { Icon } from "../../../companents/icon/Icon";
import React, {useCallback, useMemo} from "react";
import { Network } from "../../../api/api";
import {motion} from 'framer-motion'

type P = {
  network: Network;
  active?: boolean;
  onClick?: () => void;
};

const Container = styled(motion.div)({
  overflow: "hidden"
})

const CustomListItem = styled(ListItem)({
  justifyContent: "space-between",
});

const ListItemIconR = styled(ListItemIcon)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
});

export const NetworkIListItem = (p: P) => {
  const theme = useTheme();

  const iconColor = useMemo(
    () =>
      p.network.running
        ? theme.palette.success.main
        : theme.palette.text.disabled,
    [
      p.network.running,
      theme.palette.text.disabled,
      theme.palette.success.main,
    ]
  );

  const onClick = useCallback(() => p.onClick && p.onClick(), [p])

  return (
    <Container animate={{maxHeight: [0, 64]}} exit={{maxHeight: [64, 0]}} transition={{duration: 0.5}}>
      <CustomListItem button disabled={p.active} onClick={onClick}>
        <ListItemIcon>
          <Icon icon="faNetworkWired" color={iconColor} />
        </ListItemIcon>
        <ListItemText primary={p.network.name} />
        <ListItemIconR>
          <Icon icon="faChevronRight" />
        </ListItemIconR>
      </CustomListItem>
    </Container>
  );
};
