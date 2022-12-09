import { useContext, useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import {
  Link,
  Button,
  Avatar,
  Container,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";

import { startCase } from "lodash";

import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppStateContext, ColorModeContext } from "../../../App";

import { stringAvatar } from "./Layout.domain";
import SignInModal from "../SignInModal/SignInModal";

const Layout = (props) => {
  const colorMode = useContext(ColorModeContext);
  const appState = useContext(AppStateContext);

  const [slidedownOpen, setSlidedownOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const clearSlidedown = useCallback(() => {
    setSlidedownOpen(false);
    appState.dispatch({ type: "clearSlidedown" });
  }, [appState]);

  useEffect(() => {
    if (appState.state.slidedown.message) {
      setSlidedownOpen(true);
      setTimeout(clearSlidedown, appState.state.slidedown.duration || 2000);
    }
  }, [appState.state.slidedown, clearSlidedown]);

  return (
    <>
      <Collapse in={slidedownOpen}>
        <Alert
          severity={appState.state.slidedown.severity || "info"}
          onClose={clearSlidedown}
        >
          <AlertTitle>
            {startCase(appState.state.slidedown.severity || "info")}
          </AlertTitle>
          {appState.state.slidedown.message}
        </Alert>
      </Collapse>

      <header style={{ margin: "0 auto" }}>
        <h1>WEBRTC n CHILL</h1>
        <Button variant="contained" onClick={colorMode.toggleColorMode}>
          {colorMode.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}{" "}
          Toggle Theme
        </Button>

        {appState.state.user?.isLoggedIn ? (
          <Avatar {...stringAvatar(appState.state.user.name)} />
        ) : (
          <>
            <Button variant="text" onClick={() => setSignInModalOpen(true)}>
              Sign In
            </Button>
            <SignInModal
              isOpen={signInModalOpen}
              handleClose={() => setSignInModalOpen(false)}
            />
          </>
        )}
      </header>

      <main>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </main>

      <footer>
        <Link href="https://github.com/cspemb/cs260-cp4">
          <GitHubIcon />
        </Link>
      </footer>
    </>
  );
};

export default Layout;
