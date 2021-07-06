const QRCode = require('qrcode');

// creates randwom string for socket room
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

const socket = io();
const roomid = randomString(21);

window.changeText = function (text) {
  socket.emit('changeText', text);
};

$(() => {
  socket.emit('join-room', roomid);
  // eslint-disable-next-line no-console
  console.log(roomid);

  const stringdata = `https://seamore.herokuapp.com/controller/${roomid}`;

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

  // rendering of infopages:
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

  // qr code bottom click
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

  // facts slider
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
