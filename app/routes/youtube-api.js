// Set up the variables =========================================================
var search = require('youtube-search');

var opts = {
  maxResults: 10,
  type: 'video',
  key: ''
};

// Register the API routes
module.exports = function (app) {
    
    // Search YouTube videos ----------------------------------------------------
    app.get('/api/search', function(req, res, next) {
        if(!req.query.value) return next('ERROR: \'value\' query string param is required');
        
        // Use the youtube search library to search the value and respond with the results
        search(decodeURIComponent(req.query.value), opts, function(err, results) {
            if (err) return next(err);
            console.info('Searching for "%s" found %d results', req.query.value, results.length);
            res.send(results);
        });
    });
};