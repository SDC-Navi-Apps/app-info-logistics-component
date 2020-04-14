require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const PORT = 3004;

// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/apps/:id', cors(corsOptions), db.getApp);
app.post('/api/create', db.createApp);
app.put('/api/update/:id', db.updateApp);
app.delete('/api/delete/:id', db.deleteApp);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});