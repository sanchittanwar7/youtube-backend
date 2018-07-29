var express = require('express');
var router = express.Router();
var fs = require('fs');
var youtubedl = require('youtube-dl');
 
/* GET home page. */
router.get('/download/:id/:format', function(req, res, next) {
	var id = req.params.id;
	var format = req.params.format;
	console.log(id)
	console.log(format)
	var video = youtubedl('https://www.youtube.com/watch?v=' + id, ['--format=' + format]);
	var title;
	video.on('info', function(info) {
		console.log('Download started');
		console.log('filename: ' + info.filename);
		console.log('size: ' + info.size/1000000 + 'MB');
		// var filename = encodeURIComponent(info.title + '.mp4');
		video.pipe(fs.createWriteStream(info._filename));
	});

	// video.pipe(fs.createWriteStream(title));
	video.on('end', function() {
	  console.log('finished downloading!');
	  res.end()
	});
});

module.exports = router;
