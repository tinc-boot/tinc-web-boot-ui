import React from "react";
import {AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useFetching} from "../../hooks/system/useFetching";
import Box from "@material-ui/core/Box";
import {Icon} from "../icon/Icon";
import {useThemeMode} from "../../hooks/system/useThemeMode";
import {useHistory, useRouteMatch} from "react-router-dom";

export const LinearProgressFixed = styled(LinearProgress)({
  position: 'absolute',
  left: 0,
  top: 64,
  right: 0
})

export const WebBootAppBar = () => {
  const theme = useTheme(),
    isMobile = useMediaQuery(theme.breakpoints.down('sm')),
    matchApp = useRouteMatch('/app'),
    history = useHistory()

  const {globalFetching} = useFetching(),
    {toggleMode, isDarkMode} = useThemeMode()

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Box hidden={!isMobile}>
            <IconButton disabled={!!matchApp && matchApp.isExact} onClick={history.goBack}>
              <Icon icon='faChevronLeft' />
            </IconButton>
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h6" align={isMobile ? "center" : 'left'}>TincWebBoot</Typography>
          </Box>
          <IconButton onClick={toggleMode}>
            <Icon icon={isDarkMode ? 'faSun' : 'faMoon'} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {<LinearProgressFixed color="secondary" hidden={!globalFetching} />}
    </>
  );
};
