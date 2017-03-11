//Use this module to get and save settings.
//It also exposes and observable interface for listening for 
//individual property settintgs.

const settings = require('electron-settings');

const path = require('path');

settings.defaults({
  settings: {
    dbPath: path.join(__dirname, '..', 'data.sqlite'),
    selectedFilter: 'all',
    databacker: {
      enabled: false,
      username: '',
      password: ''
    },
    jira: {
      enabled: false,
      baseUrl: '',
      username: '',
      password: ''
    }
  }
});

let emitter = new (require('events').EventEmitter)();


emitter.saveSettings = function(settingsObj, cb) {
  settings.get('settings')
    .then(originalVal => {
      //Do our own low level error handling here as the electron-settings
      //library seems to swallow them silently. Nice job guys.
      try {
        //Diff the object and emit app. events here.
        let differentProps = diffObjects(settingsObj, originalVal);
        if (differentProps.length > 0) {
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
  let diffProps = [];
  for (var propA in objA) {
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