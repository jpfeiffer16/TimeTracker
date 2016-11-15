const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const noteCategory = sequelize.define('noteCategory', {
    name: {
      type: Sequelize.STRING,
      field: 'date'
    }
  });

  return noteCategory;
};
