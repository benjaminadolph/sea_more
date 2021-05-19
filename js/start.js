function randomString(length_) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    const str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

$(function() {
    const socket = io();
    //const roomid = randomString(9);
    const roomid = 'test';
    socket.emit('join-room', roomid);

    const QRCode = require('qrcode');
    const stringdata = `http://192.168.10.102:3000/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode')
        container.appendChild(canvas)
      })

    socket.on('allControllerActivity', function(data) {
        if(data) {
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
