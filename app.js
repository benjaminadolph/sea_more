const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const io = require('socket.io')(app.listen(port));

const indexRoute = require('./routes/index');

// ______________________________________________________________________________________________
// Connection with controller

io.on('connection', (socket) => {
  socket.on('join-room', (roomid) => {
    socket.join(roomid);
    socket.broadcast.to(roomid).emit('controllerAdded');

    socket.on('disconnect', () => {
      socket.broadcast.to(roomid).emit('controllerRemoved', { session_id: socket.id });
    });

    socket.on('moveJoystick', (data) => {
      socket.broadcast.to(roomid).emit('canvasMoveViewport', { session_id: socket.id, direction: data });
    });

    socket.on('clickObject', (data) => {
      socket.broadcast.to(roomid).emit('emitClick', { session_id: socket.id, clicked: data });
    });

    socket.on('changeText', (data) => {
      socket.broadcast.to(roomid).emit('changeText', { session_id: socket.id, text: data });
    });
  });
});

// ______________________________________________________________________________________________
// Console Infos

/* eslint-disable no-console */
console.log('The Sea More App is running at: ');
console.log(`- Local: http://localhost:${port}`);
require('dns').lookup(require('os').hostname(), (err, add) => {
  console.log(`- Network: http://${add}:${port}`);
});
/* eslint-disable no-console */

// ______________________________________________________________________________________________
// Page Routing

app.use('/', indexRoute);
app.use(express.static(`${path.dirname(require.main.filename)}/public`));
app.set('view engine', 'ejs');

const infopages = [
  '/deep-sea-mining',
  '/shipwrecks',
  '/microplastic',
  '/overfishing',
  '/fishernets',
  '/sewage',
];

infopages.forEach((page) => {
  app.get(page, (req, res) => {
    res.render(`infopages${page}`, {
      cx: 0,
      cy: 0,
    });
  });
});

app.get('/impressum', (req, res) => {
  res.render('imprint');
});

app.get('/unternimm-etwas', (req, res) => {
  res.render('do-something');
});

app.get('/datenschutz', (req, res) => {
  res.render('privacy');
});
