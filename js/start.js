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
    // Sarah's IP: http://192.168.0.171:3000 sonst: http://localhost:3000
    const stringdata = `http://192.168.188.44:3000/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode')
        container.appendChild(canvas)
      })

    socket.on('controllerAdded', function(data){
        $('#start-intro').fadeOut();
    });

    socket.on('allControllerActivity', function(data) {
        console.log(data.direction);
        moveViewport(data.direction)
    });

    function pagination() {
        var offset = $(document).scrollTop();
        var windowHeight = $(window).height();
        var $body = $('body');
        var padding = .75;
        var chapters = Object.keys($('.chapter')).filter((section) => Number(section) + 1).map(section => Number(section) + 1)

        chapters.map((chapter) => {
            if (offset > (windowHeight * (chapter - 2 + padding))) {
            $body.removeClass().addClass("chapter-" + chapter);
            }
        });
    };

    pagination();

    $(document).on('scroll', pagination);

    // Das funktioniert nicht, weil das dann auf alle Links mit href="#" geht! 
    /* $(document).on('click', 'a[href^="#"]', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    }); */

    function openNav() {
        document.getElementById("nav").style.display = "block";
        document.getElementById("menu-icon").style.display = "none";
    }

    function closeNav() {
        document.getElementById("nav").style.display = "none";
        document.getElementById("menu-icon").style.display = "block";
    }

    function closeInfo() {
        document.getElementById("information").style.display = "none";
        document.getElementById("menu-icon").style.display = "block";
    }
    
});
