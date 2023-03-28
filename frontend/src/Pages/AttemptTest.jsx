import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../Components/CodeEditor/CodeEditor";
import DisableDevTools from "../Components/DisableDevTools";
import FullscreenWrapper from "../Components/FullscreenWrapper";
import Layout from "../Components/Layout/Layout";
import { get } from "../utils/request";
import styles from "./AttemptTest.module.scss";

function convertSecondsToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours,
    minutes,
    seconds: remainingSeconds,
  };
}

const QuestionViewer = React.memo(function QuestionViewer({ question }) {
  console.log("render1");
  return (
    <Box p={"1rem"}>
      <Box
        sx={{
          background: "#ddd",
          p: "1rem",
          borderRadius: "8px",
          textAlign: "justify",
          fontSize: "1.125rem",
          fontWeight: "500",
        }}
      >
        {question?.name}
      </Box>
      <Box
        sx={{
          background: "#ddd",
          p: "1rem",
          borderRadius: "8px",
          textAlign: "justify",
          fontSize: "1.125rem",
          fontWeight: "500",
        }}
      >
        {question?.statement}
      </Box>
    </Box>
  );
});

const AttemptTest = () => {
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState();
  const [value, setValue] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState();

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchTest = async () => {
    if (!localStorage.getItem("testCode")) {
      navigate("/");
    }
    const res = await get(`tests/${localStorage.getItem("testCode")}`);
    console.log(res);
    if (res.status !== 200) {
      navigate("/");
    } else {
      setTest(res.data.test);
      if (isNaN(localStorage.getItem("timeout"))) {
        localStorage.setItem("timeout", res.data.test.duration);
      }
      if (!!!localStorage.getItem("timeout")) {
        localStorage.setItem("timeout", res.data.test.duration);
      }
      setTimeRemaining(
        parseInt(localStorage.getItem("timeout")) ?? res.data.test.duration
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTest();
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        localStorage.setItem("timeout", prev - 1);
        return prev - 1;
      });
      // console.log(timeRemaining);
    }, 1000);
    return () => {
      clearInterval(interval);
      localStorage.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DisableDevTools>
      <FullscreenWrapper>
        {loading ? (
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ mr: "1rem" }} /> Loading...
          </Box>
        ) : (
          <div className={styles.testContainer}>
            <Box
              display={"flex"}
              background="#1e1e1e"
              justifyContent="space-between"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {test?.Question?.map((_, i) => {
                  return <Tab label={`Question ${i + 1}`} key={i} />;
                })}
              </Tabs>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  pr: "1rem",
                  fontSize: "1.2rem",
                }}
              >
                Time Remaining:{" "}
                {`${convertSecondsToHMS(timeRemaining).hours}:${
                  convertSecondsToHMS(timeRemaining).minutes
                }:${convertSecondsToHMS(timeRemaining).seconds}`}
              </Box>
            </Box>
            <Layout
              left={<QuestionViewer question={test?.Question[value]} />}
              right={<CodeEditor question={test?.Question[value]} />}
            />
          </div>
        )}
      </FullscreenWrapper>
    </DisableDevTools>
  );
};

export default AttemptTest;
