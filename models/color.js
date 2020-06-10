const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colorSchema = new Schema({
  color: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Color', colorSchema);