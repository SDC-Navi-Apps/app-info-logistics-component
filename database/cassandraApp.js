var ExpressCassandra = require('express-cassandra');
var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'app_info',
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      // eslint-disable-next-line camelcase
      replication_factor: 1
    },
    migration: 'safe',
  }
});

var AppModel = models.loadSchema('apps', {
  fields: {
    id: 'int',
    author: 'text',
    category: 'text',
    currentversion: 'float',
    editorchoice: 'boolean',
    imageurl: 'text',
    installs: 'int',
    name: 'text',
    rating: 'float',
    ratings: 'int',
    size: 'text',
    updatedat: 'text'
  },
  key: ['id']
});

AppModel.syncDB(function (err, res) {
  if (err) {
    throw err;
  }
});

module.exports = AppModel;