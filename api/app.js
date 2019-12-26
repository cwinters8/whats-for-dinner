const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// enable CORS
app.use(cors());

// enable morgan for logging
app.use(morgan('dev'));

// body parsing
app.use(express.json());

// use routes.js
app.use('/api', routes);

// send 404 if no route matches
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(JSON.stringify(err.stack));
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set port
app.set('port', process.env.PORT || 5000);

// start the server
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}.`);
});