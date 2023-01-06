const short = require('short-uuid');
const Test = require('../models/testModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

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
  testObj.createdBy = req.user.id;

  const newTest = await Test.create(testObj);
  newTest.active = undefined;

  res.status(201).json({
    status: 'success',
    message: 'Test created successfully',
    data: {
      test: newTest,
    },
  });
});

exports.updateMyTest = catchAsync(async (req, res, next) => {
  // check if such test exist
  const test = await Test.findById(req.params.testID);

  if (!test) {
    return next(new AppError('No test found with that ID', 400));
  }

  // check if this user created this test
  if (test.createdBy !== req.user.id) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }

  // filter unwanted data
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'company',
    'Question',
    'duration'
  );

  const updatedTest = await Test.findByIdAndUpdate(test._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  updatedTest.active = undefined;

  res.status(200).json({
    status: 'success',
    message: 'Test updated successfully',
    data: {
      test: updatedTest,
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

  test.active = undefined;

  res.status(200).json({
    status: 'success',
    message: 'Test updated successfully',
    data: {
      test,
    },
  });
});

exports.deleteMyTest = catchAsync(async (req, res, next) => {
  // check if such test exist
  const test = await Test.findById(req.params.testID);

  if (!test) {
    return next(new AppError('No test found with that ID', 400));
  }

  // check if this user created this test
  if (test.createdBy !== req.user.id) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }

  await Test.findByIdAndUpdate(test._id, { active: false });

  res.status(204).json({
    status: 'success',
    message: 'test deleted successfully',
    data: null,
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
