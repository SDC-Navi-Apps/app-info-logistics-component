const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'app_info',
  password: 'Password1',
  port: 5432
});

const getApp = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(`SELECT * FROM apps WHERE id= ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createApp = (req, res) => {
  const { id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs } = req.body;

  pool.query('INSERT INTO apps (id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`App added with ID: ${id}`);
    });
};

const updateApp = (req, res) => {
  const appId = parseInt(req.params.id);
  const { id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs } = req.body;

  pool.query('UPDATE apps SET id=$1, name=$2, author=$3, imageurl=$4, category=$5, updatedat=$6, size=$7, editorchoice=$8, rating=$9, ratings=$10, currentversion=$11, installs=$12 WHERE id=$13',
    [id, name, author, imageurl, category, updatedat, size, editorchoice, rating, ratings, currentversion, installs, appId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`App modified with ID: ${appId}`);
    });
};

const deleteApp = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(`DELETE FROM apps WHERE id=${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`App deleted with ID: ${id}`);
  });
};

module.exports = {
  getApp,
  createApp,
  updateApp,
  deleteApp
};