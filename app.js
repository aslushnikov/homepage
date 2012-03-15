
/**
 * Module dependencies.
 */

var express = require('express')
  , _ = require('underscore')._
  , routes = require('./routes')
  , stylus = require('stylus')
  , fs = require('fs')
  , yaml = require('js-yaml')

// I don't have any favicon; btw: what is it?..
var app = module.exports = express.createServer(function(q,r,n) {
    if (q.url === '/favicon.ico') {
        r.writeHead(404);
        r.end();
    } else {
        n();
    }
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware( {
      src: __dirname + '/views',
      dest: __dirname + '/public',
      force: true,
      debug: true
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function (req, res) {
    res.redirect('/about');
});
app.get('/projects/:ajax(ajax)?', function (req, res) {
    var projects = [];
    var fd = fs.openSync('projects/list.yml', 'r');
    yaml.loadAll(fd, function(doc) {
        projects.push(doc);
    });
    fs.closeSync(fd);
    console.log("Projects found: " + projects.length);
    routes.render('projects', {projects: projects, section: 'projects'}, req, res);
});
app.get('/projects/:name/:ajax(ajax)?', function (req, res) {
    var path = "projects/" + req.params.name + ".yml";
    var fd = fs.openSync(path, 'r');
    var a = yaml.load(fd);
    fs.closeSync(fd);
    routes.render("view-project", {project: a, section: 'projects'}, req, res);
});

app.get('/:section/:ajax(ajax)?', function (req, res) {
    routes.render(req.params.section, {section: req.params.section}, req, res);
});

app.listen(2000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
