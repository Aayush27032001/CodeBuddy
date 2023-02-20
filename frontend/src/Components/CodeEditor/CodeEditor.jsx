import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { post } from "../../utils/request";
import { lintGutter, linter } from "@codemirror/lint";
import Linter from "eslint4b-prebuilt";
const esLintConfigs = {
  env: { es6: true },
  rules: { "no-unused-vars": "off" },
};
const CodeEditor = ({ question }) => {
  const [code, setCode] = useState(
    "module.exports = function(arr) {\n  //Your code goes here\n\n}"
  );
  const [loading, setLoading] = useState(false);
  const [testCase, setTestCase] = useState([
    [1, 2, 3, 4, 5],
    [9, 9, 55, 1, 4],
    [],
  ]);
  const [results, setResults] = useState([]);
  const solution = [15, 78, 0];
  const submitHandler = async () => {
    setLoading(true);
    const res = await post("js", {
      code,
      testId: localStorage.getItem("testCode"),
      questionId: question?._id,
    });
    if (!res) {
      alert("Your Code Harmed our server there may be infinte loops!");
      setLoading(false);
      setResults([]);
    }
    if (res.ok) {
      setResults(res.data);
      setLoading(false);
    } else {
      setLoading(false);
      setResults([]);
      alert(res.message);
    }
  };

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
      console.log(e);
    };
  }, []);

  return (
    <div>
      <ReactCodeMirror
        value={code}
        theme="dark"
        height="65vh"
        extensions={[
          javascript(),
          linter(esLint(new Linter(), esLintConfigs)),
          lintGutter(),
        ]}
        onChange={(val) => {
          setCode(val);
        }}
      />
      <div>
        {!loading &&
          results?.map((e, i) => {
            return (
              <p>
                {`Test Case ${i + 1}: `}
                {e === true ? "Passed" : "Failed"}
              </p>
            );
          })}
      </div>
      <button onClick={submitHandler} disabled={loading}>
        Submit
      </button>
    </div>
  );
};

export default CodeEditor;
