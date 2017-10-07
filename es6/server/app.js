
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var process = require('process');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.use(app.router);


app.use(express.static(path.join(__dirname, '../app')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-livereload')());
app.use(favicon(__dirname + '/favicon.ico'));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
/*app.use('/', routes);
app.use('/users', users);*/
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;
