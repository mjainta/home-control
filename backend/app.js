var express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

var mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
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