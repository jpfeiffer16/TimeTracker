const forkProc = require('./modules/fork.js');
let application = forkProc().bindTo(process);

application.emitter.on('test', (data) => {
  application.reply({
    event: 'test',
    data: 'I recieve your test loud and clear'
  }, () => {
    console.log('Response sent');
  });
});