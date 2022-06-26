'use strict'

var mqtt;
const host = "127.0.0.1";
const port = 8080;
const cname = "automation-dashboard";

function onConnect() {
    console.log("Successfully connected to mqtt broker");
}

function onConnectionLost(err) {
    if (err.errorCode !== 0) {
        console.log("onConnectionLost:" + err.errorMessage);
    }
    MQTTconnect();
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    handleMessage(message.payloadString);
}

function publish(topic, message) {
    mqtt.send(topic, message, 1, false);
}

function MQTTconnect() {
    console.log("mqtt client: connecting to " + host + ":" + port);
    mqtt = new Paho.MQTT.Client(host, port, cname);
    var options = {timeout: 3, onSuccess: onConnect,};
    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}
