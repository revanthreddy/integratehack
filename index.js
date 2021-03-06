var express = require('express');
var app = express();
var path = require('path');
var async = require("async");
var request = require("request");


var accountSid = 'AC3bf75f630d9132bcd7d03300527b0dd3';
var authToken = 'ea04068f880d019e46fb9ce1b19dfa09';

app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname + '/public')));


var client = require('twilio')(accountSid, authToken);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');

});

app.post('/', function (req, res) {
  client.messages.create({
    to: "7138262502",
    from: "+18329243636",
    body: "Documents signed"
  }, function (err, message) {
    console.log(err);
    console.log(message);

    res.send('Hello World!');
  });

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// app.get('/trends', function (req, res) {
//   var trends = [];
//   var topics = ["SquareFootage", "YearBuilt", "WhatsTheArea", "DoesItHaveAPool", "NumberOfBedrooms", "Stories", "NearbySchools"];

//   async.eachSeries(topics, function (topic, callback) {

//     var path = "https://service.datadirectcloud.com/api/odata/realtycheck/trendses/$count?$filter=question eq '"+topic+"'";

//     var options = {
//       method: 'GET',
//       url: path,
//       headers: {
//         'authorization': 'Basic Y29vbjpDMDBuJkZyaWVuZHM='
//       }
//     }

//     request(options, function (error, response, body) {
//       try {
//         if (!error && response.statusCode == 200) {
//           trends.push({"name" : topic , "count" : response.body});
//           callback(null , true);
//         } else {
//           console.error(error);
//           callback(error , null)
//         }
//       } catch (err) {
//         console.log(err);

//       }

//     });

//   }, function (err, result) {

//     return res.status(200).json(trends);

//   });


// });


app.get('/timeline', function (req, res) {
  var path = "https://service.datadirectcloud.com/api/odata/realtycheck/eventses?$orderby=date desc&$format=json&$top=10";

    var options = {
      method: 'GET',
      url: path,
      headers: {
        'authorization': 'Basic Y29vbjpDMDBuJkZyaWVuZHM='
      }
    }

    request(options, function (error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          var resp = JSON.parse(body);
          res.status(200).json(resp.d.results);
        } else {
          console.error(error);
          res.status(response.statusCode).json([]);
          }
      } catch (err) {
        console.log(err);
        res.status(response.statusCode).json([]);
      }

    });


});



app.get('/trends', function (req, res) {
  var path = "http://ec2-54-161-139-208.compute-1.amazonaws.com:8000/stats";

    var options = {
      method: 'GET',
      url: path ,
      header :{
        'Content-Type' : 'application/json'
      }
    }

    request(options, function (error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          var resp = JSON.parse(body);
          res.status(200).json(resp);
        } else {
          console.error(error);
          res.status(response.statusCode).json([]);
          }
      } catch (err) {
        console.log(err);
        res.status(response.statusCode).json([]);
      }

    });


});