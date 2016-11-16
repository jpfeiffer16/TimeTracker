angular.module('app')
  .factory('SettingsManager', function(MessagesService) {
    const getSettings = (cb) => {
      MessagesService.sendMessage('getSettings', cb);
    };
    const saveSettings = (settings, cb) => {
      MessagesService.sendMessage('saveSettings', settings, cb);
    };
    //Temporary
    const doImport = (filepath, cb) => {
      MessagesService.sendMessage('import', filepath, cb);
    };

    return {
      getSettings,
      saveSettings,
      doImport
    }
  });
