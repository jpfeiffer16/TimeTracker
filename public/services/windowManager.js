//Window actions here
const { remote } = require('electron');
var window = remote.getCurrentWindow();
angular.module('app')
  .factory('WindowManager', function() {
    const closeWindow = () => {
      window.close();
    };

    return {
      closeWindow
    };
  });
