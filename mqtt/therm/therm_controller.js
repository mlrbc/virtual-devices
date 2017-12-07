var mqtt = require('mqtt');
var therm = mqtt.connect("mqtt://localhost:5003");
var therms = {};

therm.on('connect', function () {
  therm.subscribe('drivers/termometer');
})

therm.on('message', function (topic, message) {
  // message is Buffer
  let mensagem = message.toString();
  let n = mensagem.indexOf(">");
  let id = mensagem.slice(0,n);
  let temp = mensagem.slice(n+1,);
  console.log("mensagem: " + message + " indice '>': " + n + " id: " + id + " temperatura: " + temp);
  therms[id] = temp;
});

/**
 * @param {string} deviceId o id do dispositivo
 */
function thermGetTemp(deviceId){
  console.log(therms[deviceId]);
  return therms[deviceId];
}

setTimeout(() => {
  thermGetTemp("10");
}, 1000);