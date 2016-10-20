const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const noteSchema = Schema({
  category: Schema.Types.ObjectId,
  title: String,
  text: String
});

module.exports = mongoose.model('Note', noteSchema);