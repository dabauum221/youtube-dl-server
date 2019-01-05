// Set up the variables =========================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var favicon = require('serve-favicon');
var app = express();

// Configuration ================================================================
app.use(express.static('./public')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse application/json
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

// Routes =======================================================================
require('./app/routes.js')(app);

// Listen =======================================================================
app.listen(port, function () {
    console.log('Application listening on port ' + port);
});