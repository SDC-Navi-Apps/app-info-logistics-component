const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const App = require('../database/App.js');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/apps/:appid', (req, res) => {
  App.find(
    { id: req.params.appid })
    .then(
      data => {
        res.send(data);
      })
    .catch(
      err => {
        if (err) {
          console.log(err);
        }
      });
});

app.post('/api/create', (req, res) => {
  console.log(36, req.body);
  App.create(req.body)
    .then((res) => {
      res.sendStatus(300);
    })
    .catch((err) => {
      if (err) {
        res.sendStatus(400);
      }
    });
});

app.put('/api/update/:appid', (req, res) => {
  console.log(48, req.params.appid);
  console.log(49, req.body);
  App.updateOne({ id: req.params.appid }, req.body)
    .then((res) => {
      res.sendStatus(300);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
    });
});

app.delete('/api/delete/:appid', (req, res) => {
  App.findOneAndDelete({ id: req.params.appid })
    .then((res) => {
      res.status(300).end();
    })
    .catch((err) => {
      if (err) {
        res.status(400).end();
      }
    });
});

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = server;