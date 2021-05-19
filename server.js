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
  socket.on('join-room', function (roomid) {
    socket.join(roomid)

    socket.on('controllerActivity', function(data){
      socket.broadcast.to(roomid).emit('allControllerActivity', {session_id: socket.id, coordinations: data });
    });
  });

  
});

console.log('Your Server is running on http://localhost:' + port);
