const SettingsManager = require('./settingsManager');
const request = require('request');

const StorageManager = function() {
  SettingsManager.on('settingChanged-dbPath', (info) => {
    //TODO: Send update here
  });

  //Days
  let getDays = function (dateFrom, dateTo, cb) {
    request.post(
      'http://127.0.0.1:3000/getDays',
      {
        body: {
          params: [
            dateFrom,
            dateTo
          ]
        },
        json: true
      },
      (err, response) => {
        cb(err, response.body);
      }
    )
  };

  let getDay = function (id, cb) {
    
  };

  let saveDay = function (day, cb) {
    
  };

  let removeDay = function(id, cb) {
    
  };

  let removeTask = function(id, cb) {
    
  };

  //Notes
  let getNotes = function (cb) {
    
  };

  let getNote = function (id, cb) {
    
  };

  let saveNote = function (note, cb) {
    
  };

  let removeNote = function(id, cb) {
    
  }

  let getCategories = function (cb) {
    
  };

  let getCategory = function (id, cb) {
    
  };

  let saveCategory = function (category, cb) {
  };

  let removeCategory = function(id, cb) {
    
  }

  //Exports
  return {
    getDays,
    getDay,
    saveDay,
    removeDay,
    removeTask,
    getNotes,
    getNote,
    saveNote,
    removeNote,
    getCategories,
    getCategory,
    saveCategory,
    removeCategory
  }
};

module.exports = StorageManager();