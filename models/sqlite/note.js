module.exports = function (connection) {
  const note = sequelize.define('note', {
    date: {
      type: Sequelize.DATE,
      field: 'date' 
    }
  });

  note.sync();

  return day;
};
