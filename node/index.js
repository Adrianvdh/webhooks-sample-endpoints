

var express = require('express');
var app = express();
var bl = require('bl')

const crypto = require('crypto');
const hmac = crypto.createHmac('sha1', 'secret');

var KEY = "secret";

app.get("/", function(req, res) {
  console.log("===============================================================");
  console.log('URL: ' + req.url);
  console.log('Query Params: ', req.query);
  console.log('Path Params: ', req.params);
  console.log("===============================================================");
  var challenge = req.query.challenge;
  if (!challenge || challenge === "") {
    res.sendStatus(400);
    return;      
  }
  res.status(200);
  res.send(challenge);
  return challenge;
});

app.post('/', function (req, res) {
  req.pipe(bl(function (err, data) {
    if (err) {
      return hasError(err.message)
    }
    var obj = JSON.parse(data.toString())
    console.log("===============================================================");
    console.log('URL: ' + req.url);
    console.log('Query Params: ', req.query);
    console.log('Path Params: ', req.params);
    console.log(data.toString());
    console.log("===============================================================");
  }));
  res.status(200);
  res.send("OK");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
