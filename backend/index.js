const express = require('express');
const cors = require('cors');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSantize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const questionRouter = require('./routes/questionRoutes');
const testRouter = require('./routes/testRoutes');
const resultRouter = require('./routes/resultRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const Test = require('./models/testModel');

const app = express();

// Global midlewares
app.use(cors());

// Set security HTTP headers
app.use(helmet());

function makeid(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 1000,
  WindowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json());

// Data sanitize against NoSQL query injection attacks
app.use(mongoSantize());

//Data sanitize against xss
app.use(xss());

app.use(cookieParser());

// routes
app.get('/', (req, res) => {
  res.status(200).send('Hello Server is Up and fine!');
});

app.post('/js', async (req, res) => {
  // console.log(req.body);
  const id = makeid(20);
  fs.writeFile(`./JSCodes/${id}.js`, req.body.code, async (err) => {
    try {
      const test = await Test.findById(req.body.testId);
      const func = require(`./JSCodes/${id}`);
      const testCase = test.Question.find((ele) => {
        return ele._id.toHexString() === req.body.questionId;
      }).testcases.reduce((t, c) => {
        return [...t, c.input];
      }, []);
      const CorrectResults = test.Question.find((ele) => {
        return ele._id.toHexString() === req.body.questionId;
      }).testcases.reduce((t, c) => {
        return [...t, c.output];
      }, []);
      const userResults = CorrectResults.map((e, i) => {
        if (func(testCase[i]) == e) return true;
        return false;
      });
      fs.unlink(`./JSCodes/${id}.js`, () => {});
      res.status(200).json({
        message: 'Evaluation Done!',
        data: userResults,
      });
    } catch (e) {
      fs.unlink(`./JSCodes/${id}.js`, () => {});
      res.status(500).json({
        message: 'Time Limit Exced or Code having syntax error',
      });
    }
  });
});

app.use('/api/questions', questionRouter);
app.use('/tests', testRouter);
app.use('/results', resultRouter);
app.use('/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
