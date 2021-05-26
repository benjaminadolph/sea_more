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
    const stringdata = `http://192.168.0.171:3000/controller/${roomid}`;
   
    QRCode.toCanvas(stringdata, { errorCorrectionLevel: 'H' }, function (err, canvas) {
        if (err) throw err
       
        var container = document.getElementById('qrcode')
        container.appendChild(canvas)
      })

    socket.on('controllerAdded', function(data){
        $('#start-intro').fadeOut();
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

    var $screenButton = $('.button-intro--screen-one');
    $screenButton.on('click', function(e){
        e.preventDefault();
        $('.screen-one').hide();
        $('.screen-two').fadeIn();
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

    $(document).on('click', 'a[href^="#"]', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

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
