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
    return {
      getDays,
      getDay
    }
  });
