const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const authController = require('../controllers/authController');

router.patch(
  '/updateMyTest/:testID',
  authController.protect,
  testController.updateMyTest
);

router.delete(
  '/deleteMyTest/:testID',
  authController.protect,
  testController.deleteMyTest
);

router
  .route('/')
  .get(authController.protect, testController.getAllTests)
  .post(authController.protect, testController.createTest);

router
  .route('/:id')
  .get(authController.protect, testController.getTest)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    testController.updateTest
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    testController.deleteTest
  );

module.exports = router;
