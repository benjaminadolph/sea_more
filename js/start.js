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

$(function() {
    const socket = io();
    // const roomid = randomString(21);
    const roomid = 'test';
    socket.emit('join-room', roomid);
    console.log(roomid);

    const QRCode = require('qrcode');
    // Sarah's IP: http://192.168.10.102:3000 sonst: http://localhost:3000
    const stringdata = `http://192.168.0.171:3000/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode')
        container.appendChild(canvas)
      })

    socket.on('controllerAdded', function(data){
        $('#qrcode').fadeOut();
    });

    socket.on('allControllerActivity', function(data) {
        // console.log(data.coordinations);
        if (data.direction == 'left') {
            goLeft();
        } else if (data.direction == 'right') {
            goRight();
        } else if (data.direction == 'top') {
            goTop();
        } else if (data.direction == 'bottom') {
            goBottom();
        } 

        if(data) {
            /* if ($('.pointer[session_id="' + data.session_id + '"]').length <= 0) {
                $('body').append('<div class="pointer" session_id="' + data.session_id + '"></div>');
            } */
            /* var $pointer = $('.pointer[session_id="' + data.session_id + '"]');

            $pointer.css('left', data.coordinations.x);
            $pointer.css('top', data.coordinations.y); */
        }
        
    });

    const currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
});
