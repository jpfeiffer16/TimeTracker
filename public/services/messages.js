const {ipcRenderer} = require('electron')
angular.module('app')
  .factory('MessagesService', function() {
    const sendMessage = (eventName, ...rest) => {
      let cb = function () {}
      let args = null;
      if (rest.length == 2) {
        cb = rest[1];
        args = rest[0];
      }
      if (rest.length == 1) {
        cb = rest[0];
      }

      ipcRenderer.once(eventName, (event, args) => {
        if (cb) cb(args);
      });
      console.log(args);
      ipcRenderer.send(eventName, args);
    };
    return {
      sendMessage
    }
  });
