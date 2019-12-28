const express = require('express');
const {body, validationResult} = require('express-validator');
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const config = require('./config.json');

const router = express.Router();

// database connection
let db;
mongo.connect(`${config.dbHost}/${config.dbName}`, {useUnifiedTopology: true}, (err, database) => {
  throwErr(err);
  db = database.db();
  console.log('DB connection successful');
});

// helper function to throw an error
const throwErr = err => {
  if (err) throw err;
}

// main /api route
router.get('/', (req, res) => {
  res.send("What's for dinner?");
});

// get all recipes
router.get('/recipes', (req, res) => {
  db.collection('recipes').find({}).toArray((err, result) => {
    throwErr(err);
    res.send(JSON.stringify(result));
  });
});

// get one recipe
router.get('/recipes/:id', (req, res) => {
  const query = {_id: new ObjectId(req.params.id)};
  db.collection('recipes').findOne(query, (err, result) => {
    throwErr(err);
    res.send(JSON.stringify(result));
  });
});

// helper array to validate recipe POST and PUT requests
const validateRecipe = [
  body('name').notEmpty(),
  body('ingredients').isArray({min: 1})
];

// validation helper function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    errors.status = 400;
    errors.message = errors.array();
    next(errors);
  } else {
    next();
  }
}

// create a recipe
router.post('/recipes/new', validateRecipe, validate, (req, res) => {
  const recipe = {
    name: req.body.name,
    description: req.body.description || null,
    ingredients: req.body.ingredients,
    directions: req.body.directions || null,
    timeInMinutes: req.body.timeInMinutes || null
  }
  db.collection('recipes').insertOne(recipe, (err, record) => {
    throwErr(err);
    res.status(200);
    res.send({
      status: 'New recipe document inserted successfully',
      id: record.insertedId
    });
  });
});

// delete a recipe
router.delete('/recipes/:id', (req, res) => {
  const query = {_id: new ObjectId(req.params.id)};
  db.collection('recipes').deleteOne(query, (err, response) => {
    if (err) next(err);
    if (response.deletedCount > 0) {
      res.status(200);
      res.send({status: `Recipe ${req.params.id} deleted.`});
    } else {
      res.status(404);
      res.send({status: `Recipe not found and so could not be deleted.`});
    }
  });
});

module.exports = router;