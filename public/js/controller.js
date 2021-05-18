$(function() {
    const socket = io();
    const key = "test123"
    console.log("Controller.html, Socketid"+ key)

    if(key.length) {
        socket.emit('load', {
            key: key
        });
    }

    socket.on('access', function(data){
        console.log(data.access)
        if(data.access === "granted") {
            $(document).on('mousemove', function(event) {
                socket.emit('controllerActivity', { x: event.pageX, y: event.pageY });
            });
        }
    });
    
    const room = 'test';
    console.log(room);
    socket.emit("join", room);

    /* $(document).on('touchmove', function(event) {
        socket.emit('controllerActivity', { x: event.pageX, y: event.pageY });
    }); */

    /* var $controller = $('.controller-inner-click');
    $controller.on('touchstart click', function(event){
        var $el = $(this);
        if ($el.hasClass('top')){
            socket.emit('buttonActivityTop', {});
        } else if ($el.hasClass('right')){
            socket.emit('buttonActivityRight', {});
        } else if ($el.hasClass('left')){
            socket.emit('buttonActivityLeft', {});
        } else if ($el.hasClass('bottom')){
            socket.emit('buttonActivityBottom', {});
        }
    }); */
});