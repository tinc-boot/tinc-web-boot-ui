import React from "react";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useFetching} from "../../hooks/system/useFetching";
import Box from "@material-ui/core/Box";
import {Icon} from "../icon/Icon";
import {useThemeMode} from "../../hooks/system/useThemeMode";

export const LinearProgressFixed = styled(LinearProgress)({
  position: 'absolute',
  left: 0,
  top: 64,
  right: 0
})

export const WebBootAppBar = () => {
  const {globalFetching} = useFetching(),
    {toggleMode, isDarkMode} = useThemeMode()

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6">TincWebBoot</Typography>
          <Box flexGrow={1}/>
          <IconButton onClick={toggleMode}>
            <Icon icon={isDarkMode ? 'faSun' : 'faMoon'} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {<LinearProgressFixed color="secondary" hidden={!globalFetching} />}
    </>
  );
};
