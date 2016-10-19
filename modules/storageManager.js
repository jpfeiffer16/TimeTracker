const mongoose = require('mongoose');
const Day = require('../models/day');
const Note = require('../models/note');
const NoteCategory = require('../models/noteCategory');
const Task = require('../models/task');

const StorageManager = function (connectionString) {
  let isReady = false;
  let db = null;

  let init = function (connectionString) {
    if (connectionString) {
      //TODO: Connect here
      console.log(connectionString);
      
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function() {
        // we're connected!
        console.log(`Connected to ${ connectionString }`);
        isReady = true;
        new require('../models/day')({
          date: new Date,
          tasks: [
            {
              decription: 'Test',
              time: 1
            }
          ]
        }).save();
      });
      mongoose.connect(connectionString);
    }
  };

  let getDays = function (cb) {
    if (!isReady) return;
    Day.find((err, days) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(days);
    });
  };

  let getDay = function (id) {
    if (!isReady) return;
    Day.findOne({ id: id }, (err, days) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(days);
    });
  };

  let saveDay = function (day, cb) {
    if (!isReady) return;
    let mongooseDay = new Day({
      id: day.id,
      date: day.date,
      tasks: day.tasks
    });
    mongooseDay.save((err, day) => {
      console.log('Saved');
      if (err) {
        console.error(err);
        return;
      }
      cb(day);
    });
  };


  let getNotes = function () {
    if (!isReady) return;
    //TODO: Logic here
  };

  let getNote = function () {
    if (!isReady) return;
    //TODO: Logic here
  };

  let saveNote = function () {
    if (!isReady) return;
    //TODO: Logic here
  };

  init(connectionString);

  //Exports
  return {
    isReady,
    getDays,
    getDay,
    saveDay,
    getNotes,
    getNote,
    saveNote, 
  }
}

module.exports = StorageManager;