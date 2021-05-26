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
    const QRCode = require('qrcode');
    const robot = require('robotjs');

    const roomid = randomString(21);
    
    // const roomid = 'test';
    socket.emit('join-room', roomid);
    console.log(roomid);
    
    const stringdata = `http://localhost:3000/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode')
        container.appendChild(canvas)
      })

    socket.on('allControllerActivity', function(data) {
        if(data) {
            robot.moveMouse(data.coordinations.x, data.coordinations.y);

            if ($('.pointer[session_id="' + data.session_id + '"]').length <= 0) {
                $('body').append('<div class="pointer" session_id="' + data.session_id + '"></div>');
            }
            var $pointer = $('.pointer[session_id="' + data.session_id + '"]');

            $pointer.css('left', data.coordinations.x);
            $pointer.css('top', data.coordinations.y);
        }
        
    });

    const currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
});
