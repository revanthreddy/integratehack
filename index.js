var express = require('express');
var app = express();


var accountSid = 'AC3bf75f630d9132bcd7d03300527b0dd3';
var authToken = 'ea04068f880d019e46fb9ce1b19dfa09';

var client = require('twilio')(accountSid, authToken);



app.get('/', function (req, res) {
client.messages.create({
    to: "7138262502",
    from: "+18329243636",
    body: "Documents signed"
  }, function(err, message) {
	console.log(err);
    console.log(message);

  res.send('Hello World!');
  });

});

app.post('/', function (req, res) {
client.messages.create({
    to: "7138262502",
    from: "+18329243636",
    body: "Documents signed"
  }, function(err, message) {
        console.log(err);
    console.log(message);

  res.send('Hello World!');
  });

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
