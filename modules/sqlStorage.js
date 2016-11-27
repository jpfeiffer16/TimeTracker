const StorageManager = function() {
  //Setup

  const {
    Day,
    Task,
    Note,
    Category
  } = require('../storage/sqlite');

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
    Day.findById(id, {
      include: Task
    }).then((dbday) => {
      cb(dbday.toJSON());
    });
  };

  let saveDay = function (day, cb) {
    Day.findOrCreate({ where: { id: day.id }, defaults: day }).then((dbdays, created) => {
      let dbday = dbdays[0];
      day.tasks.forEach((task) => {
        task.dayId = dbday.dataValues.id;
        Task.upsert(task);
      });
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

  //Temporary
  let doImport = function (filepath, cb) {
    //Do importy stuff here
    const fs = require('fs');

    fs.readdir(filepath, 'utf8', (err, files) => {
      if (err) throw err;
      let anomWriter = fs.createWriteStream(`${ filepath }/anom.txt`);
      let limiter = 0;
      files.forEach((file) => {
        // if (limiter > 5) return;
        (function (file) {
          let day = {
            date: new Date(file.replace('.txt', ''))
          }
          Day.create(day).then((savedday) => {
            let lineReader = require('readline').createInterface({
              input: fs.createReadStream(`${ filepath }/${ file }`)
            });

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
                if (hoursTotal > 14 || hoursTotal < 8) {
                  anomWriter.write(file + '\n');
                }

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
          });
        })(file);

        limiter++;
      });
    });
  };

  //Exports
  return {
    getDays,
    getDay,
    saveDay,
    getNotes,
    getNote,
    saveNote,
    getCategories,
    getCategory,
    saveCategory,
    doImport
  }
};

module.exports = StorageManager();
