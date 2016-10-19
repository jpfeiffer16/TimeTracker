angular.module('app')
  .factory('TimeManager', function(MessagesService) {
    const getDays = (cb) => {
      MessagesService.sendMessage('getDays', cb);
    };
    const getDay = (id, cb) => {
      MessagesService.sendMessage('getDay', id, function(day) {
        day.date = new Date(day.date);
        cb(day);
      });
    };
    const saveDay = (day, cb) => {
      MessagesService.sendMessage('saveDay', day, function(day) {
        cb(day);
      });
    };
    return {
      getDays,
      getDay,
      saveDay
    }
  });
