const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const noteCategorySchema = Schema({
  name: String
});

module.exports = mongoose.model('NoteCategory', noteCategorySchema);