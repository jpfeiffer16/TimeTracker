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
    }
  });

  return task;
};
