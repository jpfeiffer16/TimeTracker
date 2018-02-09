//TODO: Migrate this over to the cachius lib.

var store = {};

function Cache(callMethod, cb, key) {
  function cache(value) {
    store[key] = value;
    cb(store[key]);
  };

  if (store[key] != null && store[key] != undefined)
    cb(store[key]);
  else {
    callMethod(cache);
  }
}

function Touch(key) {
  store[key] = null;
}

function Clear() {
  store = {};
}

module.exports = {
  Cache,
  Touch,
  Clear
}