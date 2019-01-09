// Set up the variables =========================================================
var youtubedl = require('youtube-dl');

// Register the API routes
module.exports = function (app) {
    
    // Get info from a YouTube video --------------------------------------------
    app.get('/api/info', function (req, res) {
        console.log('URL: ' + decodeURIComponent(req.body.url));
        // Respond with the video info as JSON
        //youtubedl.getInfo(decodeURIComponent(req.params.url), function(err, info) {
            // if (err) ;
            //console.log(info);
            //res.send(info);
        //});
    });
    
    // Get info from a YouTube video --------------------------------------------
    app.get('/api/info/:url', function (req, res, next) {
        console.log('URL: ' + decodeURIComponent(req.params.url));
        // Respond with the video info as JSON
        youtubedl.getInfo(decodeURIComponent(req.params.url), function(err, info) {
            if (err) next(err);
            // console.log(info);
            res.send(info);
        });
    });
    
    // Download a YouTube video (Default Format) --------------------------------
    app.get('/api/download/:url/:watch', function (req, res, next) {
        console.log('Downloading using url: ' + decodeURIComponent(req.params.url));

        var video = youtubedl(req.params.url/*, options*/);
        video.on('error', function error(err) {
            next(err);
        });
        // Will be called when the download starts.
        video.on('info', function(info) {
            if (req.params.watch == 'true') res.header('Content-Disposition', 'inline; filename="' + info._filename + '"');
            else res.header('Content-Disposition', 'attachment; filename="' + info._filename + '"');
            res.header('Content-Type', 'video/mp4');
            res.header('Content-Length', info.size);
            video.pipe(res);
        });
    });
    
    // Download a YouTube video -------------------------------------------------
    app.get('/api/download/:url/:watch/:format', function (req, res) {
        var options = ['--format=' + req.params.format];
        var video = youtubedl(req.params.url, options);
        // Will be called when the download starts.
        video.on('info', function(info) {
            res.header('Content-Disposition', 'attachment; filename="' + encodeURIComponent(info._filename) + '"');
            res.header('Content-Type', 'video/mp4');
            res.header('Content-Length', info.size);
            video.pipe(res);
        });
    });
};