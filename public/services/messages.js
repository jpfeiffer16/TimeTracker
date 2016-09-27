const {ipcRenderer} = require('electron')
angular.module('app')
  .factory('MessagesService', function() {
    const sendMessage = (eventName, args, cb) => {
      ipcRenderer.once(eventName, cb);
      ipcRenderer.send(eventName, args);
    };
    const getDays = (cb) => {
      sendMessage('getDays', null, cb);
    };
    return {
      getDays
    }
  });
