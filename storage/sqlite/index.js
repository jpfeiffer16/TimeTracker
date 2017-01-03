const SettingsManager = require('../../modules/settingsManager');

module.exports = function (initDBPath) {
  //DB connection
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: initDBPath
  });

  //Pull in models
  let Day = require('./day')(sequelize);
  let Note = require('./note')(sequelize);
  let Category = require('./category')(sequelize);
  let Task = require('./task')(sequelize);

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
};
