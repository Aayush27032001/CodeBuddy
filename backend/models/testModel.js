const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    questionID: {

    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;