const mongoose = require('mongoose');

const StorageManager = (connectionString) => {
  let isReady = false;

  let init = (connectionString) => {
    if (connectionString) {
      //TODO: Connect here
    }
  };


  init(connectionString);

  return {
    isReady
  }
}

module.exports = StorageManager;