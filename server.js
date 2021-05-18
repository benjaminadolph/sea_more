const express = require('express');
const indexRoute = require('./routes/index');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const io = require('socket.io')(app.listen(port));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/', indexRoute);


io.on('connection', function(socket) {
  socket.on("join", function (room) {
    // join channel provided by client
    socket.join(room)
    // Register "image" events, sent by the client
    socket.on("image", function(msg) {
      // Broadcast the "image" event to all other clients in the room
      socket.broadcast.to(room).emit("image", msg);
    });
  });

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
