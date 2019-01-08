// Set up the variables =========================================================
var search = require('youtube-search');
var opts = {
  maxResults: 10,
  key: ''
};

// Register the API routes
module.exports = function (app) {
    
    // Search YouTube videos --------------------------------------------
    app.get('/api/search/:value', function(req, res) {
        console.log('Value: ' + decodeURIComponent(req.params.value));
        search(decodeURIComponent(req.params.value), opts, function(err, results) {
            if(err) return console.log(err);
            console.dir(results);
            res.send(results);
        });
    });
};