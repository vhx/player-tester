'use strict';

/* Environment Vars
..............................*/
require('dotenv').load();

/* Packages
..............................*/
const express     = require('express');
const parser      = require('body-parser');
const template    = require('../views/templates');
const app         = express();

/* Express App
..............................*/
app.set('port', process.env.PORT);
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

/* Routes
..................................... */
app.get('/player_dev', function(req, res) {
  template(req, res, {
    layout: 'player_dev'
  });
});

app.get('/player_prod', function(req, res) {
  template(req, res, {
    layout: 'player_prod'
  });
});

app.get('/api', function(req, res) {
  template(req, res, {
    layout: 'api'
  });
});

app.listen(process.env.PORT, function () {
  console.log("Web server listening on port " + process.env.PORT);
});
