const Sequelize = require('sequelize');
module.exports = function (sequelize) {
  const note = sequelize.define('note', {
    date: {
      type: Sequelize.DATE,
      field: 'date' 
    }
  });

  note.sync();

  return note;
};
