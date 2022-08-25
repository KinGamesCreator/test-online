var host = 'SERVER IP & PORT';
var socket;

var players = {};
connection = false;

function setup() {
  createCanvas(400, 400);

  socket = new WebSocket('ws://' + host);
  socket.onopen = () => connection = true;
  socket.onmessage = readMessage;
  socket.onclose = () => connection = false;
}

function draw() {
  background("#2307AF");

  let aux = Object.keys(players);
  for (var i = 0; i < aux.length; i++) {
    ellipse(
        players[aux[i]].x,
        players[aux[i]].y,
        20,
        20
    );
  }

  if (connection) socket.send(JSON.stringify({x : mouseX, y: mouseY}));
}

function readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  console.log(msg);
  players = JSON.parse(msg);
}