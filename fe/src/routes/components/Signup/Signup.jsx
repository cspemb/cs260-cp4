import { useState, useEffect, useContext } from "react";

import { TextField, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { validateUsername, validatePassword, signup } from "./Signup.domain";
import { AppStateContext } from "../../../App";

function Signup({ handleClose }) {
  const appState = useContext(AppStateContext);

  const [formValues, setFormValues] = useState({
    firstname: { value: "", error: false },
    lastname: { value: "", error: false },
    username: { value: "", error: false, errorText: "" },
    password: { value: "", error: false },
  });

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const validateFormValue = (key) => {
    if (!formValues[key].value) {
      setFormValues((prev) => {
        return { ...prev, [key]: { ...prev[key], error: true } };
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const user = {};

    for (const field in formValues) {
      user[field] = formValues[field].value;
    }

    try {
      const res = await signup(user);

      if (res.data.loggedIn) {
        appState.dispatch({ type: "setUser", user: res.data });
        appState.dispatch({
          type: "setSlidedown",
          slidedown: {
            message: "Yay! Successfully signed up and logged in! 😏",
            severity: "success",
          },
        });
      } else {
        throw res.data.error;
      }
    } catch (e) {
      appState.dispatch({
        type: "setSlidedown",
        slidedown: { message: e.message, severity: "error" },
      });
    }
    setLoading(false);
    handleClose();
  };

  useEffect(() => {
    setIsDisabled(
      Object.keys(formValues).some(
        (key) => formValues[key].error || !formValues[key].value
      )
    );
  }, [formValues]);

  return (
    <>
      <form>
        <Stack spacing={2}>
          <TextField
            required
            type="text"
            label="First Name"
            value={formValues.firstname.value}
            onChange={(e) => {
              setFormValues((prev) => {
                return {
                  ...prev,
                  firstname: { value: e.target.value },
                };
              });
            }}
            onBlur={(e) => {
              validateFormValue("firstname");
            }}
            error={formValues.firstname.error}
          />
          <TextField
            required
            type="text"
            label="Last Name"
            value={formValues.lastname.value}
            onChange={(e) => {
              setFormValues((prev) => {
                return { ...prev, lastname: { value: e.target.value } };
              });
            }}
            onBlur={(e) => {
              validateFormValue("lastname");
            }}
            error={formValues.lastname.error}
          />
          <TextField
            required
            type="text"
            label="Username"
            value={formValues.username.value}
            onChange={(e) => {
              setFormValues((prev) => {
                return { ...prev, username: { value: e.target.value } };
              });
            }}
            onBlur={async (e) => {
              validateFormValue("username");
              const [isValid, errorText] = await validateUsername(
                formValues.username.value
              );

              if (!isValid) {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    username: {
                      ...prev.username,
                      error: true,
                      errorText: errorText,
                    },
                  };
                });
              }
            }}
            error={formValues.username.error}
            helperText={formValues.username.errorText}
          />
          <TextField
            required
            type="password"
            label="Password"
            autoComplete="current-password"
            value={formValues.password.value}
            onChange={(e) => {
              setFormValues((prev) => {
                return { ...prev, password: { value: e.target.value } };
              });
              validateFormValue("password");
              const isValid = validatePassword(formValues.password.value);
              if (!isValid) {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    password: {
                      ...prev.password,
                      error: true,
                    },
                  };
                });
              }
            }}
            error={formValues.password.error}
            helperText="Passwords must have at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 10 characters long"
          />

          <LoadingButton
            disabled={isDisabled}
            variant="contained"
            onClick={handleSubmit}
            loading={loading}
          >
            Sign Up!
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}

export default Signup;
