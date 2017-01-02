//Use this module to get and save settings.
//It also exposes and observable interface for listening for individual property settintgs.

const settings = require('electron-settings');

let emitter = new (require('events').EventEmitter)();


emitter.saveSettings = function(settingsObj, cb) {
  console.log('Saving settings');
  settings.get('settings')
    .then(originalVal => {

      //TODO: Diff the object and emit app. events here.
      let diffProps = diffProps(settingsObj, originalVal);
      console.log(diffProps);
      if (diffProps.length > 0) {
        diffProps.forEach((prop) => {
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
    });
  
};

emitter.getSettings = function(cb) {
  settings.get('settings')
    .then(val => {
      cb(val);
    });
};

module.exports = emitter;


function diffObjects(objA, objB) {
  let diffProps = [];
  for (let propA in objA) {
    if (objA[propA] != objB[propA])
      diffProps.push({
        name: propA,
        oldValue: objB[propA],
        newValue: objA[propA]
      });
  }
  return diffProps;
};