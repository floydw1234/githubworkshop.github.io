var http = require('http');
var request = require('request');
var JSON = require('JSON')
var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;
var mongodbURI = 'mongodb://localhost:27017/west';
//var collection, client; 


var options = {
  "method": "GET",
  "hostname": "192.168.10.129",
  "port": "50334",
  "path": "/devices",
  "headers": {
    "cache-control": "no-cache",
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
   var body = Buffer.concat(chunks);
        jsonParsed = JSON.parse(body.toString());
        console.log(jsonParsed);
        console.log("\n");

//start of Mongo
        mongodbClient.connect(mongodbURI,function(err, db) {
        if(err) { return console.dir(err); }

        db.createCollection('SmartNetDevices', {strict:true}, function(err, collection) {});  
        var collection = db.collection("SmartNetDevices");


        collection.insert(jsonParsed, {w:1}, function(err, result) {});

        });

//end of mongo 

  });
});


