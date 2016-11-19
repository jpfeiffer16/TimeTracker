

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
  //Setup

  const {
    Day,
    Task,
    Note,
    NoteCategory
  } = require('../storage/sqlite');

  //Days
  let getDays = function (cb) {
    Day.findAll({
      include: Task
    }).then((dbdays) => {
      // var days = dbdays.map((day) => {
      //   return day.dataValues.tasks.map((tasks) => {
      //     if (tasks.length > 0) {
      //       return tasks.map((task) => {
      //         return task.dataValues;
      //       });
      //     }
      //   });
      // });
      cb(dbdays.map((dbday) => {
        return dbday.toJSON();
      }));
      // cb(days);
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
    console.log(day);

    Day.findOrCreate({ where: { id: day.id }, defaults: day }).then((dbdays, created) => {
      let dbday = dbdays[0];
      // console.dir(dbday, { depth: 3 });
      // console.log();
      // Task.upsert(day);
      day.tasks.forEach((task) => {
        task.dayId = dbday.dataValues.id;
        Task.upsert(task);
      });
      cb();
    });
  };


  //Notes
  let getNotes = function (cb) {
  };

  let getNote = function (id, cb) {
  };

  let saveNote = function (note, cb) {
  };


  //Temporary
  let doImport = function (filepath, cb) {
    //Do importy stuff here
    // console.log('Doin importy stuff!', filepath);
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

          // fs.readFile(`${ filepath }/${ file }`, 'utf8', (err, data) => {
          //   if (err) throw err;
          //   // console.log(data);
          //   // console.log(data.match(/\d?\.?\d+\shours?/));
          //   let lines = data.replace('\r', '').split('\n');
          //   console.log(lines);
          //
          // });
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
    doImport
  }
};

module.exports = StorageManager();
