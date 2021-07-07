// Imports
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Emitter } from 'pixi-particles';

// Import Data from data.js
import {
  content, buttons, coins, turtle, superturtle, background,
} from './data';

// Nur für Devtools in Chrome notwendig
window.PIXI = PIXI;

// Set global variables
// ______________________________________________________________________________________________
const canvas = document.getElementById('mycanvas');
let turtleAnimatedSprite;
let cointerCounter = 0;
const turtleSheet = {};
const superturtleSheet = {};
let animatedSheet = {};

window.tapButton = false;
window.showInfopage = false;

// Create Pixi Application and Viewport
// ______________________________________________________________________________________________
const app = new PIXI.Application({
  view: canvas,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  width: 8090,
  height: 8191,
  resizeTo: window,
  autoResize: true,
});

const viewport = app.stage.addChild(new Viewport({
  width: window.innerWidth,
  height: window.innerHeight,
  worldWidth: 8090,
  worldHeight: 8191,
  interaction: app.renderer.plugins.interaction,
}));

// Create Loader and add Images to loading queue
// ______________________________________________________________________________________________
const loader = PIXI.Loader.shared;

for (const i in background) {
  loader.add(background[i].name, background[i].url);
}

for (const i in content) {
  loader.add(content[i].name, content[i].url, {
    metadata: {
      resourceOptions: {
        scale: content[i].scale,
      },
    },
  });
}

for (const i in buttons) {
  loader.add(buttons[i].name, buttons[i].url, {
    metadata: {
      resourceOptions: {
        scale: buttons[i].scale,
      },
    },
  });
}

for (const i in coins) {
  loader.add(coins[i].name, coins[i].url, {
    metadata: {
      resourceOptions: {
        scale: coins[i].scale,
      },
    },
  });
}

for (const i in turtle) {
  loader.add(turtle[i].name, turtle[i].url);
}

for (const i in superturtle) {
  loader.add(superturtle[i].name, superturtle[i].url);
}

// Definde Actions for loader
// ______________________________________________________________________________________________

function handleLoadError() {
  // eslint-disable-next-line no-console
  console.error('error loading');
}

function handleLoadAsset() {
  // eslint-disable-next-line no-console
  console.log('asset loaded');
}

// eslint-disable-next-line no-shadow
function handleLoadProgress(loader, resource) {
  document.getElementById('loader-percentage').innerHTML = `${Math.round(loader.progress)}% loaded`;
  // eslint-disable-next-line no-console
  console.log(`${Math.round(loader.progress)}% loaded`, resource.name);
}

// Functions which handle click on coins or buttons
// ______________________________________________________________________________________________

function touchInfoBtn(touchContent) {
  const $result = $('#infopages');
  $result.load(`/${touchContent}`);
}

function clickInfoBtn() {
  const $result = $('#infopages');
  $result.load(`/${this.content}`);
}

function touchCoin(coin) {
  viewport.removeChild(coin.spriteRef);

  if (cointerCounter < 4) {
    cointerCounter++;
    document.getElementById('counter').innerHTML = `${cointerCounter}/5`;
  } else {
    cointerCounter++;
    document.getElementById('counter').innerHTML = `${cointerCounter}/5`;
    document.getElementById('all-coins-collected').style.display = 'flex';
  }
}

function clickCoin() {
  viewport.removeChild(this);
  if (cointerCounter < 4) {
    cointerCounter++;
    document.getElementById('counter').innerHTML = `${cointerCounter}/5`;
  } else {
    cointerCounter++;
    document.getElementById('counter').innerHTML = `${cointerCounter}/5`;
    document.getElementById('all-coins-collected').style.display = 'flex';
  }
}

// Create Enum for button text
// ______________________________________________________________________________________________

const btnText = {
  nothing: 0,
  close: 1,
  open: 2,
  collect: 3,
};

let currentButtonText;

function setBtnText(changeBtnText) {
  if (changeBtnText !== currentButtonText) {
    switch (changeBtnText) {
      case btnText.nothing:
        changeText('');
        break;
      case btnText.close:
        changeText('Schließen');
        break;
      case btnText.open:
        changeText('Öffnen');
        break;
      case btnText.collect:
        changeText('Einsammeln');
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('Fehler');
    }
    currentButtonText = changeBtnText;
  }
}

// Intersect function for hit testing (Check if objects on canvas overlap)
// ______________________________________________________________________________________________

let delta = 0;

function intersect() {
  // check if turtle intersects with a coin
  for (const i in coins) {
    const coin = coins[i].spriteRef.getBounds();
    const trtl = turtleAnimatedSprite.getBounds();
    // eslint-disable-next-line max-len
    if (coin.x + coin.width > trtl.x && coin.x < trtl.x + trtl.width && coin.y + coin.height > trtl.y && coin.y < trtl.y + trtl.height) {
      setBtnText(btnText.collect);
      delta += 0.1;
      coins[i].spriteRef.width = coins[i].spriteRef.width + Math.sin(delta) * 1;
      coins[i].spriteRef.height = coins[i].spriteRef.height + Math.sin(delta) * 1;
      if (tapButton) {
        touchCoin(coins[i]);
        tapButton = false;
        return;
      }
      return;
    }
  }
  // check if turtle intersects with a button
  for (const i in buttons) {
    const btn = buttons[i].spriteRef.getBounds();
    const trtl = turtleAnimatedSprite.getBounds();
    // eslint-disable-next-line max-len
    if (btn.x + btn.width > trtl.x && btn.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height) {
      setBtnText(btnText.open);
      delta += 0.1;
      buttons[i].spriteRef.width = buttons[i].spriteRef.width + Math.sin(delta) * 1;
      buttons[i].spriteRef.height = buttons[i].spriteRef.height + Math.sin(delta) * 1;
      if (tapButton) {
        touchInfoBtn(buttons[i].content);
        showInfopage = true;
        tapButton = false;
        setBtnText(btnText.close);
        return;
      }
      return;
    }
    setBtnText(btnText.nothing);
  }
}

// Animate Function which animates the Sprites on Canvas
// ______________________________________________________________________________________________

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let gamma = 0;

function animate() {
  turtleAnimatedSprite.position.set(viewport.center.x, viewport.center.y);
  if (viewport.position.y > -970) {
    animatedSheet = superturtleSheet;
  } else {
    animatedSheet = turtleSheet;
  }
  gamma += 0.1;
  for (const i in content) {
    if (content[i].animation === 'horizontal') {
      // eslint-disable-next-line max-len
      content[i].spriteRef.position.x = content[i].spriteRef.position.x + Math.cos(gamma) * getRandomArbitrary(0, 0.5);
    } else if (content[i].animation === 'vertical') {
      // eslint-disable-next-line max-len
      content[i].spriteRef.position.y = content[i].spriteRef.position.y + Math.cos(gamma) * getRandomArbitrary(0, 0.5);
    }
  }

  if (!showInfopage) {
    intersect();
  } else if (tapButton && showInfopage) {
    $('.infopage').remove();
    showInfopage = false;
    tapButton = false;
  }
}

// Handle Loader Complete: Create Textures and Sprites for canvas
// ______________________________________________________________________________________________

function handleLoadComplete() {
  document.getElementById('loading-screen').style.display = 'none';

  viewport
    .drag()
    .pinch()
    .decelerate()
    .clamp({ direction: 'all' });

  viewport.position.x = -4136;
  viewport.position.y = -1226;

  for (const i in background) {
    const resourcename = eval(`loader.resources.${background[i].name}.texture`);
    background[i].spriteRef = PIXI.Sprite.from(resourcename);
    background[i].spriteRef.position.set(background[i].x, background[i].y);
    background[i].spriteRef.anchor.set(0);
    background[i].spriteRef.name = background[i].name;
    viewport.addChild(background[i].spriteRef);
  }

  for (const i in coins) {
    const resourcename = eval(`loader.resources.${coins[i].name}.texture`);
    coins[i].spriteRef = PIXI.Sprite.from(resourcename);
    coins[i].spriteRef.position.set(coins[i].x, coins[i].y);
    coins[i].spriteRef.anchor.set(0.5);
    viewport.addChild(coins[i].spriteRef);
    coins[i].spriteRef.interactive = true;
    coins[i].spriteRef.buttonMode = true;
    coins[i].spriteRef.name = coins[i].name;
    coins[i].spriteRef.on('pointerdown', clickCoin);
  }

  for (const i in content) {
    const resourcename = eval(`loader.resources.${content[i].name}.texture`);
    content[i].spriteRef = PIXI.Sprite.from(resourcename);
    content[i].spriteRef.position.set(content[i].x, content[i].y);
    content[i].spriteRef.anchor.set(0.5);
    content[i].spriteRef.name = content[i].name;
    viewport.addChild(content[i].spriteRef);
  }

  for (const i in buttons) {
    const resourcename = eval(`loader.resources.${buttons[i].name}.texture`);
    buttons[i].spriteRef = PIXI.Sprite.from(resourcename);
    buttons[i].spriteRef.position.set(buttons[i].x, buttons[i].y);
    buttons[i].spriteRef.anchor.set(0.5);
    viewport.addChild(buttons[i].spriteRef);
    buttons[i].spriteRef.interactive = true;
    buttons[i].spriteRef.buttonMode = true;
    buttons[i].spriteRef.content = buttons[i].content;
    buttons[i].spriteRef.on('pointerdown', clickInfoBtn);
  }

  app.ticker.add(animate);

  // Create Textures for turtle animation
  const w = 420;
  const h = 300;

  function animatedTextureInit(texture) {
    return [
      new PIXI.Texture(texture, new PIXI.Rectangle(0 * w, 0, w, h)),
      new PIXI.Texture(texture, new PIXI.Rectangle(1 * w, 0, w, h)),
      new PIXI.Texture(texture, new PIXI.Rectangle(2 * w, 0, w, h)),
    ];
  }
  function textureInit(texture) {
    return [
      new PIXI.Texture(texture, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];
  }

  const textureTurtleDown = loader.resources.turtledown.texture;
  const textureTurtleDownLeft = loader.resources.turtledownleft.texture;
  const textureTurtleDownRight = loader.resources.turtledownright.texture;
  const textureTurtleUp = loader.resources.turtleup.texture;
  const textureTurtleUpRight = loader.resources.turtleupright.texture;
  const textureTurtleUpLeft = loader.resources.turtleupleft.texture;
  const textureTurtleRight = loader.resources.turtleright.texture;
  const textureTurtleLeft = loader.resources.turtleleft.texture;
  /* eslint-disable dot-notation, quotes */
  turtleSheet["standRightUp"] = textureInit(textureTurtleUpRight);
  turtleSheet["standLeftUp"] = textureInit(textureTurtleUpLeft);
  turtleSheet["standUp"] = textureInit(textureTurtleUp);
  turtleSheet["standDown"] = textureInit(textureTurtleDown);
  turtleSheet["standRight"] = textureInit(textureTurtleRight);
  turtleSheet["standLeft"] = textureInit(textureTurtleLeft);
  turtleSheet["standRightDown"] = textureInit(textureTurtleDownRight);
  turtleSheet["standLeftDown"] = textureInit(textureTurtleDownLeft);

  turtleSheet["swimRightUp"] = animatedTextureInit(textureTurtleUpRight);
  turtleSheet["swimLeftUp"] = animatedTextureInit(textureTurtleUpLeft);
  turtleSheet["swimUp"] = animatedTextureInit(textureTurtleUp);
  turtleSheet["swimDown"] = animatedTextureInit(textureTurtleDown);
  turtleSheet["swimRight"] = animatedTextureInit(textureTurtleRight);
  turtleSheet["swimLeft"] = animatedTextureInit(textureTurtleLeft);
  turtleSheet["swimRightDown"] = animatedTextureInit(textureTurtleDownRight);
  turtleSheet["swimLeftDown"] = animatedTextureInit(textureTurtleDownLeft);
  /* eslint-enable dot-notation, quotes */
  const textureSuperturtleDown = loader.resources.superturtledown.texture;
  const textureSuperturtleDownLeft = loader.resources.superturtledownleft.texture;
  const textureSuperturtleDownRight = loader.resources.superturtledownright.texture;
  const textureSuperturtleUp = loader.resources.superturtleup.texture;
  const textureSuperturtleUpRight = loader.resources.superturtleupright.texture;
  const textureSuperturtleUpLeft = loader.resources.superturtleupleft.texture;
  const textureSuperturtleRight = loader.resources.superturtleright.texture;
  const textureSuperturtleLeft = loader.resources.superturtleleft.texture;
  /* eslint-disable dot-notation, quotes */
  superturtleSheet["standRightUp"] = textureInit(textureSuperturtleUpRight);
  superturtleSheet["standLeftUp"] = textureInit(textureSuperturtleUpLeft);
  superturtleSheet["standUp"] = textureInit(textureSuperturtleUp);
  superturtleSheet["standDown"] = textureInit(textureSuperturtleDown);
  superturtleSheet["standRight"] = textureInit(textureSuperturtleRight);
  superturtleSheet["standLeft"] = textureInit(textureSuperturtleLeft);
  superturtleSheet["standRightDown"] = textureInit(textureSuperturtleDownRight);
  superturtleSheet["standLeftDown"] = textureInit(textureSuperturtleDownLeft);

  superturtleSheet["swimRightUp"] = animatedTextureInit(textureSuperturtleUpRight);
  superturtleSheet["swimLeftUp"] = animatedTextureInit(textureSuperturtleUpLeft);
  superturtleSheet["swimUp"] = animatedTextureInit(textureSuperturtleUp);
  superturtleSheet["swimDown"] = animatedTextureInit(textureSuperturtleDown);
  superturtleSheet["swimRight"] = animatedTextureInit(textureSuperturtleRight);
  superturtleSheet["swimLeft"] = animatedTextureInit(textureSuperturtleLeft);
  superturtleSheet["swimRightDown"] = animatedTextureInit(textureSuperturtleDownRight);
  superturtleSheet["swimLeftDown"] = animatedTextureInit(textureSuperturtleDownLeft);
  /* eslint-enable dot-notation, quotes */
  // set sheet for turtle animation
  animatedSheet = turtleSheet;

  turtleAnimatedSprite = new PIXI.AnimatedSprite(animatedSheet.standUp);
  turtleAnimatedSprite.anchor.set(0.5);
  turtleAnimatedSprite.animationSpeed = 0.01;
  turtleAnimatedSprite.loop = false;
  turtleAnimatedSprite.visible = false;
  // eslint-disable-next-line no-unused-expressions
  turtleAnimatedSprite.interactive;
  turtleAnimatedSprite.position.set(viewport.center.x, viewport.center.y);
  viewport.addChild(turtleAnimatedSprite);
  turtleAnimatedSprite.play();
}

loader.onComplete.add(handleLoadComplete);
loader.onLoad.add(handleLoadAsset);
loader.onError.add(handleLoadError);
loader.onProgress.add(handleLoadProgress);
loader.load();

// MoveViewport Functions, moves the Viewport and animates the turtle
// ______________________________________________________________________________________________

function calcAngleDegrees(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

window.moveViewport = function (directions) {
  if (document.getElementById('infopages').querySelector('.infopage')) {
    window.scrollTo(window.scrollX, window.scrollY + directions.y / 10);
  } else {
    viewport.position.x = viewport.position.x - (directions.x / 10);
    viewport.position.y = viewport.position.y - (directions.y / 10);

    // calculate degrees to display correct sprite
    const angle = calcAngleDegrees(directions.x, directions.y);
    // calculate correct Animation speed based on drag on the joystick
    // eslint-disable-next-line max-len
    turtleAnimatedSprite.animationSpeed = (Math.sqrt((Math.abs(directions.x) ** 2) + Math.abs(directions.y) ** 2)) / 400;

    /* eslint-disable max-len, brace-style */
    if (!turtleAnimatedSprite.playing) {
      if (angle < 110 && angle > 70) { turtleAnimatedSprite.textures = animatedSheet.swimDown; }
      else if (angle > -110 && angle < -70) { turtleAnimatedSprite.textures = animatedSheet.swimUp; }
      else if (angle < -160 || angle > 160) { turtleAnimatedSprite.textures = animatedSheet.swimLeft; }
      else if (angle > -20 && angle < 20) { turtleAnimatedSprite.textures = animatedSheet.swimRight; }
      else if (angle > -70 && angle < -20) { turtleAnimatedSprite.textures = animatedSheet.swimRightUp; }
      else if (angle > -160 && angle < -110) { turtleAnimatedSprite.textures = animatedSheet.swimLeftUp; }
      else if (angle < 70 && angle > 20) { turtleAnimatedSprite.textures = animatedSheet.swimRightDown; }
      else if (angle < 160 && angle > 110) { turtleAnimatedSprite.textures = animatedSheet.swimLeftDown; }
      turtleAnimatedSprite.play();
    }
    /* eslint-disable max-len, brace-style */
  }
};

// Add/delete turtle when socket is connected/disconnected
// ______________________________________________________________________________________________

window.addTurtle = function () {
  turtleAnimatedSprite.visible = true;
};

window.removeTurtle = function () {
  turtleAnimatedSprite.visible = false;
};

// Pixi Particles, Create an Emitter for the Bubbles
// ______________________________________________________________________________________________

const emitterConfiguration = require('./emitter-configuration.json');

const emitter = new Emitter(
  // The PIXI.Container to put the emitter in
  viewport,
  // The collection of particle images to use
  ['assets/bubble-big.png', 'assets/bubble-small.png'],
  // Emitter configuration
  emitterConfiguration,
);

// Calculate the current time
let elapsed = Date.now();
// Update function every frame
let update = function () {
  // Update the next frame
  requestAnimationFrame(update);
  const now = Date.now();
  // The emitter requires the elapsed
  // number of seconds since the last update
  emitter.update((now - elapsed) * 0.001);
  elapsed = now;
};
// Start emitting
emitter.emit = true;
// Start the update
update();
