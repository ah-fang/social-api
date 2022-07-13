const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 1 && length <= 280, 'Outside thought text limit.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal)

    }
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
