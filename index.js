// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




// start of my code
// api route must be able to read:
// unix '1451001600000'; date '2016-12-25'; utc  '05 October 2011, GMT'
// if date is undefined, then return the current time
function GetTimeStamp(req, res)
{
    const inputDate = (isNaN(Number(req.params.date))) ? req.params.date : Number(req.params.date);
    const rawDate = (inputDate == undefined) ? new Date().getTime() : new Date(inputDate).getTime();
    const newDate = new Date(rawDate).toUTCString();
    
    const dateJson = (newDate == "Invalid Date") ? {"error": newDate} : {"unix": rawDate, "utc": newDate};

    res.send(dateJson);
}

app.get("/api/:date?", (req, res) => {GetTimeStamp(req, res)});
// end of my code





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
