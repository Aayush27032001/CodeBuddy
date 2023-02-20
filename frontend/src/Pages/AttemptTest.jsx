import React, { useEffect, useState } from "react";
import styles from "./AttemptTest.module.scss";
import Layout from "../Components/Layout/Layout";
import CodeEditor from "../Components/CodeEditor/CodeEditor";
import { get } from "../utils/request";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import FullscreenWrapper from "../Components/FullscreenWrapper";
import DisableDevTools from "../Components/DisableDevTools";

const QuestionViewer = ({ question }) => {
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
};

const AttemptTest = () => {
  const [test, setTest] = useState();
  const [value, setValue] = useState(0);
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
      console.log(res.data.test);
      setTest(res.data.test);
    }
  };
  useEffect(() => {
    fetchTest();
  }, []);
  return (
    <FullscreenWrapper timeout={0}>
      <DisableDevTools>
        <div className={styles.testContainer}>
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
          <Layout
            left={<QuestionViewer question={test?.Question[value]} />}
            right={<CodeEditor question={test?.Question[value]} />}
          />
        </div>
      </DisableDevTools>
    </FullscreenWrapper>
  );
};

export default AttemptTest;
