let { fork, spawn } = require('child_process');
let { EventEmitter } = require('events');


module.exports = function(command) {
  //Setup

  let emitter = new EventEmitter();

  process.on('message', (data) => {
    if (data.event) {
      emitter.emit(data.event, data.data);
    }
  });

  let child_proc = fork(command, {
    stdio: 'inherit',
    shell: true
  });
  
  child_proc.on('message', (data) => {
    emitter.emit(data.event, data.data);
  });

  //Methods, props
  function send(data) {
    child_proc.send(data);
  }

  return {
    send,
    process: child_proc,
    emitter
  };
};