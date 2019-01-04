/* eslint-env node */

const bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
// var fs = require('fs');
var youtubedl = require('youtube-dl');
var app = express();
// var spawn = require('child_process').spawn;
// var pattern = /[0-9]+\.[0-9]%/gi;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  //res.render('index');
  console.log('URL: ' + req.body.url);
  
  // Get video info
  youtubedl.getInfo(req.body.url, function(err, info) {
    if (err) throw err;
    console.log('info:', info);
  });
  var options = ['--format=best'];
  var video = youtubedl(req.body.url, options);
  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
    res.header('Content-Disposition', 'attachment; filename="' + encodeURIComponent(info._filename) + '"');
    res.header('Content-Type', 'video/mp4');
    res.header('Content-Length', info.size);
    video.pipe(res);
  });
  // Will be called when the download ends.
  video.on('end', function() {
    console.log('Finished downloading!');
  });
  // video.pipe(fs.createWriteStream('/tmp/' + filename));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});