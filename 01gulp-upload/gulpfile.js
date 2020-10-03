var gulp = require('gulp');
var fs = require('fs')
var request = require('request');

function getRandomInt(num) {
	return Math.floor(Math.random() * num + 1);
}

function randomWord(randomFlag, min, max) {
	var str = "",
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	// 随机产生
	if (randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for (var i = 0; i < range; i++) {
		pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	return str;
}



function uploadFile() {
	var activityId = getRandomInt(30);
	var corpId = getRandomInt(30);
	var name = randomWord(true, 2, 10)
	var brief = randomWord(true, 30, 100)
	var codeType = getRandomInt(4)
	var codeSource = ['./index.html', './css/wap-style.css', './js/main.js', './image/banner.jpg']
	var terminalType = getRandomInt(3)
	var orignData = {
		activityId: activityId,
		activityName: '活动' + activityId,
		corpId: corpId,
		name: name,
		brief: brief,
		terminalType: terminalType,
		codeType: codeType,
		packageLevel: '1',
	}
	var formData = {
		file: fs.createReadStream(codeSource[codeType - 1])
	};
	var ajaxUrl = 'http://192.168.0.201:8082/amms-back/code/page/add';
	var queryUrl = '';
	for (var item in orignData) {
		queryUrl += item + '=' + orignData[item] + '&'
	}
	queryUrl = queryUrl.slice(0, -1)
	ajaxUrl = ajaxUrl + '?' + queryUrl;
	//ajaxUrl = 'http://192.168.0.201:8082/amms-back/code/page/add?activityId=1&activityName=1&corpId=1&name=1&brief=1&terminalType=1&codeType=1&packageLevel=1'
	ajaxUrl = encodeURI(ajaxUrl);
	request.post({
		url: ajaxUrl,
		formData: formData,
		headers: {
			'token': '1'
		}
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {}
		console.log('success:', body)
	})
}

gulp.task('default', function() {
	for(var i = 0 ; i < 30 ;i++){
		uploadFile()
	}
})