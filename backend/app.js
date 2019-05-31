var express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');

if (typeof process.env.HOME_CONTROL_MQTT_TOPIC == 'undefined') {
  throw "Set environment variable HOME_CONTROL_MQTT_TOPIC to continue!";
}

var mqttClient = new mqttHandler(process.env.HOME_CONTROL_MQTT_TOPIC);
mqttClient.connect();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ timers: [], count: 0 })
  .write()
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Routes
app.options("/timer", cors());
app.post("/timer", function(req, res) {
  req.body.id = db.get('count').value();
  console.log(req.body);
  db.get('timers')
    .push(req.body)
    .write()

  // Increment count
  db.update('count', n => n + 1)
    .write()

  res.status(200).send(req.body);
});

app.get("/timer", function(req, res) {
  timers = db.get('timers');
  res.status(200).send(timers);
});

app.options("/timer/:timerId", cors());
app.delete("/timer/:timerId", function(req, res) {
  console.log("DELETE Timer");
  console.log(req.params.timerId);
  db.get('timers')
    .remove(timer => timer.id == req.params.timerId)
    .write();

  res.status(200).send(req.params.timerId);
});

app.options("/send-mqtt", cors());
app.post("/send-mqtt", function(req, res) {
  console.log(req.body);
  const mqttJson = {
    "brightness": 255,
    "color": {
      "r": req.body.color.r,
      "g": req.body.color.g,
      "b": req.body.color.b,
    },
    "state": "ON"
  };
  mqttClient.sendMessage(JSON.stringify(mqttJson));

  res.status(200).send("Message sent to mqtt");
});

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});