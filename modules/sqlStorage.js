//Setup
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './data.sqlite'
});

//Models
const day = require('../models/sqlite/day.js')(sequelize);
const note = require('../models/sqlite/note.js')(sequelize);
const noteCategory = require('../models/sqlite/noteCategory.js')(sequelize);
const task = require('../models/sqlite/day.js')(sequelize);

const StorageManager = function() {
  //Days
  let getDays = function (cb) {
    Day.findAll().then((days) => {
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
