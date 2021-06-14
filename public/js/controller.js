const socket = io();
const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
const roomid = getLastItem(location.pathname);

socket.emit('join-room', roomid);

const joystick = createJoystick(window.document.getElementById('controller'));
const clickBtn = window.document.getElementById('clickBtn');
clickBtn.addEventListener('click', toggleBtn)

let tapButton;

function toggleBtn(){
    tapButton = true
    socket.emit('clickObject', tapButton);
    tapButton = false
    console.log("toggle")
}

function createJoystick(parent) {
    const maxDiff = 100;
    const stick = document.createElement('div');
    
    stick.classList.add('controller-inner');
  
    stick.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    stick.addEventListener('touchstart', handleMouseDown, {passive: false});
  /*   document.addEventListener('touchstart', handleDoubleTouch, {passive: false}) */
    document.addEventListener('touchmove', handleMouseMove, {passive: false});
    document.addEventListener('touchend', handleMouseUp, {passive: false});
    
  
    let dragStart = null;
    let currentPos = { x: 0, y: 0 };
    let emitTimer;

   /*  let timeout;
    let lastTap = 0;

    function handleDoubleTouch(event) {
        console.log("event")
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        clearTimeout(timeout);
        if (tapLength < 500 && tapLength > 0) {
            console.log("doubletouch")
            tapButton = true
            socket.emit('clickObject', tapButton);
            tapButton = false
            event.preventDefault();
        }
        lastTap = currentTime;
    }; */
  
    function handleMouseDown(event) {
        stick.style.transition = '0s';
        emitTimer = setInterval(function(){
            socket.emit('moveJoystick', currentPos);
            console.log(currentPos)
        }, 10);
        if (event.changedTouches) {
            dragStart = {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY,
            };
            return;
        }
        dragStart = {
            x: event.clientX,
            y: event.clientY,
        };
    }

    function handleMouseMove(event) {
        if (dragStart === null) {
            return;
        } 
        event.preventDefault();
        if (event.changedTouches) {
            event.clientX = event.changedTouches[0].clientX;
            event.clientY = event.changedTouches[0].clientY;
        }
        const xDiff = event.clientX - dragStart.x;
        const yDiff = event.clientY - dragStart.y;
        const angle = Math.atan2(yDiff, xDiff);
        const distance = Math.min(maxDiff, Math.hypot(xDiff, yDiff));
        const xNew = distance * Math.cos(angle);
        const yNew = distance * Math.sin(angle);
        stick.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
        currentPos = { x: xNew, y: yNew };
    }
  
    function handleMouseUp(event) {
      if (dragStart === null) {
          
        return;
      } 
      stick.style.transition = '.2s';
      stick.style.transform = `translate3d(0px, 0px, 0px)`;
      dragStart = null;
      currentPos = { x: 0, y: 0 };
      clearInterval(emitTimer);
      console.log(currentPos)
    }
  
    parent.appendChild(stick);
    return {
      getPosition: () => currentPos,
    };

  }
  