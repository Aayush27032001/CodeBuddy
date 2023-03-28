import React, { useState } from "react";
import FormLayout from "../Components/Layout/FormLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const TestForm = () => {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("testCode", testCode);
    navigate("/code");
  };
  return (
    <Box className={styles.testForm} sx={{ position: "relative" }}>
      <Button
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
        variant="outlined"
        color="primary"
        onClick={() => {
          navigate("/login");
        }}
      >
        Create Test
      </Button>
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          fullWidth
          sx={{ mb: "2rem" }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          fullWidth
          sx={{ mb: "2rem" }}
        />
        <TextField
          label="Enter Test Code"
          value={testCode}
          onChange={(e) => {
            setTestCode(e.target.value);
          }}
          required
          fullWidth
          sx={{ mb: "2rem" }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <FormLayout
      image_url={"https://source.unsplash.com/random?topics=technology"}
    >
      <TestForm />
    </FormLayout>
  );
};

export default LandingPage;
