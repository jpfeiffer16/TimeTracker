module.exports = (function () {
  //DB connection
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      storage: '../../data.sqlite'
  });

  //Pull in models
  var Day = require('./day')(sequelize);
  var Note = require('./note')(sequelize);
  var NoteCategory = require('./noteCategory')(sequelize);
  var Task = require('./task')(sequelize);

  //Setup database associations here
  Task.belongsTo(Day);
  Note.belongsTo(NoteCategory);

  //Sync table schemas
  Day.sync();
  Task.sync();
  Note.sync();
  NoteCategory.sync();


  //Exports
  return {
    Day,
    Task,
    Note,
    NoteCategory
  };
})();
