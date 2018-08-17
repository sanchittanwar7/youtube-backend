var express = require('express');
var router = express.Router();
var fs = require('fs');
path = require('path');
var youtubedl = require('youtube-dl');

/* GET home page. */
router.get('/download/:id/:format/:filename', function (req, res, next) {
	var id = req.params.id;
	var format = req.params.format;
	var filename = req.params.filename;
	var video = youtubedl('https://www.youtube.com/watch?v=' + id, ['--format=' + format]);
	var title;
	video.on('info', function (info) {
		console.log('Download started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size / 1000000 + 'MB');
		video.pipe(fs.createWriteStream(filename));

	});

	video.on('end', function () {
		var pathname = path.join(__dirname, '../')
		console.log('finished downloading!');
		res.end()
	});

});

router.get('/getit/:filename', function(req, res, next) {
	var filename = req.params.filename;
	var pathname = path.join(__dirname, `../${filename}`);
	console.log('transfering ', filename, ' ', pathname)
	res.download(pathname, filename); 
})

module.exports = router;
