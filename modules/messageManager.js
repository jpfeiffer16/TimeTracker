const settings = require('electron-settings');
//const StorageManager = require('./storageManager');
const StorageManager = require('./sqlStorage');

const { app } = require('electron');
// settings.set('settings', {});
const MessageManager = function (ipcMain, callbackObj) {
  let testDay = {
      id: 123,
      date: Date.now(),
      tasks: [
        {
          description: 'Test',
          time: 1
        },
        {
          description: 'Test',
          time: 1
        },
        {
          description: 'Test',
          time: 1
        }
      ]
    }
  ipcMain.on('getDays', (event, args) => {
    //TODO: Mongoose code for pulling days here
    //event.sender.send('getDays', data); //When done
    // console.log(storageManager.isReady);
    // if (storageManager && storageManager.isReady) {
    StorageManager.getDays((days) => {
      event.sender.send('getDays', days);
    });
    // }
    // let mockReturn = [];
    // for (let i = 0; i < 10; i++) {
    //   mockReturn.push(JSON.parse(JSON.stringify(testDay)));
    // };
    // event.sender.send('getDays', mockReturn);
  });
  ipcMain.on('getDay', (event, id) => {
    // if (storageManager && storageManager.isReady) {
    StorageManager.getDay(id, (day) => {
      event.sender.send('getDay', day);
    });
    // }

    //TODO: Temp code
    // event.sender.send('getDay', testDay);
  });
  ipcMain.on('saveDay', (event, day) => {
    console.log('Saving day');
    // console.log(storageManager.isReady);
    console.log(day);
    // if (storageManager && storageManager.isReady) {
    StorageManager.saveDay(day, (day) => {
      event.sender.send('saveDay', day);
    });
    // }

    //TODO: Temp code
    // event.sender.send('getDay', testDay);
  });


  ipcMain.on('getNote', (event, id) => {
    //TODO: Mongoose code for pulling note here
   //event.sender.send('getDays', data); //When done

    StorageManager.getNote(id, (note) => {
      event.sender.send('getNote', note);
    });
  });
  ipcMain.on('getNotes', (event, args) => {
    //TODO: Mongoose code for pulling notes here
    //event.sender.send('getDays', data); //When done

    StorageManager.getNotes((notes) => {
      event.sender.send('getNotes', notes);
    });
  });

  ipcMain.on('saveNote', (event, note) => {
    console.log('Saving note');
    // console.log(storageManager.isReady);
    console.log(note);
    // if (storageManager && storageManager.isReady) {
    StorageManager.saveNote(note, (note) => {
      event.sender.send('saveNote', note);
    });
    // }

    //TODO: Temp code
    // event.sender.send('getDay', testDay);
  });

  ipcMain.on('getNoteCategories', (event, args) => {
    //TODO: Mongoose code for pulling categories here
   //event.sender.send('getDays', data); //When done
  });

  ipcMain.on('getNoteCategory', (event, id) => {
    //TODO: Mongoose code for pulling categories here
   //event.sender.send('getDays', data); //When done
  });
  ipcMain.on('saveNoteCategory', (event, category) => {
    //TODO: Mongoose code for pulling categories here
   //event.sender.send('getDays', data); //When done
  });
  ipcMain.on('getNotesByCategory', (event, args) => {
    //TODO: Mongoose code for pulling notes here
   //event.sender.send('getDays', data); //When done
  });

  //Settings
  ipcMain.on('getSettings', (event, args) => {
    settings.get('settings')
      .then(val => {
        event.sender.send('getSettings', val);
      });
  });
  ipcMain.on('saveSettings', (event, args) => {
    settings.set('settings', args)
      .then(val => {
        event.sender.send('saveSettings', val);
      });
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
