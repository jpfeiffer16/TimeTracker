const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron');
//const MessageManager = require('./modules/messageManager');
const path = require('path');

//var Sequelize = require('sequelize');
//var sequelize = new Sequelize('database', 'username', 'password', {
//    dialect: 'sqlite',
//    storage: './database.sqlite'
//});

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
 
db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");
   
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
    stmt.finalize();
   
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            console.log(row.id + ": " + row.info);
        });
});
 
db.close();

//Setup custom process communication code
//MessageManager(ipcMain, {
//  createWindow
//});

// let monitorWidth, monitorHeight = 0;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray
const iconPath = path.join(__dirname, 'icon.png');

//TODO: This code is not great. Needs to be refactored before it causes problems.
function createWindow (path) {
  // Create the browser window.
  //TODO: Do more calculations here. If the screen is small, the window should be bigger.
  const {width, height} = require('electron').screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({width: width / 2, height:  height / 2, frame: false, icon: iconPath});
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html#${path}`);

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow('');

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  tray.setToolTip('TimeTracker');
  tray.setContextMenu(contextMenu);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// let outlook = require("node-outlook");

// var queryParams = {
//   '$select': 'Subject,ReceivedDateTime,From',
//   '$orderby': 'ReceivedDateTime desc',
//   '$top': 10
// };

// // Set the API endpoint to use the v2.0 endpoint
// outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
// // Set the anchor mailbox to the user's SMTP address
// // outlook.base.setAnchorMailbox(email);

// outlook.mail.getMessages({token: 'ZxuNHh0e4xgim0bYYKhaQGK', odataParams: queryParams},
//   function(error, result){
//     if (error) {
//       console.log('getMessages returned an error: ' + error);
//     }
//     else if (result) {
//       console.log('getMessages returned ' + result.value.length + ' messages.');
//       result.value.forEach(function(message) {
//         console.log('  Subject: ' + message.Subject);
//         var from = message.From ? message.From.EmailAddress.Name : "NONE";
//         console.log('  From: ' + from);
//         console.log('  Received: ' + message.ReceivedDateTime.toString());
//       });
//     }
//   });
