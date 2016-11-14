const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
  description: String,
  time: Number
});

module.exports = mongoose.model('Task', taskSchema);