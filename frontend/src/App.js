import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState } from 'react';
import { post } from './utils/request';

function App() {
  const [code,setCode] = useState('');
  const [loading,setLoading] = useState(false);
  const [testCase,setTestCase] = useState([[1,2,3,4,5],[9,9,55,1,4],[]])
  const [results,setResults] = useState([]);
  const solution = [15,78,0];
  const submitHandler = async () => {
    setLoading(true);
   const res = await post("js",{code});
   console.log(res);
   if(!res){
    alert("Your Code Harmed our server there may be infinte loops!")
    setLoading(false)
    setResults([]);
   }
   if(res.ok){
      setResults(res.data)
    setLoading(false)

   }
   else{
    setLoading(false)
    setResults([]);
    alert(res.message)
   }
  }
  return (
    <div>
    <CodeMirror
      value={code}
      theme='dark'
      height="50vh"
      extensions={[javascript({ jsx: true })]}
      onChange={(val)=>{setCode(val)}}
    />
    <div>
      {!loading &&
        results?.map((e,i)=>{
          return <p>{`Test Case ${i+1}: `}{e===true ? "Passed":"Failed"}</p>
        })
      }
    </div>
    <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default App;
