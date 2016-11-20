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
  var Category = require('./category')(sequelize);
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
  Note.belongsTo(Category, {
    onDelete: "CASCADE",
  });
  Category.hasMany(Note);

  //Sync table schemas
  sequelize.sync().then(() => {
    //Do any stuff we need to here
  });


  //Exports
  return {
    Day,
    Task,
    Note,
    Category
  };
})();
