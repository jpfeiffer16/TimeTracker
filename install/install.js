#!/usr/bin/env node

//Setup constants
const os = require('os');
const fs = require('fs');
const path = require('path');

//OS dependant code
switch (os.type()) {
  //Linux
  case 'Linux':
    moveFiles(
        path.join(__dirname, 'TimeTracker.desktop'),
        path.join(os.homedir(), '~/.local/share/applications/TimeTracker.desktop')
      );
  break;
  //macOS
  case 'Darwin':
    console.warn('Warning: Installing application icon and launcher are not supported on macOS at this time');
  break;
  //Windows
  case 'Windows_NT':
    console.warn('Warning: Installing application icon and launcher are not supported on Windows at this time');
  break;
}

//Utility functions
function moveFiles(sourceFile, destFile) {
  fs.createReadStream(sourceFile)
    .pipe(fs.createWriteStream(destFile));
}