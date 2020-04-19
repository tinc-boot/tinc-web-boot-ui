import React, {useMemo} from "react"
import {createMuiTheme, ThemeProvider, ThemeProviderProps, responsiveFontSizes} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {useThemeMode} from "../hooks/system/useThemeMode";

type P = Omit<ThemeProviderProps, 'theme'>

export const Theme = ({children, ...rest}: P) => {
  const {isDarkMode} = useThemeMode()

  const theme = useMemo(() => responsiveFontSizes(createMuiTheme({
    palette: {
      primary: blue,
      type: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      h1: {fontSize: '4rem'},
      h2: {fontSize: '3.5rem'},
    }
  })), [isDarkMode]);

  return (
    <ThemeProvider theme={theme} children={children} {...rest} />
  )
}
