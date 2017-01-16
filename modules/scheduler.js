//NOTE: There is probably a library somewhere that will simplify some of this
//But as of writing this, I was unable to find one.


//Need a place to persist time-checks. I vote to use electron-settings
const settings = require('electron-settings');


let Scheduler = function() {
  

  let lastCheck = new Date();
  let registeredEvents = [];

  settings.get('values.scheduler.lastCheck')
    .then((val) => {
      if (val) {
        if (val) {
          console.log('Persistant lastcheck found');
          console.log(val);
          lastCheck = new Date(val);
        } else {
          lastCheck = new Date();
        }
      }
    });

  this.check = function() {
    console.log('checking');
    let now = new Date();

    registeredEvents.forEach((event) => {
      console.log(event.date);
      console.log(lastCheck);
      if (event.date > lastCheck && event.date < now) {
        event.cb();
      }
      lastCheck = now;
      settings.set('values.scheduler.lastCheck', now);
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