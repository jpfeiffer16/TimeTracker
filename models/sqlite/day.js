const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const day = sequelize.define('day', {
    date: {
      type: Sequelize.DATE,
      field: 'date' 
    }
  });

  //day.sync({force: true});
  day.sync();

  return day;
};
