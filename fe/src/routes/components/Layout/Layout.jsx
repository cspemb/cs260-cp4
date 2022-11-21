import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link, Button } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../../App";

const Layout = (props) => {
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <header>
        <h1>WEBRTC n CHILL</h1>
        <Button variant="contained" onClick={colorMode.toggleColorMode}>
          {colorMode.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}{" "}
          Toggle Theme
        </Button>
      </header>

      <main>
        <Outlet />
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
