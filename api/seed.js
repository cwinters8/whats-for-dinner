const mongo = require('mongodb').MongoClient;
const config = require('./config.json');

// list of collections to seed in the database
const collections = [
  'recipes',
  'calendars'
];

mongo.connect(`${config.dbHost}/${config.dbName}`, {useUnifiedTopology: true}, (err, db) => {
  if (err) throw err;
  console.log('Database connected!');
  for (let i=0; i < collections.length; i++) {
    const collection = collections[i];
    db.db().createCollection(collection, (err, res) => {
      if (err) {
        console.log(`Error creating collection ${collection}`);
        throw err;
      }
      console.log(`Created collection ${collection} successfully!`);
    });
  }
  db.close();
});