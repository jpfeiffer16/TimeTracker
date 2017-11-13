let forkProc = require('./modules/fork.js');

let application = forkProc('./node_modules/.bin/electron app.js');

application.shell({
  event: 'test',
  data: 'test'
}, (data) => {
  console.log(`Recived back data: ${ data }`);      
});