var express = require('express');
var router = express.Router();
var fs = require('fs');
path = require('path');
var youtubedl = require('youtube-dl');

/* GET home page. */
router.get('/download/:id/:format', function (req, res, next) {
	var id = req.params.id;
	var format = req.params.format;
	var filename;
	var video = youtubedl('https://www.youtube.com/watch?v=' + id, ['--format=' + format]);
	var title;
	video.on('info', function (info) {
		console.log('Download started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size / 1000000 + 'MB');
		filename = info._filename;
		video.pipe(fs.createWriteStream(info._filename));
		var tryFetch = {myString: filename};
		res.send(tryFetch);

	});

	video.on('end', function () {
		var pathname = path.join(__dirname, '../')
		console.log('finished downloading!');

	});

});

router.get('/getit', function(req, res, next) {

})

module.exports = router;
