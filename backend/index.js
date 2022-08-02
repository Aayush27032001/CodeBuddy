const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello Server is Up and fine!")
})

app.post('/js',(req,res)=>{
    // console.log(req.body);
    fs.writeFileSync('./JSCodes/Code.js',req.body.code);
    try{
      const func = require('./JSCodes/Code');
      // console.log(func);
      const testCase = [[1,2,3,4,5],[9,9,55,1,4],[],[1]];
      const CorrectResults = [15,78,0,1];
      const userResults = CorrectResults.map((e,i)=>{
        if(func(testCase[i])===e) return true;
        return false;
      })
      // fs.unlinkSync("./JSCodes/Code.js")
      res.status(200).json({message:"Evaluation Done!",data:userResults});
    }
    catch(e){
      // fs.unlinkSync("./JSCodes/Code.js")
      res.status(500).json({message:"Time Limit Exced or Code having syntax error"});
    }
})

app.listen(port, () => {
  console.log(`Server is Up at ${port}`)
})