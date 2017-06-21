const { spawn, fork } = require('child_process');

const forkProc = require('./modules/fork.js');

let application = forkProc().bindTo(process);

application.emitter.on('test', (data) => {
  console.log(`Recieved Data: ${ data }`);
});

application.send({
  event: 'test',
  data: 'This is a test'
});