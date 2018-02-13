const SettingsManager = require('./settingsManager');

const { app } = require('electron');

const MessageManager = function (ipcMain, callbackObj) {
  //Settings
  ipcMain.on('getSettings', (event, args) => {
    SettingsManager.getSettings(val => {
      event.sender.send('getSettings', val);
    });
  });
  ipcMain.on('saveSettings', (event, args) => {
    SettingsManager.saveSettings(args, val => {
      event.sender.send('saveSettings', val);
    });
  });

  //App controllers
  ipcMain.on('closeApp', (event, args) => {
    app.quit();
  });

  ipcMain.on('openLinkInNewWindow', (event, args) => {
    callbackObj.createWindow(args);
  });
};

module.exports = MessageManager;
