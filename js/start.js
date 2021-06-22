function randomString(length_) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    let str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

const socket = io();
// const roomid = randomString(21);
const roomid = 'test';

window.changeText = function(text) {
    socket.emit('changeText', text);
}

$(function() {
    socket.emit('join-room', roomid);
    console.log(roomid);

    const QRCode = require('qrcode');
    // Sarah's IP: http://192.168.0.171:3000 sonst: http://localhost:3000
    const stringdata = `https://seamore.herokuapp.com/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode');
        container.appendChild(canvas);
    });

    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode-bottom');
        container.appendChild(canvas);
    });

    socket.on('controllerAdded', function(data){
        $('#start-intro').fadeOut();
        addTurtle();
    });

    socket.on('controllerRemoved', function(data) {
        removeTurtle();
    });

    socket.on('canvasMoveViewport', function(data) {
        moveViewport(data.direction);
    });

    socket.on('emitClick', function(data) {
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
        'sewage'
    ];

    infopages.forEach(function(page) {
        $(`.${page}`).on('click', function() {
            menu.closeNavigation();
            $result.load(`/${page}`);
        });
    });

    $('.open-do-something').on('click', function() {
        menu.closeNavigation();
        $result.load('/unternimm-etwas');
    });

    $('.open-imprint').on('click', function() {
        menu.closeNavigation();
        $result.load('/impressum');
    });

    $('.open-privacy').on('click', function() {
        menu.closeNavigation();
        $result.load('/datenschutz');
    });


    // qr code bottom click
    $('#qrcode-bottom').on('click', function(){
        if ($(this).hasClass('big')) {
            $(this)
            .removeClass('big')
            .css({
                width: 60,
                height: 60,
                top: 'auto',
                left: 'auto'
            });
        } else {
            $(this)
            .addClass('big')
            .animate({
                width: 300,
                height: 300,
                top: window.innerHeight / 2 - 150,
                left: window.innerWidth / 2 - 150
            });
        }
    });

    // facts slider
    var $slider = $('.slider');
    var $sliderElements = $slider.find('li');
    var $arrow = $('.arrow');
    var index = 0;

    $arrow.on('click', function() {
        $sliderElements.fadeOut('fast');
        if ($(this).hasClass('left')){
            if (index === 0) {
                index = $sliderElements.length-1;
            } else {
                index -= 1;
            }
        } else {
            if (index + 1 >= $sliderElements.length) {
                index = 0;
            } else {
                index += 1;
            }
        }
        $($sliderElements.get(index)).delay(500).fadeIn();
    });

});
