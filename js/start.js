import { gsap } from "gsap";

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

    $('.menu-button').on('click', function() {
        $('#nav').toggle("slide", {direction: "right" }, 1000);
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
            $('#nav').toggle("slide", {direction: "right" }, 1000);
            $result.load(`/${page}`);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".background-elements",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
            
            gsap.utils.toArray(".parallax").forEach(layer => {
                const depth = layer.dataset.depth;
                const movement = -(layer.offsetHeight * depth)
                tl.to(layer, {y: movement, ease: "none"}, 0)
            });
        });
    });
    
});
