const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const category = sequelize.define('category', {
    name: {
      type: Sequelize.STRING,
    }
  });

  return category;
};
