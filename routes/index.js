var express = require('express');
var router = express.Router();
var fs = require('fs');
var youtubedl = require('youtube-dl');
 
/* GET home page. */
router.get('/download/:id', function(req, res, next) {
	var id = req.params.id;
	var video = youtubedl('https://www.youtube.com/watch?v=' + id, ['--format=18']);
	var title;
	video.on('info', function(info) {
		console.log('Download started');
		console.log('filename: ' + info.filename);
		title = info.title
		console.log('size: ' + info.size);
	});

	video.pipe(fs.createWriteStream('title.mp4'));
	video.on('end', function() {
	  console.log('finished downloading!');
	  res.end()
	});
});

module.exports = router;
