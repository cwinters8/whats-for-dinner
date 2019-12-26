const express = require('express');
const mongo = require('mongodb').MongoClient;
const config = require('./config.json');

const router = express.Router();

// database connection
let db;
mongo.connect(`${config.dbHost}/${config.dbName}`, {useUnifiedTopology: true}, (err, database) => {
  if (err) throw err;
  db = database.db();
  console.log('DB connection successful');
});

// main /api route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// get all recipes
router.get('/recipes', (req, res) => {
  db.collection('recipes').find({}).toArray((err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

// create a recipe
router.post('/recipes/new', (req, res) => {
  const recipe = {
    name: req.body.name,
    description: req.body.description || null,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    timeInMinutes: req.body.timeInMinutes || null
  }
  db.collection('recipes').insertOne(recipe, (err, record) => {
    if (err) throw err;
    res.status(200);
    res.send({
      status: 'New recipe document inserted successfully',
      id: record.insertedId
    });
  });
});

module.exports = router;