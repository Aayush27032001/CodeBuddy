const express = require('express');
const router = express.Router();
const {
  getAllTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
} = require('../controllers/testController');

// prettier-ignore
router
.route('/')
.get(getAllTests)
.post(createTest);

// prettier-ignore
router
.route('/:id')
.get(getTest)
.patch(updateTest)
.delete(deleteTest);

module.exports = router;
