const express = require('express');
const router = express.Router();
const {
  getAllResults,
  getResult,
  createResult,
  updateResult,
  deleteResult,
} = require('../controllers/resultController');

// prettier-ignore
router
.route('/')
.get(getAllResults)
.post(createResult);

// prettier-ignore
router
.route('/id')
.get(getResult)
.patch(updateResult)
.delete(deleteResult);

module.exports = router;
