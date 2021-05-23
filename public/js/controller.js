$(function() {
    const socket = io();
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
    const roomid = getLastItem(location.pathname);

    socket.emit('join-room', roomid);

    var $controllerInner = $('.controller-inner');

    $controllerInner.draggable({
        revert: true
        /*drag: function( event, ui ) {
        
            // Keep the left edge of the element
            // at least 100 pixels from the container
            ui.position.left = Math.min( 100, ui.position.left );
        } */
    });

    $controllerInner.on( "drag", function( event, ui ) {
        if (ui.position.top < 0 && ui.position.left > 0) {
            socket.emit('controllerActivity', 'bottom');
        } else if (ui.position.top > 0 && ui.position.left < ui.originalPosition.left + 30) {
            socket.emit('controllerActivity', 'top');
        } else if (ui.position.top > 0 && ui.position.left < 0) {
            socket.emit('controllerActivity', 'left');
        } else if (ui.position.top > 0 && ui.position.left > ui.originalPosition.left + 30) {
            socket.emit('controllerActivity', 'right');
        }
    });

});