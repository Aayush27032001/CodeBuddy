const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  testID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: [true, 'Please enter the test ID'],
    unique: true,
  },
  testKey: {
    type: String,
    required: [true, 'Please enter test key'],
    unique: true,
  },
  candidate: {
    type: [
      {
        name: {
          type: String,
          required: [true, "Please enter candidate's name"],
        },
        email: {
          type: String,
          required: [true, "Please enter candidate's email"],
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    validate: {
      validator: function () {
        if (this.name === '' || this.email === '') return false;
        else return true;
      },
      message: 'Please enter valid candidate details',
    },
  },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
