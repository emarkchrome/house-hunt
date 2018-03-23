var expect = require('chai').expect;
import { getImagesArray } from '../server';

describe('Server configuration', function() {
	it('Function should turn an AWS data array into an array of object URLs', function() {
		var data = [{
		    "Key": "cool_house.jpg",
		    "LastModified": "2017-12-24T20:56:02.000Z",
		    "ETag": "\"bff56b2f921436e4a8fa9b5b9db01b9f\"",
		    "Size": 302395,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}, {
		    "Key": "cool_house2.jpg",
		    "LastModified": "2017-12-24T21:28:48.000Z",
		    "ETag": "\"312c22f1541c478cd989653dcedda950\"",
		    "Size": 77011,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}, {
		    "Key": "cool_house3.jpg",
		    "LastModified": "2017-12-24T21:28:49.000Z",
		    "ETag": "\"00bf3202f21e660b497d34e17f967848\"",
		    "Size": 107315,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}, {
		    "Key": "cool_house4.jpg",
		    "LastModified": "2017-12-24T21:28:50.000Z",
		    "ETag": "\"b46c34cd595e1c6418e484a332092af7\"",
		    "Size": 48812,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}, {
		    "Key": "cool_house5.jpg",
		    "LastModified": "2017-12-24T21:28:50.000Z",
		    "ETag": "\"b4e335337604579099d5da04b6206939\"",
		    "Size": 117547,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}, {
		    "Key": "cool_house6.jpg",
		    "LastModified": "2017-12-24T21:28:50.000Z",
		    "ETag": "\"f4ae492be3982a0d992b21a62f436940\"",
		    "Size": 79966,
		    "StorageClass": "STANDARD",
		    "Owner": {
		        "DisplayName": "marco.polofl",
		        "ID": "6a5773ad1c45644cec77323d9fbdaab64935d07244aef366c00b50aa9ba706a9"
		    }
		}];
		var result = [
			"https://s3.amazonaws.com/house-hot-or-not/cool_house.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house2.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house3.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house4.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house5.jpg",
			"https://s3.amazonaws.com/house-hot-or-not/cool_house6.jpg"
		];
		expect(getImagesArray(data, [])).to.have.members(result);
	})
});
