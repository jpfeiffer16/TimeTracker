const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const SqlStorageManager = require('./modules/sqlStorage');


app.use(bodyParser.json());
 
app.post('/:op', function (req, res) {
  let params = req.body.params;
  params.push((err, result) => {
    res.send(result);
  });
  SqlStorageManager[req.params.op].apply(params);
});
 
app.listen(3000, '127.0.0.1');