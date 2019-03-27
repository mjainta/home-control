const mqtt = require('mqtt');

const mqtt_topic = 'mytopic'
class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'localhost';
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect({host: this.host, port: 1883, protocoll: 'mqtt'});

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(mqtt_topic, {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to configured topic
  sendMessage(message) {
    this.mqttClient.publish(mqtt_topic, message);
  }
}

module.exports = MqttHandler;