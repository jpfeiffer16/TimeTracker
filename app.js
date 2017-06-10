let { spawn } = require('child_process');

spawn('./node_modules/.bin/electron gui.js', {
  inherit: true,
  shell: true
});

spawn('node hub.js', {
  inherit: true,
  shell: true
});