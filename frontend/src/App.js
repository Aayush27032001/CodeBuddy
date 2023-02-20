import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useState } from "react";
import { post } from "./utils/request";
import CodeEditor from "./Components/CodeEditor/CodeEditor";
import Layout from "./Components/Layout/Layout";
import Router from "./Router";

function App() {
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
    const res = await post("js", { code });
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
  return (
    <>
      <Router />
    </>
  );
}

export default App;
