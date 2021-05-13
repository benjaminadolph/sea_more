const express = require('express');

// Creating an express server
const app = express();

// This is needed if the app is run on heroku and other cloud providers:
const port = process.env.PORT || 3000;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.
const io = require('socket.io')(app.listen(port));

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller', function(req, res) {
  res.sendFile(__dirname + '/controller.html');
});

io.on('connection', function(socket, name) {
  // A new client has come online. Check the secret key and 
  // emit a "granted" or "denied" message.
  socket.on('load', function(data){
    socket.emit('access', {
        access: (data.key === secret ? "granted" : "denied")
    });
  });
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

console.log('Your Server is running on http://localhost:' + port);
