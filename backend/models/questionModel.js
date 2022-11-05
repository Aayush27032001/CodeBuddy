const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    statement:{
        type: String,
        required: true,
    },
    sampleInput: {
        type: [String],
        required: true,
    },
    sampleOutput: {
        type: [String],
        required: true,
    },
    hiddenInput: {
        type: [String],
        required: true,
    },
    hiddenOutput: {
        type: [String],
        required: true,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

const Question =mongoose.model('Question', questionSchema);
module.exports = Question;