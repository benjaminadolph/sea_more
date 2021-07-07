// imports
const QRCode = require('qrcode');

// Creates random String for Socket.io-Rooms
// ______________________________________________________________________________________________
function randomString(stringLength) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
  if (typeof stringLength !== 'number') {
    stringLength = Math.floor(Math.random() * chars.stringLength);
  }
  let str = '';
  for (let i = 0; i < stringLength; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

// Creates global variables
// ______________________________________________________________________________________________
const socket = io();
const roomid = randomString(21);
// use this room id for local testing
// const roomid = 'test';

window.changeText = function (text) {
  socket.emit('changeText', text);
};

$(() => {
  socket.emit('join-room', roomid);
  const stringdata = `https://seamore.herokuapp.com/controller/${roomid}`;
  // use for local testing with your IP Adress
  // const stringdata = 'http://192.168.178.61:3000/controller/test';

  // Creates QR-Code
  // ______________________________________________________________________________________________

  QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, (err, canvas) => {
    if (err) throw err;

    let container = document.getElementById('qrcode');
    container.appendChild(canvas);
  });

  QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, (err, canvas) => {
    if (err) throw err;

    let container = document.getElementById('qrcode-bottom');
    container.appendChild(canvas);
  });

  // Socket.io Communication with Server
  // ______________________________________________________________________________________________

  socket.on('controllerAdded', () => {
    $('#start-intro').fadeOut();
    addTurtle();
  });

  socket.on('controllerRemoved', () => {
    removeTurtle();
  });

  socket.on('canvasMoveViewport', (data) => {
    moveViewport(data.direction);
  });

  socket.on('emitClick', (data) => {
    tapButton = data.clicked;
  });

  // Rendering of Infopages
  // ______________________________________________________________________________________________
  const $result = $('#infopages');
  const infopages = [
    'deep-sea-mining',
    'shipwrecks',
    'microplastic',
    'overfishing',
    'fishernets',
    'sewage',
  ];

  infopages.forEach((page) => {
    $(`.${page}`).on('click', () => {
      menu.closeNavigation();
      $result.load(`/${page}`);
    });
  });

  $('.open-do-something').on('click', () => {
    menu.closeNavigation();
    $result.load('/unternimm-etwas');
  });

  $('.open-imprint').on('click', () => {
    menu.closeNavigation();
    $result.load('/impressum');
  });

  $('.open-privacy').on('click', () => {
    menu.closeNavigation();
    $result.load('/datenschutz');
  });

  // QR-Code in Menubar
  // ______________________________________________________________________________________________
  $('#qrcode-bottom').on('click', function () {
    if ($(this).hasClass('big')) {
      $(this)
        .removeClass('big')
        .css({
          width: 60,
          height: 60,
          top: 'auto',
          left: 'auto',
        });
    } else {
      $(this)
        .addClass('big')
        .animate({
          width: 300,
          height: 300,
          top: window.innerHeight / 2 - 150,
          left: window.innerWidth / 2 - 150,
        });
    }
  });

  // Facts-Slider in Menu Bar
  // ______________________________________________________________________________________________
  let $slider = $('.slider');
  let $sliderElements = $slider.find('li');
  let $arrow = $('.arrow');
  let index = 0;

  $arrow.on('click', function () {
    $sliderElements.fadeOut('fast');
    if ($(this).hasClass('left')) {
      if (index === 0) {
        index = $sliderElements.length - 1;
      } else {
        index -= 1;
      }
    } else if (index + 1 >= $sliderElements.length) {
      index = 0;
    } else {
      index += 1;
    }
    $($sliderElements.get(index)).delay(500).fadeIn();
  });
});
