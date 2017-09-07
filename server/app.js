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

// var pg = require('pg');

// let pool = new pg.Pool({
//   database: 'holidayapp',
//   user: 'postgres',
//   password: 'meesbim',
//   port: 5432,
//   ssl: false,
//   max: 20, //set pool max size to 20
//   min: 4, //set min pool size to 4
//   idleTimeoutMillis: 1000 //close idle clients after 1 second
// });

//app.get('/api/vakantie', function(request, response){
  // pool.connect(function(err,db,done){
  //     if(err){            
  //         console.error(err);
  //         response.status(500).send({ 'error' : err});
  //     } else{
  //         db.query('SELECT * FROM medewerker', function(err, table){
  //             done();
  //             if(err){
  //               return response.status(400).send({error:err})
  //             } else
  //             {
  //               console.log(table.rows);
  //               return response.status(200).send(table.rows)
  //             }
  //         })
  //     }
  // })
// });

app.use(bodyparser.urlencoded({ extended: false}));

const knex = require('knex')(require('../knexfile'))

app.get('/api/vakantie', function(req, res){
  knex.raw('select * from medewerker').then(function(data) {
    console.log(data.rows)
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