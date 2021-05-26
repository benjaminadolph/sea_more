$(function() {
    const socket = io();
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
    const roomid = getLastItem(location.pathname);

    socket.emit('join-room', roomid);

    var $controllerInner = $('.controller-inner');

    $controllerInner.draggable({
        revert: true
    });

    $controllerInner.on( "drag", function( event, ui ) {
        if (ui.position.top < 0 && ui.position.left < ui.originalPosition.left + 30 && ui.position.left > ui.originalPosition.left - 30) {
            socket.emit('controllerActivity', 'bottom');
        } else if (ui.position.top > 0 && ui.position.left < ui.originalPosition.left + 30 && ui.position.left > ui.originalPosition.left - 30) {
            socket.emit('controllerActivity', 'top');
        } else if (ui.position.top < ui.originalPosition.top + 30 && ui.position.top > ui.originalPosition.top - 30 && ui.position.left < 0) {
            socket.emit('controllerActivity', 'left');
        } else if (ui.position.top < ui.originalPosition.top + 30 && ui.position.top > ui.originalPosition.top - 30 && ui.position.left > 0) {
            socket.emit('controllerActivity', 'right');
        }
    });

});