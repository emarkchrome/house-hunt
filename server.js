var express = require('express');
var AWS = require('aws-sdk');
var compression = require('compression');
var app = express();
var path = require('path');
app.use(compression());
var port = process.env.PORT || 5001;

AWS.config.region = 'us-east-1';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

function getImagesArray(data, outputArray) {
	if (data.length == 1) {
		return outputArray.concat(['https://s3.amazonaws.com/house-hot-or-not/' + data[0].Key])
	} else {
		return getImagesArray(data.slice(1, data.length), outputArray.concat(['https://s3.amazonaws.com/house-hot-or-not/' + data[0].Key]));
	}
}

var s3 = new AWS.S3();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/hello', function(req, res) {
	res.send('Hello!');
});

app.get('/api/get-images', function(req, res) {

	var params = {
		Bucket: "house-hot-or-not",
		MaxKeys: 25
	};

	s3.listObjects(params, function(err, data) {
		if (err) throw Error(err);
		else res.send({ data: getImagesArray(data.Contents, []) });
	});

});

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
	console.log('Server running at port ' + port);
});
