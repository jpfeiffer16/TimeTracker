let SettingsManager = require('./settingsManager');

const StorageManager = function() {

  let Day,
      Task,
      Note,
      Category;

  SettingsManager.getSettings((settings) => {
    let models = require('../storage/index.js')(settings.dbPath);
    Day = models.Day;
    Task = models.Task;
    Note = models.Note;
    Category = models.Category;
  });

  SettingsManager.on('settingChanged-dbPath', (info) => {
    console.log(`dbPath changed to ${ info.newValue }`);
    let models = require('../storage')(info.newValue);
    Day = models.Day;
    Task = models.Task;
    Note = models.Note;
    Category = models.Category;
  });

  //Days
  let getDays = function (cb) {
    Day.findAll({
      include: Task
    }).then((dbdays) => {
      cb(dbdays.map((dbday) => {
        return dbday.toJSON();
      }));
    });
  };

  let getDay = function (id, cb) {
    console.log('getDay, ', id);
    Day.findById(id, {
      include: Task
    }).then((dbday) => {
      if (dbday) {
        cb(dbday.toJSON());
      }
    });
  };

  let saveDay = function (day, cb) {
    Day.findOrCreate({ where: { id: day.id }, defaults: day })
    .then((dbdays, created) => {
      let dbday = dbdays[0];
      console.log('saveDay, ');
      console.log(dbday.dataValues);
      day.tasks.forEach((task) => {
        task.dayId = dbday.dataValues.id;
        Task.upsert(task);
      });
      cb(dbday.dataValues);
    });
  };

  let removeDay = function(id, cb) {
    Day.findById(id, {
      include: Task
    })
    .then((dbTask) => {
      if (dbTask) {
        return dbTask.destroy({ force: true });
      }
    })
    .then(() => {
      cb();
    });
  };

  let removeTask = function(id, cb) {
    Task.findById(id)
    .then((dbTask) => {
      if (dbTask) {
        return dbTask.destroy({ force: true });
      }
    })
    .then(() => {
      cb();
    });
  };

  //Notes
  let getNotes = function (cb) {
    Note.findAll().then((dbnotes) => {
      cb(dbnotes.map((dbnote) => {
        return dbnote.toJSON();
      }));
    });
  };

  let getNote = function (id, cb) {
    Note.findById(id).then((dbnote) => {
      cb(dbnote.toJSON());
    });
  };

  let saveNote = function (note, cb) {
    Note.upsert(note).then(cb);
  };

  let removeNote = function(id, cb) {
    Note.findById(id)
    .then((dbNote) => {
      if (dbNote) {
        return dbNote.destroy({ force: true });
      }
    })
    .then(() => {
      cb();
    });
  }

  let getCategories = function (cb) {
    console.log('getting all categories');
    Category.findAll().then((dbcategories) => {
      cb(dbcategories.map((dbcategory) => {
        return dbcategory.toJSON();
      }));
    });
  };

  let getCategory = function (id, cb) {
    Category.findById(id).then((dbcategory) => {
      cb(dbcategory.toJSON());
    });
  };

  let saveCategory = function (category, cb) {
    Category.upsert(category).then(cb);
  };

  let removeCategory = function(id, cb) {
    Note.findAll({ where: { categoryId: id } })
      .then((dbCategories) => {
        console.log(dbCategories.length);
        if (dbCategories.length != 0) {
          cb({
            message: 'Unable to delete category. There are notes using this category'
          });
        } else {
          Category.findById(id)
            .then((dbCategory) => {
              if (dbCategory != null) {
                dbCategory.destroy({ force: true })
                  .then(() => {
                    cb();
                  });
              }
            });
        }
      });
    // Note.findById(id)
    // .then((dbCategory) => {
    //   if (dbCategory) {
    //     return dbCategory.destroy({ force: true });
    //   }
    // })
    // .then(() => {
    //   cb();
    // });
  }

  //Temporary
  let doImport = function (filepath, cb) {
    //Do importy stuff here
    const fs = require('fs');

    fs.readdir(filepath, 'utf8', (err, files) => {
      if (err) throw err;
      let anomWriter = fs.createWriteStream(`${ filepath }/anom.txt`);
      files.forEach((file) => {
        (function (file) {
          let day = {
            date: new Date(file.replace('.txt', ''))
          }
          Day.create(day).then((savedday) => {
            let lineReader = require('readline').createInterface({
              input: fs.createReadStream(`${ filepath }/${ file }`)
            });

            let dayTotal = 0;
            lineReader.on('line', function (line) {
              if (!line.trim().length == 0) {
                let parts = line.split(' - ');
                if (parts.length != 2) return;

                let time = parts[1];

                let hoursMatches = time.match(/\d?\.?\d+\shours?/g);
                let minutesMatches = time.match(/\.?\d+\sminutes?|\.?\d+\smins?/g);

                let hoursTotal = 0;

                if (hoursMatches) {
                  hoursMatches.forEach((match) => {
                    hoursTotal += Number.parseFloat(match);
                  });
                }

                if (minutesMatches) {
                  minutesMatches.forEach((match) => {
                    hoursTotal += (Number.parseFloat(match)/60);
                  });
                }

                //Anomaly tracking
                dayTotal += hoursTotal;

                let task = {
                  description: parts[0],
                  time: hoursTotal
                };
                task.dayId = savedday.dataValues.id;
                Task.create(task).then((savedtask) => {
                  console.log(task);
                });

              }
            });
            //Anomaly tracking
            lineReader.on('close', () => {
              if (dayTotal > 14 || dayTotal < 8) {
                anomWriter.write(file + '\n');
              }
            });
          });
        })(file);
      });
    });
  };

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
    removeCategory,
    doImport
  }
};

module.exports = StorageManager();