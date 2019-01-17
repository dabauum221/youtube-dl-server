// Set up the variables =========================================================
var ytdl = require('youtube-dl');
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
        ytdl.getInfo(url, function(err, info) {
            if (err) {
                console.error('ERROR: /api/info ' + err);
                return next(err);
            }
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
        var title = decodeURIComponent(req.query.title);
        var ext = decodeURIComponent(req.query.ext);

        var options = format && format !== 'undefined' && format.length > 0 ? ['-f', format] : [];
        
        console.log('INFO: Downloading using url \'%s\' and options %s', url, options);

        var video = ytdl(url, options);
        
        // Will be called on video load error
        video.on('error', function error(err) {
            console.error('ERROR: /api/download ' + err);
            return next(err);
        });
        
        // Will be called when the download starts.
        video.on('info', function(info) {
            res.header('Content-Disposition', (watch === 'true' ? 'inline' : 'attachment') + '; filename="' + utf8.encode(title + '.' + ext) + '"');
            res.header('Content-Type', 'video/' + ext);
            res.header('Content-Length', info.size);
            video.pipe(res);
        });
    });
};