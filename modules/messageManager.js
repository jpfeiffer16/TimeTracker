const settings = require('electron-settings');
// settings.set('settings', {});
const MessageManager = (ipcMain) => {
  ipcMain.on('getDays', (event, args) => {
    //TODO: Mongoose code for pulling days here
    //event.sender.send('getDays', data); //When done
    let testDay = {
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
    let mockReturn = [];
    for (let i = 0; i < 10; i++) {
      mockReturn.push(JSON.parse(JSON.stringify(testDay)));
    };
    event.sender.send('getDays', mockReturn);
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
};

module.exports = MessageManager;
