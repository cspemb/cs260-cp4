import { TextField, Button, Stack } from "@mui/material";
function Login() {
  return (
    <>
      <form>
        <Stack spacing={2}>
          <TextField required type="text" label="Username"></TextField>
          <TextField
            required
            type="password"
            label="Password"
            autoComplete="current-password"
          ></TextField>

          <Button variant="contained">Sign Up!</Button>
        </Stack>
      </form>
    </>
  );
}

export default Login;
