
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

yaml.read = function(path) {
    var fd = fs.openSync(path, 'r');
    var a = yaml.load(fd);
    fs.closeSync(fd);
    return a;
}

// project list
app.get('/projects/:ajax(ajax)?', function (req, res) {
    var projects = [];
    var files = yaml.read('projects/list.yml').projects;
    console.log("files: " + files);
    files.forEach(function(file){
        file = file + ".yml";
        console.log("loading " + file);

        if (/^_/.test(file)) return;
        if (/list.yml$/.test(file)) return;
        if (!/.yml$/.test(file)) return;

        file = 'projects/' + file;
        var p = yaml.read(file);
        p.shortname = p.shortname || p.name;
        p['url'] = file.replace(".yml", "");
        projects.push(p);
    });
    console.log("Projects found: " + projects.length);
    var tags = makeTags(projects);
    routes.render('projects', {projects: projects, section: 'projects', tags: tags}, req, res);
});

function makeTags(projects) {
    var tags = {};
    projects.forEach(function(proj){ proj.tags.forEach(function(tag) {
        tags[tag] = tags[tag] ? 1 : tags[tag] + 1;
    }); });
    var ans = [];
    for (key in tags) {
        if (tags.hasOwnProperty(key)) {
            ans.push(key);
        }
    }
    return ans;
}

// current project, mapping to *.yml project
app.get('/projects/:name/:ajax(ajax)?', function (req, res) {
    var path = "projects/" + req.params.name + ".yml";
    var a = yaml.read(path);
    routes.render("view-project", {project: a, section: 'projects'}, req, res);
});

// route for all other sections
app.get('/:section/:ajax(ajax)?', function (req, res) {
    routes.render(req.params.section, {section: req.params.section}, req, res);
});

app.listen(process.env.PORT || 2000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
