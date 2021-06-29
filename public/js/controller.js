const socket = io();
const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);
// eslint-disable-next-line no-restricted-globals
const roomid = getLastItem(location.pathname);
let tapButton;
const clickBtn = window.document.getElementById('clickBtn');

socket.emit('join-room', roomid);

function createJoystick(parent) {
  const maxDiff = 100;
  const stick = document.createElement('div');

  let dragStart = null;
  let currentPos = { x: 0, y: 0 };
  let emitTimer;

  function handleMouseDown(event) {
    stick.style.transition = '0s';
    emitTimer = setInterval(() => {
      socket.emit('moveJoystick', currentPos);
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

  function handleMouseUp() {
    if (dragStart === null) {
      return;
    }
    stick.style.transition = '.2s';
    stick.style.transform = 'translate3d(0px, 0px, 0px)';
    dragStart = null;
    currentPos = { x: 0, y: 0 };
    clearInterval(emitTimer);
  }
  stick.classList.add('controller-inner');

  stick.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  stick.addEventListener('touchstart', handleMouseDown, { passive: false });
  document.addEventListener('touchmove', handleMouseMove, { passive: false });
  document.addEventListener('touchend', handleMouseUp, { passive: false });

  parent.appendChild(stick);
  return {
    getPosition: () => currentPos,
  };
}

createJoystick(window.document.getElementById('controller'));

function toggleBtn() {
  tapButton = true;
  socket.emit('clickObject', tapButton);
  tapButton = false;
}

clickBtn.addEventListener('click', toggleBtn);

socket.on('changeText', (data) => {
  $('#clickBtn .text').html(data.text);
});
