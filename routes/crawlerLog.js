var express = require('express');
var router = express.Router();
var Config = require('../config/config');
var fs = require('fs');
var conf = new Config();
var logPath = conf.crawlerLog;
var dateNow = new Date();
var year = dateNow.getFullYear();
var month = dateNow.getMonth() + 1;
month = month <10 ? "0"+month : month
var day = dateNow.getDate();
var mtTraderLogName = year + month + day + ".log";
logPath = logPath + mtTraderLogName;

/* GET about page. */
router.get('/', function(req, res, next) {
	var search = req.query.search;
	var results = [];
	console.log(search);
	if (search === undefined || search === '') {
			var logContent =  fs.readFileSync(logPath,'utf-8');
			var lines = logContent.trim().split('\n');
	 		res.render('crawlerLog', {
	        title: 'This is crawlerLog last page',
	        logPath: logPath,
	        logContent: lines
   		 });
	} else {
		fs.readFileSync(logPath,'utf-8').toString().split('\n').forEach(function (line) { 
   			 if ((line.toString()).indexOf(search) > -1) {
				console.log('it matched');
   			 	results.push(line.toString());
   			 }
   			 
		});
		// var logContent =  fs.readFileSync(logPath,'utf-8');
		// for ( var i = logContent.length; i > 0; i ++)
		
		res.render('crawlerLog', {
	        title: 'This is search results:',
	        logPath: logPath,
	        logContent: results
   		 });

	}
   
});

module.exports = router;