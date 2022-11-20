import { React, useEffect, useMemo, useState, createContext } from "react";

import axios from "axios";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const STORED_COLORMODE_KEY = "colorMode";
const ColorModeContext = createContext({ toggleColorMode: () => {} });

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

  const [test, setTest] = useState("Get Not called yet");

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* TODO Put routes here */}
        <Button variant="contained" onClick={toggleColorMode}>
          {colorMode === "light" ? <LightModeIcon /> : <DarkModeIcon />} Toggle
          Theme
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            axios
              .get("/api/user/test")
              .then((res) => {
                setTest(res.data.test);
              })
              .catch((e) => {
                alert(e);
              })
          }
        >
          {test}
        </Button>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
