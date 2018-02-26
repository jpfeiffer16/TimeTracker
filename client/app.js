const {app, BrowserWindow, Tray, Menu, ipcMain, Notification} = require('electron');
const MessageManager = require('./modules/messageManager');
const path = require('path');
const Scheduler = require('./modules/scheduler');
const notify = require('electron-main-notification');
const databacker = require('databacker-client');
require('dotenv').config({ path: './client/.env' });
const SettingsManager = require('./modules/settingsManager');
const fs = require('fs');
// Scheduler.register(new Date(new Date().getTime() + 60000), () => {
//   notify('This is a notification!', { body: 'See? Really easy to use!' }, () => {
//     console.log('Scheduler callback! Notification has been clicked.');
//   });
// });




Scheduler.registerFirstTaskOfDay(() => {
  console.log('FirstDay Task!');
  SettingsManager.getSettings((settings) => {
    // console.log(settings);
    if (!settings || !settings.dbPath) return;
    fs.readFile(settings.dbPath, (err, file) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        //Do databacker push here.
        if (
          !settings.databacker ||
          !settings.databacker.username ||
          !settings.databacker.password
        ) {
          return;
        }
        databacker.push(
          settings.databacker.username,
          settings.databacker.password,
          'TimeTrackerBackup',
          file
        );
      } catch (e) {
        console.error(e);
        return;
      }
    });
  });
});

// var ESI = require('electron-single-instance');
// ESI.ensureSingleInstance('TimeTracker');

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('database', 'username', 'password', {
//     dialect: 'sqlite',
//     storage: './database.sqlite'
// });

//Setup custom process communication code
MessageManager(ipcMain, {
  createWindow
});

// let monitorWidth, monitorHeight = 0;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let win
let windows = [];
let tray
const iconPath = path.join(__dirname, 'images','icon.png');

//TODO: This code is not great. Needs to be refactored before it causes problems.
function createWindow (path) {
  // Create the browser window.
  //TODO: Do more calculations here. If the screen is small, the window should be bigger.
  const {width, height} = require('electron').screen.getPrimaryDisplay().workAreaSize;
  // win = new BrowserWindow({width: width / 2, height:  height / 2, frame: false, icon: iconPath});
  let win = new BrowserWindow({width: width / 2, height:  height / 2, icon: iconPath});
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html#!${path}`);
  
  // Open the DevTools.
  if (process.env.SHOW_DEVTOOLS == 'true')
    win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // win = null
    cleanUpWindow(win);
  });
  windows.push({
    window: win
  });
}

// function closeWindow(windowRef) {
//   windowRef.close();
//   cleanUpWindow(windowRef);
// }

function cleanUpWindow(windowRef) {
  //Remove the window from the windows array
  for (let i = 0; i < windows.length; i++) {
    let currentWindow = windows[i].window;
    if (currentWindow === windowRef) {
      windows.splice(i, 1);
    }
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow('');

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Close All Windows',
      click() {
        windows.map((window) => {
          return window.window;
        }).forEach((window) => {
          window.close();
        });
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click() {
        quit();
      }
    }
  ]);
  tray.setToolTip('TimeTracker');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    //If there is one window, focus it. If there are more than one,
    //focus the last used one. If there are none, create one.
    // createWindow('');
    //One or more windows

    windows.forEach((window) => {
      window.window.focus();
    });

    //No windows
    if (windows.length == 0) {
      createWindow('');
    }

  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows.length == 0) {
    createWindow('');
  } else {
    windows[windows.length - 1].window.focus();
  }
});

if (process.env.SERVER_EXECUTABLE_PATH && process.env.SERVER_EXECUTABLE) {
  const { spawn } = require('child_process');
  let cwd = path.join(
    __dirname,
    process.env.SERVER_EXECUTABLE_PATH
  );
  serverCommand = spawn(
    path.join(
      __dirname,
      process.env.SERVER_EXECUTABLE
    ),
    {
      cwd,
      stdio: 'inherit'
    }
  );
}

function quit() {
  app.quit();
  if (serverCommand) {
    serverCommand.kill('SIGINT');
  }
}

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


// const forkProc = require('./modules/fork.js');
// let application = forkProc().bindTo(process);

// application.emitter.on('test', (data) => {
//   application.reply({
//     event: 'test',
//     data: 'I recieve your test loud and clear'
//   }, () => {
//     console.log('Response sent');
//   });
// });