angular.module('app')
  .factory('SettingsManager', function(MessagesService) {
    const getSettings = (cb) => {
      MessagesService.sendMessage('getSettings', cb);
    };
    const saveSettings = (settings, cb) => {
      MessagesService.sendMessage('saveSettings', settings, cb);
    };

    return {
      getSettings,
      saveSettings,
    }
  });
