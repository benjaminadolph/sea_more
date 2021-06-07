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
    socket.join(roomid);
    socket.broadcast.to(roomid).emit('controllerAdded');

    socket.on('moveJoystick', function(data){
      socket.broadcast.to(roomid).emit('canvasMoveViewport', {session_id: socket.id, direction: data });
    });

    socket.on('dblclickJoystick', function(data){
      socket.broadcast.to(roomid).emit('canvasDblClickButton', {session_id: socket.id, clicked: data });
    });
  });
  
});

console.log('The Sea More App is running at: ');
console.log('- Local: http://localhost:' + port)
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('- Network: http://' + add + ':' + port);
})
