// Set up the variables =========================================================
var search = require('youtube-search');
var youtubedl = require('youtube-dl');
var opts = {
  maxResults: 10,
  type: 'video',
  key: ''
};

// Register the API routes
module.exports = function (app) {
    
    // Search YouTube videos ----------------------------------------------------
    app.get('/api/search/:value', function(req, res) {
        // console.log('Value: ' + decodeURIComponent(req.params.value));
        search(decodeURIComponent(req.params.value), opts, function(err, results) {
            if(err) return console.log(err);
            console.info('Searching for "%s" found %d results', req.params.value, results.length);
            res.send(results);
        });
    });
};