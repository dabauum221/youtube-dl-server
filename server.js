/*eslint-env node*/

const bodyParser = require('body-parser');
var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var pattern = /[0-9]+\.[0-9]%/gi;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  res.render('index');
  console.log('URL: ' + req.body.url);
  var youtube = spawn('youtube-dl',
      ['-o','/tmp/youtube/%(title)s.%(ext)s',
       '-f','bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
       '--merge-output-format','mp4',req.body.url]);
  youtube.stdout.on('data', function (data) {
    var split = data.toString().split(' ');
    split.forEach( function(value) {
      var match = value.match(pattern);
      if (match !== null) console.log('STATUS: ' + value);
    });
  });
  youtube.stderr.on('data', function (data) {
    console.error(data.toString());
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
