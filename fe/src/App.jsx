import { useEffect, useMemo, useState, createContext } from "react";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import AppRoutes from "./routes";

const STORED_COLORMODE_KEY = "colorMode";
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "",
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [colorMode, setColorMode] = useState(
    prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    const storedColorMode = window.localStorage.getItem(STORED_COLORMODE_KEY);

    if (storedColorMode) {
      setColorMode(storedColorMode);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  const toggleColorMode = () => {
    setColorMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      window.localStorage.setItem(STORED_COLORMODE_KEY, newMode);

      return newMode;
    });
  };

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode: colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
