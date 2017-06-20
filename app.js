const { spawn, fork } = require('child_process');

const forkProc = require('./modules/fork.js');

let application = forkProc();
application.bindTo(process);

// let gui = fork('./node_modules/.bin/electron gui.js', {
//   stdio: 'inherit',
//   shell: true
// });

// spawn('node hub.js', {
//   stdio: 'inherit',
//   shell: true
// });

// process.on('message', (data) => {
//   console.log(`Recieved Data: ${ data }`);
// });
application.emitter.on('message', (data) => {
  console.log(`Recieved Data: ${ data }`);
});

// gui.send('test');

//console.log('This is in the test proc');


// process.send({
//   event: 'test',
//   data: 'This is a test'
// });

application.send({
  event: 'test',
  data: 'This is a test'
});