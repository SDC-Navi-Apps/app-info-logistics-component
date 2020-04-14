require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('../database/cassClient');

const app = express();
const PORT = 3004;

app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/apps/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM apps WHERE id=${id}`;
  client.execute(query)
    .then((results) => {
      res.status(201).send(results.rows[0]);
    })
    .catch((err) => {
      res.status(400);
    });
});
app.post('/api/create', (req, res) => {
  const { id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs } = req.body;
  const query = 'INSERT INTO apps (id, author, category, currentversion, editorchoice, imageurl, installs, name, rating, ratings, size, updatedat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [id, author, category, currentversion, editorchoice, imageurl, installs, name, rating, ratings, size, updatedat];
  client.execute(query, params, { hints: ['int', 'varchar', 'varchar', 'float', 'boolean', 'varchar', 'int', 'varchar', 'float', 'int', 'varchar', 'varchar'] })
    .then((results) => {
      res.status(501);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});
app.put('/api/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs } = req.body;
  const query = `UPDATE apps SET author=?, category=?, currentversion=?, editorchoice=?, imageurl=?, installs=?, name=?, rating=?, ratings=?, size=?, updatedat=? WHERE id=${id}`;
  const params = [author, category, currentversion, editorchoice, imageurl, installs, name, rating, ratings, size, updatedat];
  client.execute(query, params, { hints: ['varchar', 'varchar', 'float', 'boolean', 'varchar', 'int', 'varchar', 'float', 'int', 'varchar', 'varchar'] })
    .then((result) => {
      res.status(501);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM apps WHERE id=${id}`;
  client.execute(query)
    .then((results) => {
      res.status(300);
    })
    .catch((err) => {
      console.log(err);
    });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});