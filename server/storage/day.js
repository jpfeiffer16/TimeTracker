const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const day = sequelize.define('day', {
    date: {
      type: Sequelize.DATE,
      field: 'date'
    }
  });

  return day;
};
