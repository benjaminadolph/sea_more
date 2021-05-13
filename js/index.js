var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('Server gestartet');
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + './../index.html');
});

app.get('/controller', function(req, res) {
  res.sendFile(__dirname + './../controller.html');
});

io.on('connection', function(socket, name) {
  // was passiert, wenn sich jemand connected
  socket.on('controllerActivity', function(data){
    io.emit('allControllerActivity', {session_id: socket.id, coordinations: data });
  });

  socket.on('buttonActivityTop', function() {
    io.emit('goTop', {session_id: socket.id });
  });

  socket.on('buttonActivityBottom', function() {
    io.emit('goBottom', {session_id: socket.id });
  });

  socket.on('buttonActivityRight', function() {
    io.emit('goRight', {session_id: socket.id });
  });

  socket.on('buttonActivityLeft', function() {
    io.emit('goLeft', {session_id: socket.id });
  });
});

