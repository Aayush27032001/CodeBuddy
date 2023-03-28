import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, post } from "../utils/request";

const Results = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const checkValidToken = async (token) => {
    const response = await get("/results/myResults", {}, token);
    if (!response.ok) {
      setIsLoggedin(false);
      toast("Please Login!", {
        theme: "light",
        type: "error",
        position: "top-right",
      });
    }
  };
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await post("/users/login",{email: formData.get("email"), password: formData.get("password")})
    if(response.ok){
      localStorage.setItem("token",response.token);
      setIsLoggedin(true);
    }else{
      console.log("hello");
      toast(response.message, {type:"error", position:"top-right"})
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkValidToken(localStorage.getItem("token"));
    } else {
      setIsLoggedin(false);
      checkValidToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <Box>
      <Dialog open={!isLoggedin} onClick={() => {}}>
        <form onSubmit={loginSubmitHandler}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Box display={"flex"} flexDirection="column">
              <TextField sx={{mt:"1rem"}} name="email" type="email" label="Email" required />
              <TextField sx={{mt:"1rem"}} name="password" type="password" label="Password" required/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
      RESULTS
    </Box>
  );
};

export default Results;
