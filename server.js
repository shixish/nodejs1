
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    //fs = require('fs'),
    routes = require('./routes'),
    util = require('util'),
    //path = require('path'),
    //hbs = require('hbs'),
    now = require('now'), //http://nowjs.com/
    //assetManager = require('connect-assetmanager'), //https://github.com/mape/connect-assetmanager/
    //assetHandler = require('connect-assetmanager-handlers'), //https://github.com/mape/connect-assetmanager-handlers
    lessMiddleware = require('less-middleware'); //https://github.com/emberfeather/less.js-middleware
var pub_dir = __dirname + '/public';

// Configuration
app.configure(function(){
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'hbs');
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.router);
  
  // disable layout
  app.set("view options", {layout: false});

  // make a custom html template
  //app.register('.html', {
  //  compile: function(str, options){
  //    console.log(str);
  //    return function(locals){
  //      console.log(str);
  //      return str;
  //    };
  //  }
  //});
  
  app.use(express.static(pub_dir));
  //app.use(express.compiler({ src: pub_dir, enable: ['less'] }));
  //app.use(require('connect-assets')());
  app.use(lessMiddleware({
    src: __dirname + '/public',
    compress: true,
    force: true,
    once: false
  }));
  //app.use('/', assetManager({
  //  'js': {
  //    'route': /\/static\/js\/[0-9]+\/.*\.js/,
  //    path: './public/js/',
  //    dataType: 'javascript',
  //    files: [
  //      'libs/underscore-min.js',
  //      'libs/backbone.js',
  //      'plugins.js',
  //      'script.js'
  //    ],
  //    'postManipulate': {
  //      '^': [
  //        assetHandler.uglifyJsOptimize
  //      ]
  //    }
  //  },
  //  //'css': {
  //  //  'route': /\/static\/css\/.*\.css/,
  //  //  path: './public/css/',
  //  //  dataType: 'css',
  //  //  files: [
  //  //    'style.less',
  //  //    'grid.less'
  //  //  ],
  //  //  'preManipulate':{
  //  //    '^': [
  //  //      lessHandler
  //  //    ]
  //  //  },
  //  //  //'postManipulate': {
  //  //  //  '^': [
  //  //  //    assetHandler.yuiCssOptimize
  //  //  //  ]
  //  //  //}
  //  //},
  //}), express.static(pub_dir));
  //app.use(assetManager({
  //  'js': {
  //      'route': /\/static\/js\/[0-9]+\/.*\.js/
  //      , 'path': './public/js/'
  //      , 'dataType': 'javascript'
  //      , 'files': [
  //          'script.js',
  //          'libs/backbone.js'
  //      ]
  //  }  
  //}));
  //console.log(js);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//app.error(function(err, req, res, next) {
//    sys.puts("APP.ERROR:" + sys.inspect(err));
//    next(err);
//});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Handlebars Test Helpers and Partials
//hbs.registerHelper('loadTemplates', function() {
//  var ret = '';
//  for (var t in this.templates){
//    ret += fs.readFileSync(__dirname + '/views/templates/' + this.templates[t], 'utf8') + '\n';
//  }
//  return new hbs.SafeString(ret);
//});

//hbs.registerHelper('link_to', function(context) {
//  return sys.inspect(io);  
//  //return "<a href='" + context.url + "'>" + context.body + "</a>";
//});
//
//hbs.registerHelper('link_to2', function(title, context) {
//  return "<a href='/posts" + context.url + "'>" + title + "</a>"
//});
//
//hbs.registerHelper('list', function(items, fn) {
//  var out = "<ul>";
//  for(var i=0, l=items.length; i<l; i++) {
//    out = out + "<li>" + fn(items[i]) + "</li>";
//  }
//  return out + "</ul>";
//});
//
//hbs.registerPartial('link2', '<a href="/people/{{id}}">{{name}}</a>');

// Routes

//app.get('/', routes.index);
//app.get('/', function(){
//  
//});
app.listen(80);