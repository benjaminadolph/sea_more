
$(function() {
    const socket = io();

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

    // Join a channel
    const room = 'test';
    console.log(room);
    socket.emit("join", room);

    // Generate a new UUID
    // const id = uuid4();

    // Validate a UUID as proper V4 format (case-insensitive)
    // uuid4.valid(id); // true

    socket.on("image", function (image) {
        console.log('index.html on image');
    });

    /* socket.on('goTop', function(data) {
        console.log('goTop');
        currentMousePos.x += 100;
        console.log(currentMousePos.x);
    });

    socket.on('goBottom', function(data) {
        console.log('goBottom');
    });

    socket.on('goLeft', function(data) {
        console.log('goLeft');
    });

    socket.on('goRight', function(data) {
        console.log('goRight');
    }); */
});