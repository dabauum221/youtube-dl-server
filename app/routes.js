// Set up the variables =========================================================
var youtubedl = require('youtube-dl');

// Register the API routes
module.exports = function (app) {
    
    // Test root ----------------------------------------------------------------
    /* app.get('/', function (req, res) {
        res.send('test');
    }); */
    
    // Get info from a YouTube video --------------------------------------------
    app.get('/api/info', function (req, res) {
        // console.log(req);
        // Respond with the video info as JSON
        // youtubedl.getInfo(req.body.url, function(err, info) {
            // if (err) ;
            // res.send(info);
        // });
        res.send('debug');
    });
    
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