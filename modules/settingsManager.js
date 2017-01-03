//Use this module to get and save settings.
//It also exposes and observable interface for listening for 
//individual property settintgs.

const settings = require('electron-settings');

const path = require('path');

settings.defaults({
  settings: {
    dbPath: path.join(__dirname, '..', 'data.sqlite')
  }
});

let emitter = new (require('events').EventEmitter)();


emitter.saveSettings = function(settingsObj, cb) {
  console.log('Saving settings');
  // console.log(settings); 
  settings.get('settings')
    .then(originalVal => {
      //Do our own low level error handling here as the electron-settings
      //library seems to swallow them silently. Nice job guys.
      try {
        console.log('In callback');
        console.log(settingsObj, originalVal);
        //TODO: Diff the object and emit app. events here.
        let differentProps = diffObjects(settingsObj, originalVal);
        console.log('Getting here');
        console.log(differentProps.length);
        if (differentProps.length > 0) {
          console.log('Diff detected');
          differentProps.forEach((prop) => {
            emitter.emit(`settingChanged-${ prop.name }`, {
              oldValue: prop.oldValue,
              newValue: prop.newValue
            });
          });
        }

        settings.set('settings', settingsObj)
          .then(val => {
            cb(val);
          });
      } catch(err) {
        console.error(err);
      }
    });
  
};

emitter.getSettings = function(cb) {
  settings.get('settings')
    .then(val => {
      cb(val);
    });
};

function diffObjects(objA, objB) {
  console.log('Diffing');
  let diffProps = [];
  for (var propA in objA) {
    console.log('Loop');
    if (objA[propA] != objB[propA])
      diffProps.push({
        name: propA,
        oldValue: objB[propA],
        newValue: objA[propA]
      });
  }
  return diffProps;
};

module.exports = emitter;