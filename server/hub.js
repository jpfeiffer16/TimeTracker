const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.json());
 
app.post('/:op', function (req, res) {
  let params = req.body.params;
  SqlStorageManager.setDB(req.body.db);
  SqlStorageManager[req.params.op](params, (result) => {
    //TODO: Setup error handling here
    res.send(result);
  })
});
  
const { Cache, Touch, Clear } = require('./modules/cache');
let models = require('./models/index.js')('./data.sqlite');
const SqlStorageManager = require('./modules/sqlStorage')(models, Cache, Touch, Clear);


app.listen(3369, '127.0.0.1');