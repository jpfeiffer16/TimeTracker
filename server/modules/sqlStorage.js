const SqlStorageManager = function(models, Cache, Touch, Clear) {

  let Day,
      Task,
      Note,
      Category;

  Day = models.Day;
  Task = models.Task;
  Note = models.Note;
  Category = models.Category;

  //Days
  let getDays = function ({dateFrom, dateTo}, cb) {
    let where = {};
    if (dateFrom != undefined && dateTo != undefined) {
      where = {
        date: {
          $gt: dateFrom,
          $lt: dateTo
        }
      };
    }
    Cache((cache) =>
      Day.findAll({
        include: Task,
        where
      }).then((dbdays) => {
        cache(dbdays.map((dbday) => {
          return dbday.toJSON();
        }));
      }),
      cb,
      `${ dateFrom }-${ dateTo }`
    )
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
      Clear();
      cb(dbday.dataValues);
    });
  };

  let removeDay = function(id, cb) {
    Day.findById(id, {
      include: Task
    })
    .then((dbTask, other) => {
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
  let getNotes = function (params, cb) {
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

  let getCategories = function (params, cb) {
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

module.exports = SqlStorageManager;