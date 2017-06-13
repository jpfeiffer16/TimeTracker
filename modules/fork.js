let { fork, spawn } = require('child_process');
let EventEmitter = require('events');


module.exports = function(command) {
  //Setup
  process.on('message', (data) => {
    if (data.event) {
      emmitter.emit(data.event, data.data);
    }
  });

  let child_proc = fork(command, {
    stdio: 'inherit',
    shell: true
  });

  let emmitter = new EventEmitter();

  //Methods, props
  function send(data) {
    child_proc.send(data);
  }

  return {
    send,
    process: child_proc,
    emmitter
  };
};