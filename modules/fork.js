let { fork, spawn } = require('child_process');
let { EventEmitter } = require('events');


module.exports = function(command) {
  //Setup

  let emitter = new EventEmitter();

  // process.on('message', (data) => {
  //   if (data.event) {
  //     emitter.emit(data.event, data.data);
  //   }
  // });

  let child_proc = null;

  if (command) {
    let proc = fork(command, {
      stdio: 'inherit',
      shell: true
    });
    bindTo(proc);
  } else {
    //NOTE: If we need anything, do it here.
  }

  
  function bindTo(proc) {
    child_proc = proc;

    proc.on('message', (data) => {
      if (data.event) {
        emitter.emit(data.event, data.data);
      }
    });
  }


  //Methods, props
  function send(data) {
    if (data.event) {
      child_proc.send(data);
    } else {
      console.error('Must pass an event to send');
    }
  }

  return {
    send,
    process: child_proc,
    emitter
  };
};