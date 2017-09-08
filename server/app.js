const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
 
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

//Using knex to connect to database. 
const knex = require('knex')(require('../knexfile'))

app.get('/api/medewerker', function(req, res){
  knex.raw('select * from medewerker').then(function(data) {
    return res.send(data.rows)
  })
});

app.get('/api/vakantiedagen', function(req, res){
  knex.raw('select * from vakantiedagen').then(function(data) {

    return res.send(data.rows)
  })
});

// app.post('/api/addtest', function( req, res) {

//   var naam = request.body.naam;
//   var id = request.body.id;
//   var inDienstDatum = request.body.inDienstDatum;
//   var uitDienstDatum = request.body.uitDienstDatum;
//   var vakantieDagen = request.body.vakantieDagen

//   let newdata = [naam, id, inDienstDatum, uitDienstDatum, vakantieDagen];

//   pool.connect((err, db, done) => {
//   // Call `done(err)` to release the client back to the pool (or destroy it if there is an error)
//   done();
//   if(err){
//       console.error('error open connection', err);
//       return response.status(400).send({error: err});
//   }
//   else {
//     return knex('medewerker').insert({
//       naam, id, inDienstDatum, uitDienstDatum, vakantieDagen
//     });
//   }
//   });
// });

module.exports = app;