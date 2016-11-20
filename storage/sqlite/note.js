const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const note = sequelize.define('note', {
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    }
  });

  return note;
};
