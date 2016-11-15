//Setup

const {
  Day,
  Task,
  Note,
  NoteCategory
} = require('../storage/sqlite');

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('database', 'username', 'password', {
//     dialect: 'sqlite',
//     storage: './data.sqlite'
// });

//Models
// const Day = require('../models/sqlite/day.js')(sequelize);
// const Note = require('../models/sqlite/note.js')(sequelize);
//const NoteCategory = require('../models/sqlite/noteCategory.js')(sequelize);
//const Task = require('../models/sqlite/day.js')(sequelize);

const StorageManager = function() {
  //Days
  let getDays = function (cb) {
    Day.findAll().then((dbdays) => {
      var days = dbdays.map((day) => {
        return day.dataValues;
      });
      console.log(days);
      cb(days);
    });
  };

  let getDay = function (id, cb) {
    Day.findOne({
      id: id
    }).then((day) => {
      cb(day);
    });
  };

  let saveDay = function (day, cb) {
    Day.findOne({
      id: day.id
    }).then((dbday) => {
      if (dbday) {
        //Update here
        dbday.updateAttibutes(day)
          .then(cb);
      } else {
        //Insert here
        Day.create(day)
          .then(cb);
      }
    });
  };


  //Notes
  let getNotes = function (cb) {
  };

  let getNote = function (id, cb) {
  };

  let saveNote = function (note, cb) {
  };


  //Exports
  return {
    getDays,
    getDay,
    saveDay,
    getNotes,
    getNote,
    saveNote,
  }
};

module.exports = StorageManager();
