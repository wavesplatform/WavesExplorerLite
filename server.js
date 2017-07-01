'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // formerly express.logger
var errorhandler = require('errorhandler');
var app = express();

var basedir = __dirname + '/src';

// all environments
app.set('port', process.env.PORT || 3000);
// //app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);

// express/connect middleware
app.use(favicon(basedir + '/favicon.ico'));
app.use(morgan('dev'));

// serve up static assets
app.use(express.static(basedir));
app.get('/*', function(req, res){
  res.sendFile(basedir + '/index.html');
});

// development only
if ('development' === app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
