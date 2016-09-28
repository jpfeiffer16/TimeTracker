const mongoose = require('mongoose');
const Task = require('./task');
const daySchema = mongoose.Schema({
    date: Date,
    task: [Task]
});

module.exports = mongoose.model('Day', daySchema);