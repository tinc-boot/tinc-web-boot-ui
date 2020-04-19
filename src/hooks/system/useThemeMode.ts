import {useStateSelector} from "./useStateSelector";
import {useMediaQuery} from "@material-ui/core";
import {useCallback, useMemo} from "react";
import {dispatcher} from "../../store";
import {ThemeMode} from "../../store/slices/system";


export function useThemeMode() {
  const mode = useStateSelector(s => s.system.themeMode),
    isDarkQuery = useMediaQuery('(prefers-color-scheme: dark)')

  const isDarkMode = useMemo(() => mode !== undefined ? mode : isDarkQuery,[isDarkQuery, mode])

  const toggleMode = useCallback(() => {
    if (mode === ThemeMode.DARK) {
      dispatcher.system.setThemeMode(ThemeMode.LIGHT)
    } else {
      dispatcher.system.setThemeMode(ThemeMode.DARK)
    }
  }, [mode])

  return {isDarkMode, toggleMode}
}
