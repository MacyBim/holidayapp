const express = require('express');
const path = require('path');
const app = express();
 
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var pg = require('pg');

let pool = new pg.Pool({
  database: 'holidayapp',
  user: 'postgres',
  password: 'meesbim',
  port: 5432,
  ssl: false,
  max: 20, //set pool max size to 20
  min: 4, //set min pool size to 4
  idleTimeoutMillis: 1000 //close idle clients after 1 second
});

app.get('/api/vakantie', function(request, response){
  pool.connect(function(err,db,done){
      if(err){            
          console.error(err);
          response.status(500).send({ 'error' : err});
      } else{
          db.query('SELECT * FROM medewerker', function(err, table){
              done();
              if(err){
                return response.status(400).send({error:err})
              } else
              {
                console.log(table.rows);
                return response.status(200).send(table.rows)
              }
          })
      }
  })
});
module.exports = app;