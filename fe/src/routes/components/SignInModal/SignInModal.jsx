import React, { useState } from "react";
import { Modal, Box, Fade, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Signup } from "../Signup";
import { Login } from "../Login";

function SignInModal({ isOpen, handleClose }) {
  const [tab, setTab] = useState("1");

  const handleTabChange = (e, value) => {
    setTab(value);
  };
  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-Sign-In">
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            minWidth: "50%",
            minHeight: "50%",
          }}
        >
          <TabContext value={tab}>
            <TabList
              onChange={handleTabChange}
              aria-label="Sign Up and Login tab menu"
              centered
            >
              <Tab label="Login" value="1" />
              <Tab label="Sign up" value="2" />
            </TabList>

            <TabPanel value="1">
              <Login handleClose={handleClose} />
            </TabPanel>

            <TabPanel value="2">
              <Signup handleClose={handleClose} />
            </TabPanel>
          </TabContext>
        </Box>
      </Fade>
    </Modal>
  );
}

export default SignInModal;
