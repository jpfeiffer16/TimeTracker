angular.module('app')
  .factory('TimeManager', function(MessagesService) {
    const getDays = (args, cb) => {
      MessagesService.sendMessage('getDays', args, cb);
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

    const removeDay = (id, cb) => {
      MessagesService.sendMessage('removeDay', id, cb);
    };

    const removeTask = (id, cb) => {
      MessagesService.sendMessage('removeTask', id, cb);
    };
    return {
      getDays,
      getDay,
      saveDay,
      removeDay,
      removeTask
    }
  });
