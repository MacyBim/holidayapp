const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
 
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

//Using knex to connect to database. 
const knex = require('knex')(require('../knexfile'))

app.get('/api/medewerker', function(req, res){
  
  knex.select().from('medewerker')
  .then(function(data) {
    return res.send(data);
  })
});

app.get('/api/vakantiedagen', function(req, res){
  knex.select().from('vakantiedagen')
  .then(function(data) {
    return res.send(data)
  })
});

app.post('/api/postday', function(req, res) {

  let id = req.body.id;
  let medewerkerId = req.body.medewerkerId;
  let startDatum = req.body.startDatum;
  let eindDatum = req.body.eindDatum;

  knex('vakantiedagen').insert({
    id: id,
    medewerkerId: medewerkerId,
    startDatum: startDatum,
    eindDatum: eindDatum
  })
  .then(function() {
    knex.select().from('vakantiedagen')
    .then(function(data) {
      return res.send(data)
   })
 })
});

app.delete('/api/delete/:id', function(req, res) {
     let id = req.params.id;

     knex('vakantiedagen').where('id', id).del()
     .then(function() {
      knex.select().from('vakantiedagen')
      .then(function(data) {
        return res.send(data)
     })
   })
});

app.put('/api/update/:id', function(req, res){
  let startDatum = req.body.startDatum;
  let eindDatum = req.body.eindDatum;

  knex('vakantiedagen').where('id', req.params.id).update({
    startDatum: startDatum,
    eindDatum: eindDatum
  })
  .then(function() {
    knex.select().from('vakantiedagen')
    .then(function(data) {
      return res.send(data)
   })
 })
});

module.exports = app;