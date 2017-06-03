const SettingsManager = require('./settingsManager');
const StorageManager = require('./sqlStorage');

const { app } = require('electron');

const MessageManager = function (ipcMain, callbackObj) {
  ipcMain.on('getDays', (event, args) => {
    // let { dateFrom, dateTo } = args;
    console.log(args);
    StorageManager.getDays((days, dateFrom, dateTo) => {
      event.sender.send('getDays', days);
    });
  });
  ipcMain.on('getDay', (event, id) => {
    StorageManager.getDay(id, (day) => {
      event.sender.send('getDay', day);
    });
  });
  ipcMain.on('saveDay', (event, day) => {
    // console.log('Saving day');
    // console.log(day);
    StorageManager.saveDay(day, (day) => {
      event.sender.send('saveDay', day);
    });
  });

  ipcMain.on('removeDay', (event, id) => {
    StorageManager.removeDay(id, () => {
      event.sender.send('removeDay', {});
    });
  });

  ipcMain.on('removeTask', (event, id) => {
    StorageManager.removeTask(id, () => {
      event.sender.send('removeTask', {});
    });
  });

  ipcMain.on('getNote', (event, id) => {
    StorageManager.getNote(id, (note) => {
      event.sender.send('getNote', note);
    });
  });
  ipcMain.on('getNotes', (event, args) => {
    StorageManager.getNotes((notes) => {
      event.sender.send('getNotes', notes);
    });
  });

  ipcMain.on('saveNote', (event, note) => {
    StorageManager.saveNote(note, (note) => {
      event.sender.send('saveNote', note);
    });
  });

  ipcMain.on('removeNote', (event, noteId) => {
    StorageManager.removeNote(noteId, () => {
      event.sender.send('removeNote');
    });
  });

  ipcMain.on('getCategories', (event, args) => {
    StorageManager.getCategories((categories) => {
      event.sender.send('getCategories', categories);
    });
  });

  ipcMain.on('getCategory', (event, id) => {
    StorageManager.getCategory(id, (category) => {
      event.sender.send('getCategory', category);
    });
  });

  ipcMain.on('saveCategory', (event, category) => {
    StorageManager.saveCategory(category, () => {
      event.sender.send('saveCategory');
    });
  });

  ipcMain.on('removeCategory', (event, id) => {
    StorageManager.removeCategory(id, (err) => {
      event.sender.send('removeCategory', err);
    });
  });

  ipcMain.on('getNotesByCategory', (event, args) => {
   //TODO: Needs to be implemented. Not currently used.
  });

  //Settings
  ipcMain.on('getSettings', (event, args) => {
    SettingsManager.getSettings(val => {
      event.sender.send('getSettings', val);
    });
    // settings.get('settings')
    //   .then(val => {
    //     event.sender.send('getSettings', val);
    //   });
  });
  ipcMain.on('saveSettings', (event, args) => {
    SettingsManager.saveSettings(args, val => {
      event.sender.send('saveSettings', val);
    });
    // settings.set('settings', args)
    //   .then(val => {
    //     event.sender.send('saveSettings', val);
    //   });
  });

  //Temporary
  ipcMain.on('import', (event, args) => {
    StorageManager.doImport(args, () => {
      event.sender.send('import', {});
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
