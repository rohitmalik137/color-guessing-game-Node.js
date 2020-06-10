const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  color: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Answer', answerSchema);