
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var sio = require('socket.io');
var routes = require('./routes');

var util = require('util');
var hbs = require('hbs');

var sys = require('sys');



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Handlebars Test Helpers and Partials

hbs.registerHelper('link_to', function(context) {
  return sys.inspect(io);  
  //return "<a href='" + context.url + "'>" + context.body + "</a>";
});

hbs.registerHelper('link_to2', function(title, context) {
  return "<a href='/posts" + context.url + "'>" + title + "</a>"
});

hbs.registerHelper('list', function(items, fn) {
  var out = "<ul>";
  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + fn(items[i]) + "</li>";
  }
  return out + "</ul>";
});

hbs.registerPartial('link2', '<a href="/people/{{id}}">{{name}}</a>');

// Routes

app.get('/', routes.index);

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var io = sio.listen(80);
io.configure(function () {
  io.set('transports', ['websocket']);
});
io.sockets.on('connection', function (socket) {
  //socket.emit('messege', { hello: 'world' });
  socket.send('hi');
  socket.on('message', function (data) {
    //socket.emit('news', { hello: 'world' });
  });
});

/*
var test = Backbone.Model.extend({
  initialize: function() {
  
  }
});
*/