$(function() {
    const socket = io();
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
    const roomid = getLastItem(location.pathname);

    socket.emit('join-room', roomid);

    $(document).on('mousemove', function(event) {
        socket.emit('controllerActivity', { x: event.pageX, y: event.pageY });
    });

});