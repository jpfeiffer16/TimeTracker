const mongoose = require('mongoose');
const Day = require('../models/mongo/day');
const Note = require('../models/mongo/note');
const NoteCategory = require('../models/mongo/noteCategory');
const Task = require('../models/mongo/task');

const StorageManager = function (connectionString) {
  // let isReady = false;
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
        // isReady = true;
        // console.log(isReady);
        // new require('../models/day')({
        //   date: new Date,
        //   tasks: [
        //     {
        //       description: 'Test',
        //       time: 1
        //     },
        //     {
        //       description: 'Test',
        //       time: 1
        //     }
        //   ]
        // }).save();

        new Note({
          category: null,
          title: 'test',
          text: 'test'
        }).save();
      });
      mongoose.connect(connectionString);
    }
  };

  //Days
  let getDays = function (cb) {
    // if (!isReady) return;
    Day.find((err, days) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log(days);
      cb(JSON.parse(JSON.stringify(days)));
    });
  };

  let getDay = function (id, cb) {
    // if (!isReady) return;
    console.log('Getting day');
    console.log(id);
    Day.findOne({ _id: id }, (err, day) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(JSON.parse(JSON.stringify(day)));
    });
  };

  let saveDay = function (day, cb) {
    // if (!isReady) return;
    // new Day(day)
    //   .save((err, day) => {
    //   console.log('Saved');
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   cb(day);
    // });
    // console.log(`day: ${ day }`);
    // console.log(`id: ${ day.id }`);
    Day.findOne({ _id: day._id }, (err, foundday) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Day: ${ foundday }`);
      if (foundday != null) {
        //Update
        Day.findOneAndUpdate({ _id: day._id }, day, (foundday) => {
          cb(foundday);
        });
      } else {
        //Save
        new Day(day)
          .save((err, day) => {
            console.log('Saved');
            if (err) {
              console.error(err);
              return;
            }
            cb(day);
          });
      }
    });
  };



  //Notes
  let getNotes = function (cb) {
    Note.find((err, notes) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(JSON.parse(JSON.stringify(notes)));
    });
  };

  let getNote = function (id, cb) {
    Note.findOne({_id: id}, (err, note) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(JSON.parse(JSON.stringify(note)));
    });
  };

  let saveNote = function (note, cb) {
    // new Note(note)
    //   .save((err, note) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     cb(note);
    //   });

    Note.findOne({ _id: note._id }, (err, foundnote) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Note: ${ foundnote }`);
      if (foundnote != null) {
        //Update
        Day.findOneAndUpdate({ _id: note._id }, note, (foundnote) => {
          cb(foundnote);
        });
      } else {
        //Save
        new Note(note)
          .save((err, savedNote) => {
            console.log('Saved');
            if (err) {
              console.error(err);
              return;
            }
            cb(savedNote);
          });
      }
    });
  };

  init(connectionString);

  //Exports
  return {
    // isReady,
    getDays,
    getDay,
    saveDay,
    getNotes,
    getNote,
    saveNote, 
  }
}

module.exports = StorageManager;
