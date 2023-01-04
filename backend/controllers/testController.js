const short = require('short-uuid');
const Test = require('../models/testModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();

  res.status(200).json({
    status: 'success',
    message: 'All tests found',
    data: {
      tests,
    },
  });
});

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    return next(new AppError('No test found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Test found',
    data: {
      test,
    },
  });
});

exports.createTest = catchAsync(async (req, res, next) => {
  const testObj = req.body;
  const key = short.generate();
  const testUrl = `http://localhost:8000/AuthenticateKey?id=${key}`;
  testObj.key = key;
  testObj.testUrl = testUrl;

  const newTest = await Test.create(testObj);

  res.status(201).json({
    status: 'success',
    message: 'Test created successfully',
    data: {
      newTest,
    },
  });
});

exports.updateTest = catchAsync(async (req, res, next) => {
  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!test) {
    return next(new AppError('No test found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Test updated successfully',
    data: {
      test,
    },
  });
});

exports.deleteTest = catchAsync(async (req, res, next) => {
  const test = await Test.findByIdAndDelete(req.params.id);

  if (!test) {
    return next(new AppError('No test found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Test Deleted successfully',
    data: null,
  });
});
