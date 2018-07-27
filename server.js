/*eslint-env node*/

const bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  res.render('index');
  console.log('URL: ' + req.body.url);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
