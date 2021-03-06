//NOTE: There is probably a library somewhere that will simplify some of this
//But as of writing this, I was unable to find one.
//UPDATE: chronoscript might be a good fit for this.

const settings = require('electron-settings');

let Scheduler = function() {
  let lastCheck = new Date();
  let registeredEvents = [];
  let registeredEventsFirstOfDay = [];

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
    //Fire off first-of-day tasks here
    console.log(now.getDay(), lastCheck.getDay());
    if (now.getDay() != lastCheck.getDay()) {
      registeredEventsFirstOfDay.forEach((event) => {
        event.cb();
      });
    }
    //Fire off time-based tasks here
    registeredEvents.forEach((event) => {
      if (event.date > lastCheck && event.date < now) {
        event.cb();
      }
    });
    lastCheck = now;
    settings.set('values.scheduler.lastCheck', now);
  };
  
  this.register = function(date, cb) {
    if (typeof cb === 'function') registeredEvents.push({
      cb,
      date: date
    });
  };

  this.registerFirstTaskOfDay = function(cb) {
    if (typeof cb === 'function') registeredEventsFirstOfDay.push({
      cb
    });
  };

  setInterval(this.check, 60000);
};

module.exports = new Scheduler();