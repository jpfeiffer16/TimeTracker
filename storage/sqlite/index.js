module.exports = (function () {
  //DB connection
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data.sqlite'
  });

  //Pull in models
  var Day = require('./day')(sequelize);
  var Note = require('./note')(sequelize);
  var NoteCategory = require('./noteCategory')(sequelize);
  var Task = require('./task')(sequelize);

  //Setup database associations here
  Task.belongsTo(Day, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });
  Day.hasMany(Task);
  // Task.belongsTo(Day);
  Note.belongsTo(NoteCategory, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });
  NoteCategory.hasMany(Note);
  // Note.belongsTo(NoteCategory);
  //Task.belongsTo(Day);
  //Note.belongsTo(NoteCategory);

  //Sync table schemas
  // Day.sync();
  // Task.sync();
  // Note.sync();
  // NoteCategory.sync();
  sequelize.sync().then(() => {
    //Do any stuff we need to here
  });


  //Exports
  return {
    Day,
    Task,
    Note,
    NoteCategory
  };
})();
