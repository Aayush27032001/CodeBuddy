import React, { useState } from "react";
import FormLayout from "../Components/Layout/FormLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";

const TestForm = () => {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("testCode", testCode);
    navigate("/code");
  };
  return (
    <form onSubmit={submitHandler} className={styles.testForm}>
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
