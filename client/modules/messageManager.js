const SettingsManager = require('./settingsManager');
const StorageManager = require('./Storage');

const { app } = require('electron');

const MessageManager = function (ipcMain, callbackObj) {
  //App controllers
  ipcMain.on('closeApp', (event, args) => {
    app.quit();
  });

  ipcMain.on('openLinkInNewWindow', (event, args) => {
    callbackObj.createWindow(args);
  });
};

module.exports = MessageManager;
