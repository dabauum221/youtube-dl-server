// Set up the variables =========================================================
var youtubedl = require('youtube-dl');
var validUrl = require('valid-url');
var utf8 = require('utf8');

// Register the API routes
module.exports = function (app) {
    
    // Get info from a YouTube video --------------------------------------------
    app.get('/api/info', function (req, res, next) {
        if(!req.query.url) return next('ERROR: \'url\' query string param is required');
        
        var url = decodeURIComponent(req.query.url);
        
        // If url value in query string params is invalid, return internal server error
        if (!validUrl.isUri(url)){
            return next('ERROR: ' + url + ' is not a valid URL');
        }
        
        // Respond with the video info as JSON
        youtubedl.getInfo(url, function(err, info) {
            if (err) return next(err);
            res.send(info);
        });
    });
    
    // Download a YouTube video -------------------------------------------------
    app.get('/api/download', function(req, res, next){
        if(!req.query.url) return next('ERROR: \'url\' query string param is required');
        
        var url = decodeURIComponent(req.query.url);
        
        // If url value in query string params is invalid, return internal server error
        if (!validUrl.isUri(url)){
            return next('ERROR: ' + url + ' is not a valid URL');
        }
        
        var watch = decodeURIComponent(req.query.watch);
        var format = decodeURIComponent(req.query.format);
        
        console.log('INFO: Downloading using url \'%s\'', url);
        
        var options = ((format) ? [] : ['--format=' + format]);
        var video = youtubedl(url, options);
        
        // Will be called on video load error
        video.on('error', function error(err) {
            return next(err);
        });
        
        // Will be called when the download starts.
        video.on('info', function(info) {
            res.header('Content-Disposition', (watch == 'true' ? 'inline' : 'attachment') + '; filename="' + utf8.encode(info._filename) + '"');
            res.header('Content-Type', 'video/mp4');
            res.header('Content-Length', info.size);
            video.pipe(res);
        });
    });
};