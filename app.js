const express = require('express');
const path = require('path');
const indexRoute = require('./routes/index');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const io = require('socket.io')(app.listen(port));

app.use('/', indexRoute);
console.log(path.dirname(require.main.filename))
app.use(express.static(path.dirname(require.main.filename) + '/public'));
app.set('view engine', 'ejs');

io.on('connection', function(socket) {
  socket.on('join-room', function (roomid) {
    socket.join(roomid);
    socket.broadcast.to(roomid).emit('controllerAdded');

    socket.on('disconnect', function() {
      socket.broadcast.to(roomid).emit('controllerRemoved', {session_id: socket.id});
    });

    socket.on('moveJoystick', function(data){
      socket.broadcast.to(roomid).emit('canvasMoveViewport', {session_id: socket.id, direction: data });
    });

    socket.on('clickObject', function(data){
      socket.broadcast.to(roomid).emit('emitClick', {session_id: socket.id, clicked: data });
    });

  });
});

console.log('The Sea More App is running at: ');
console.log('- Local: http://localhost:' + port)
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('- Network: http://' + add + ':' + port);
})

const infopages = [
  '/deep-sea-mining',
  '/shipwrecks',
  '/microplastic',
  '/overfishing',
  '/fishernets',
  '/sewage'
];

infopages.forEach(function(page) {
  app.get(page, function (req, res) { 
    res.render(`infopages${page}`, {
      cx: 0,
      cy: 0,
    });
  });
});

app.get('/impressum', function (req, res) { 
  res.render('impressum');
});

app.get('/datenschutz', function (req, res) { 
  res.render('datenschutz');
});
