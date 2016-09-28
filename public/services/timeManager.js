angular.module('app')
  .factory('TimeManager', function(MessagesService) {
    const getDays = (cb) => {
      MessagesService.sendMessage('getDays', cb);
    };
    return {
      getDays
    }
  });
