const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'app_info'
});

client.connect((err, result) => {
  if (err) {
    console.log('cassandra error- ', err);
  } else {
    console.log('cassandra connected');
  }
});

module.exports = client;