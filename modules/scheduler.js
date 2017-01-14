//NOTE: There is probably a library somewhere that will simplify some of this
//But as of writing this, I was unable to find one.


//Need a place to persist time-checks. I vote to use electron-settings
const settings = require('electron-settings');


let Scheduler = function() {
  

  let lastCheck;
  let registeredEvents = [];

  settings.get('values.scheduler')
    .then((val) => {
      if (val) {
        lastCheck = val;
        console.log('Got persisted lastCheck value');
        console.log(`Type: ${ typeof val }`);
      }
    });

  this.check = function() {
    let now = new Date();

    registeredEvents.forEach((event) => {
      if (event.date > lastCheck && event.date < now) {
        event.cb();
      }
    });
  };


  this.register = function(date, cb) {
    if (typeof cb === 'function') registeredEvents.push({
      cb,
      date: date
    });
  };

  // this.registerFirstTaskOfDay = function(cb) {
    
  // };


  setInterval(this.check, 60000);
};

module.exports = new Scheduler();