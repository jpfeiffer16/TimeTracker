const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const task = sequelize.define('task', {
    description: {
      type: Sequelize.STRING,
      field: 'description'
    },
    time: {
      type: Sequelize.INTEGER,
      field: 'time'
    },
    synced: {
      type: Sequelize.BOOLEAN,
      field: 'synced'
    }
  });

  return task;
};
