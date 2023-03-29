import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { post } from "../../utils/request";
import { lintGutter, linter } from "@codemirror/lint";
import Linter from "eslint4b-prebuilt";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
const esLintConfigs = {
  env: { es6: true },
  rules: { "no-unused-vars": "off" },
};
const CodeEditor = ({ question }) => {
  const [code, setCode] = useState(
    "module.exports = function(input) {\n  //Your code goes here\n\n}"
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const submitHandler = async () => {
    setLoading(true);
    const res = await post("js", {
      code,
      testId: localStorage.getItem("testCode"),
      questionId: question?._id,
    });
    if (!res) {
      toast("Your Code Harmed our server there may be infinte loops!",{type:"error", position:"top-right"});
      setLoading(false);
      setResults([]);
    }
    if (res.ok) {
      setResults(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      setResults([]);
      toast(res.message,{type:"error", position:"top-right"});
    }
  };

  useEffect(() => {
    if (localStorage.getItem(question?._id)) {
      setCode(localStorage.getItem(question?._id));
    }
    setResults([]);
  }, [question?._id]);
  useEffect(() => {
    localStorage.setItem(question?._id, code);
  }, [code, question?._id]);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReactCodeMirror
        value={code}
        theme="light"
        height="60vh"
        extensions={[
          javascript(),
          linter(esLint(new Linter(), esLintConfigs)),
          lintGutter(),
        ]}
        onChange={(val) => {
          setCode(val);
        }}
      />
      <Box sx={{height:"30vh", overflow:"auto"}}>
        {!loading &&
          results?.map((e, i) => {
            return (
              <Typography key={i} sx={{m:"0.25rem", background: e ? "rgba(221,255,221,1.00)" : "#f9c9c9", p: "1rem", borderRadius:"8px"}}>
                {`Test Case ${i + 1}: `}
                {e === true ? "Passed" : "Failed"}
              </Typography>
            );
          })}
      </Box>
      <Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "#f5f5f5",
            display: "flex",
            height: "4vh",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={submitHandler}
            disabled={loading}
            variant="contained"
            color="error"
          >
            Run Test
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CodeEditor;
