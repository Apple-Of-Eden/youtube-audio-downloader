var express = require('express');
var router = express.Router();

var fs = require('fs');
var ytdl = require('ytdl-core');

/* POST download listing. */
router.post('/', function(req, res, next) {
	var youtubeURL = req.body.youtubeURL.trim();
	var title = "";
	console.log("YoutubeURL: "+youtubeURL);


	ytdl.getInfo(youtubeURL, {}, function(err, info) {
		if(err) {
			console.log("got an error");
		} else {
			title = info.title.trim() + ".mp3";
			console.log(title)

			res.setHeader('Content-disposition', 'attachment; filename=' + title);
			res.setHeader('Content-type', 'audio/mpeg');

    		ytdl(youtubeURL, { filter: "audioonly" }).pipe(res)  
		}
	});

    
});

module.exports = router;