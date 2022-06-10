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
app.get("/api/:date", (req, res, next) =>{
  if (new RegExp(/(^\d{4}-[0-1]\d-[0-3]\d)/).test(req.params.date)) {
    req.params.date = req.params.date.match(/(^\d{4}-[0-1]\d-[0-3]\d)/)[0];
    let unix = new Date(req.params.date).getTime();
    let utc = new Date(req.params.date).toUTCString();
    res.json({unix: unix, utc: utc})
  }else if (new RegExp(/(^\d{1,}$)/).test(req.params.date)){
    res.json({ unix: parseInt(req.params.date), utc: new Date(parseInt(req.params.date)).toUTCString()});
  }else if (req.params.date === ''){
    res.json({unix: new Date.now(), utc: new Date.now().toUTCString()});
  }else if(new Date(req.params.date).toString() === 'Invalid Date'){
    res.json({error: "Invalid Date"});
  }
  else{
    let unix = new Date(req.params.date).getTime();
    let utc = new Date(req.params.date).toUTCString();
    res.json({unix: unix, utc: utc})
  }
})

app.get("/api/", (req,res) => {
  res.json({unix: Date.now(), utc: Date.now()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
