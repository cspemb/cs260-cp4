import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [test, setTest] = useState("Get Not called yet");
  return (
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
  );
};

export default Home;
