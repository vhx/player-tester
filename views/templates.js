'use strict';

/* Environment Vars
..............................*/
require('dotenv').load();

/* Packages
..............................*/
const handlebars  = require('handlebars');
const walk        = require('fs-walk');
const fs          = require('fs');
const path        = require('path');
const views_dir   = path.join(__dirname);

/* Register Views as Partials
..............................*/
walk.walkSync(views_dir, function(base_dir, filename) {
  let file    = filename.split(/.hbs/)[0];
  let sub_dir = base_dir.split(/views\//)[1];

  if (sub_dir) {
    let template = fs.readFileSync(views_dir + '/' + sub_dir + '/' + filename, 'utf8');
    handlebars.registerPartial(sub_dir + '/' + file, template);
  }
});

/* Template Rendering
..............................*/
const Template = function(req, res, obj) {
  let layout = handlebars.compile(fs.readFileSync(views_dir + '/layouts/' + obj.layout + '.hbs').toString());

  res.send(layout());
};


module.exports = Template;
