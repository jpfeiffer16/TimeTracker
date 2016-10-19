const settings = require('electron-settings');
const StorageManager = require('./storageManager');
let storageManager = null;

settings.get('settings.mongoURL')
  .then(val => {
    // console.log(val);
    if (val != undefined && val != '')
      storageManager = StorageManager(val);
  });

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
    if (storageManager && storageManager.isReady) {
      storageManager.getDays((days) => {
        event.sender.send('getDays', days);
      });
    }
    // let mockReturn = [];
    // for (let i = 0; i < 10; i++) {
    //   mockReturn.push(JSON.parse(JSON.stringify(testDay)));
    // };
    // event.sender.send('getDays', mockReturn);
  });
  ipcMain.on('getDay', (event, id) => {
    if (storageManager && storageManager.isReady) {
      storageManager.getDay(id, (day) => {
        event.sender.send('getDay', day);
      });
    }

    //TODO: Temp code
    // event.sender.send('getDay', testDay);
  });
  ipcMain.on('saveDay', (event, day) => {
    console.log('Saving day');
    console.log(storageManager.isReady);
    console.log(day);
    if (storageManager && storageManager.isReady) {
      storageManager.saveDay(day, (day) => {
        event.sender.send('getDay', day);
      });
    }

    //TODO: Temp code
    // event.sender.send('getDay', testDay);
  });


  ipcMain.on('getNote', (event, args) => {
    //TODO: Mongoose code for pulling note here
   //event.sender.send('getDays', data); //When done
  });
  ipcMain.on('getAllNotes', (event, args) => {
    //TODO: Mongoose code for pulling notes here
   //event.sender.send('getDays', data); //When done
  });
  ipcMain.on('getNoteCategories', (event, args) => {
    //TODO: Mongoose code for pulling categories here
   //event.sender.send('getDays', data); //When done
  });
  ipcMain.on('getNotesByCategory', (event, args) => {
    //TODO: Mongoose code for pulling notes here
   //event.sender.send('getDays', data); //When done
  });
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

  //App controllers
  ipcMain.on('closeApp', (event, args) => {
    app.quit();
  });

  ipcMain.on('openLinkInNewWindow', (event, args) => {
    callbackObj.createWindow(args);
  });
};

module.exports = MessageManager;
