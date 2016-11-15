const mongoose = require('mongoose');
const Task = require('./task');
const daySchema = mongoose.Schema({
    date: Date,
    tasks: [{ 
        description: String,
        time: Number
     }]
});

module.exports = mongoose.model('Day', daySchema);