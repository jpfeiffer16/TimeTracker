let { spawn, fork } = require('child_process');

let gui = fork('./node_modules/.bin/electron gui.js', {
  stdio: 'inherit',
  shell: true
});

// spawn('node hub.js', {
//   stdio: 'inherit',
//   shell: true
// });

gui.on('message', (response) => {
  console.log(response);
});

gui.send('test');