// Set up the variables =========================================================
var youtubedl = require('youtube-dl');

// Register the API routes
module.exports = function (app) {
    
    // Get info from a YouTube video --------------------------------------------
    app.get('/api/info/:url', function (req, res) {
        console.log('URL: ' + decodeURIComponent(req.params.url));
        // Respond with the video info as JSON
        youtubedl.getInfo(decodeURIComponent(req.params.url), function(err, info) {
            // if (err) ;
            console.log(info);
            res.send(info);
        });
    });
    
    // Download a YouTube video (Default Format) --------------------------------
    app.get('/api/download/:url', function (req, res) {
        // Get the default format from the info
        //youtubedl.getInfo(decodeURIComponent(req.params.url), function(err, info) {
            //var options = ['--format=' + info.format.split(' ')[0]];
            var video = youtubedl(req.params.url/*, options*/);
            
            // Will be called when the download starts.
            video.on('info', function(info) {
                res.header('Content-Disposition', 'attachment; filename="' + encodeURIComponent(info._filename) + '"');
                res.header('Content-Type', 'video/mp4');
                res.header('Content-Length', info.size);
                video.pipe(res);
            });
        //});
    });
    
    // Download a YouTube video -------------------------------------------------
    app.get('/api/download/:url/:format', function (req, res) {
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