const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const App = require('../database/App.js');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/apps/:appid', (req, res) => {
  App.find(
    {id: req.params.appid})
  .then(
    data => {
      res.send(data);
    })
  .catch(
    err => {
      if(err) {
        console.log(err);
      }
    })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});