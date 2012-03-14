
/**
 * Module dependencies.
 */

var express = require('express')
  , _ = require('underscore')._
  , routes = require('./routes')
  , stylus = require('stylus')

var app = module.exports = express.createServer();

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

app.get('/', routes.about);
app.get('/about/:ajax(ajax)?', routes.about);
app.get('/contacts/:ajax(ajax)?', routes.contacts);
app.get('/cv/:ajax(ajax)?', routes.cv);
app.get('/projects/:ajax(ajax)?', routes.projects);
app.get('/downloads/:ajax(ajax)?', routes.downloads);

app.listen(2000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
