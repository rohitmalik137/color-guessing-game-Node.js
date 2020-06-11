const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colorSchema = new Schema({
  color: {
    type: Array,
    required: true
  },
  answerColor: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  dummy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Color', colorSchema);