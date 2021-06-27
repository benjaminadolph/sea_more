import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Emitter } from 'pixi-particles'

// Import Data from data.js
import { content, buttons, coins, turtle, superturtle, background } from './data'

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);
//Nur für Devtools in Chrome notwendig
window.PIXI = PIXI

// Variables
// ______________________________________________________________________________________________
const canvas = document.getElementById('mycanvas')
let _w = window.innerWidth
let _h = window.innerHeight
let turtle_animatedSprite;
let cointerCounter = 0;
const turtleSheet = {};
const superturtleSheet = {};
let animatedSheet = {};

window.tapButton = false;
window.showInfopage = false;

const app = new PIXI.Application({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    width: 8090,
    height: 8191,
    resizeTo: window,
    autoResize: true,
})

const viewport = app.stage.addChild(new Viewport({ 
    width: _w,
    height: _h,
    worldWidth: 8090,
    worldHeight: 8191,
    interaction: app.renderer.plugins.interaction,
}))

let loader = PIXI.Loader.shared

for(let i = 0; i < background.length; i++) {
    loader.add(background[i].name, background[i].url);
}

for(let i = 0; i < content.length; i++) {
    loader.add(content[i].name, content[i].url, { 
        metadata: {
            resourceOptions: {
                scale: content[i].scale
            }
        }
    });
}

for(let i = 0; i < buttons.length; i++) {
    loader.add(buttons[i].name, buttons[i].url, { 
        metadata: {
            resourceOptions: {
                scale: buttons[i].scale
            }
        }
    });
}

for(let i = 0; i < coins.length; i++) {
    loader.add(coins[i].name, coins[i].url, { 
        metadata: {
            resourceOptions: {
                scale: coins[i].scale
            }
        }
    });
}

for(let i = 0; i < turtle.length; i++) {
    loader.add(turtle[i].name, turtle[i].url);
}

for(let i = 0; i < superturtle.length; i++) {
    loader.add(superturtle[i].name, superturtle[i].url);
}

loader.onComplete.add(handleLoadComplete)
loader.onLoad.add(handleLoadAsset)
loader.onError.add(handleLoadError)
loader.onProgress.add(handleLoadProgress)
loader.load()

function handleLoadComplete(){
    
    document.getElementById("loading-screen").style.display = "none";
    
    viewport
        .drag()
        .pinch()
        .decelerate()
        .clamp({ direction: 'all' })

    viewport.position.x = -4136
    viewport.position.y = -1226

    for(let i in background) {
        let resourcename = eval("loader.resources." + background[i].name + ".texture")
        background[i].spriteRef = PIXI.Sprite.from(resourcename)
        background[i].spriteRef.position.set(background[i].x, background[i].y)
        background[i].spriteRef.anchor.set(0); 
        background[i].spriteRef.name = background[i].name; 
        viewport.addChild(background[i].spriteRef);
    }

    for(let i in coins) {
        let resourcename = eval("loader.resources." + coins[i].name + ".texture")
        coins[i].spriteRef = PIXI.Sprite.from(resourcename)
        coins[i].spriteRef.position.set(coins[i].x, coins[i].y)
        coins[i].spriteRef.anchor.set(0.5); 
        viewport.addChild(coins[i].spriteRef);
        coins[i].spriteRef.interactive = true
        coins[i].spriteRef.buttonMode = true
        coins[i].spriteRef.name = coins[i].name
        coins[i].spriteRef.on('pointerdown', clickCoin)
    }

    for(let i in content) {
        let resourcename = eval("loader.resources." + content[i].name + ".texture")
        content[i].spriteRef = PIXI.Sprite.from(resourcename)
        content[i].spriteRef.position.set(content[i].x, content[i].y)
        content[i].spriteRef.anchor.set(0.5); 
        content[i].spriteRef.name = content[i].name; 
        viewport.addChild(content[i].spriteRef);
    }

    for(let i in buttons) {
        let resourcename = eval("loader.resources." + buttons[i].name + ".texture")
        buttons[i].spriteRef = PIXI.Sprite.from(resourcename)
        buttons[i].spriteRef.position.set(buttons[i].x, buttons[i].y)
        buttons[i].spriteRef.anchor.set(0.5); 
        viewport.addChild(buttons[i].spriteRef);
        buttons[i].spriteRef.interactive = true
        buttons[i].spriteRef.buttonMode = true
        buttons[i].spriteRef.content = buttons[i].content
        buttons[i].spriteRef.on('pointerdown', clickInfoBtn)
    }

    app.ticker.add(animate)

    let w = 420;
    let h = 300;

    function animatedTextureInit(texture){
        return [
            new PIXI.Texture(texture, new PIXI.Rectangle(0 * w, 0, w, h)),
            new PIXI.Texture(texture, new PIXI.Rectangle(1 * w, 0, w, h)),
            new PIXI.Texture(texture, new PIXI.Rectangle(2 * w, 0, w, h))
        ]
    }
    function textureInit(texture){
        return [
            new PIXI.Texture(texture, new PIXI.Rectangle(1 * w, 0, w, h)),
        ]
    }

    // ANIMATION TURTLE
    const texture_turtledown = loader.resources.turtledown.texture;
    const texture_turtledownleft = loader.resources.turtledownleft.texture;
    const texture_turtledownright = loader.resources.turtledownright.texture;
    const texture_turtleup = loader.resources.turtleup.texture;
    const texture_turtleupright = loader.resources.turtleupright.texture;
    const texture_turtleupleft = loader.resources.turtleupleft.texture;
    const texture_turtleright = loader.resources.turtleright.texture;
    const texture_turtleleft = loader.resources.turtleleft.texture;

    turtleSheet["standRightUp"] = textureInit(texture_turtleupright)
    turtleSheet["standLeftUp"] = textureInit(texture_turtleupleft)
    turtleSheet["standUp"] = textureInit(texture_turtleup)
    turtleSheet["standDown"] = textureInit(texture_turtledown)
    turtleSheet["standRight"] = textureInit(texture_turtleright)
    turtleSheet["standLeft"] = textureInit(texture_turtleleft)
    turtleSheet["standRightDown"] = textureInit(texture_turtledownright)
    turtleSheet["standLeftDown"] = textureInit(texture_turtledownleft)

    turtleSheet["swimRightUp"] = animatedTextureInit(texture_turtleupright)
    turtleSheet["swimLeftUp"] = animatedTextureInit(texture_turtleupleft)
    turtleSheet["swimUp"] = animatedTextureInit(texture_turtleup)
    turtleSheet["swimDown"] = animatedTextureInit(texture_turtledown)
    turtleSheet["swimRight"] = animatedTextureInit(texture_turtleright)
    turtleSheet["swimLeft"] = animatedTextureInit(texture_turtleleft)
    turtleSheet["swimRightDown"] = animatedTextureInit(texture_turtledownright)
    turtleSheet["swimLeftDown"] = animatedTextureInit(texture_turtledownleft)

    const texture_superturtledown = loader.resources.superturtledown.texture;
    const texture_superturtledownleft = loader.resources.superturtledownleft.texture;
    const texture_superturtledownright = loader.resources.superturtledownright.texture;
    const texture_superturtleup = loader.resources.superturtleup.texture;
    const texture_superturtleupright = loader.resources.superturtleupright.texture;
    const texture_superturtleupleft = loader.resources.superturtleupleft.texture;
    const texture_superturtleright = loader.resources.superturtleright.texture;
    const texture_superturtleleft = loader.resources.superturtleleft.texture;

    superturtleSheet["standRightUp"] = textureInit(texture_superturtleupright)
    superturtleSheet["standLeftUp"] = textureInit(texture_superturtleupleft)
    superturtleSheet["standUp"] = textureInit(texture_superturtleup)
    superturtleSheet["standDown"] = textureInit(texture_superturtledown)
    superturtleSheet["standRight"] = textureInit(texture_superturtleright)
    superturtleSheet["standLeft"] = textureInit(texture_superturtleleft)
    superturtleSheet["standRightDown"] = textureInit(texture_superturtledownright)
    superturtleSheet["standLeftDown"] = textureInit(texture_superturtledownleft)

    superturtleSheet["swimRightUp"] = animatedTextureInit(texture_superturtleupright)
    superturtleSheet["swimLeftUp"] = animatedTextureInit(texture_superturtleupleft)
    superturtleSheet["swimUp"] = animatedTextureInit(texture_superturtleup)
    superturtleSheet["swimDown"] = animatedTextureInit(texture_superturtledown)
    superturtleSheet["swimRight"] = animatedTextureInit(texture_superturtleright)
    superturtleSheet["swimLeft"] = animatedTextureInit(texture_superturtleleft)
    superturtleSheet["swimRightDown"] = animatedTextureInit(texture_superturtledownright)
    superturtleSheet["swimLeftDown"] = animatedTextureInit(texture_superturtledownleft)


    console.log(turtleSheet)
    //set Startsheet
    animatedSheet = turtleSheet;    

    turtle_animatedSprite = new PIXI.AnimatedSprite(animatedSheet.standUp)
    turtle_animatedSprite.anchor.set(0.5)
    turtle_animatedSprite.animationSpeed =0.01;
    turtle_animatedSprite.loop = false;
    turtle_animatedSprite.visible = false;
    turtle_animatedSprite.interactive;
    turtle_animatedSprite.position.set(viewport.center.x, viewport.center.y)
    viewport.addChild(turtle_animatedSprite)
    turtle_animatedSprite.play();

}

const btnText = {
    nothing: 0,
    close: 1,
    open: 2,
    collect: 3
};

let currentButtonText;

function setBtnText(changeBtnText){
    if(changeBtnText != currentButtonText){
        switch(changeBtnText) {
            case btnText.nothing:
                changeText("")
              break;
            case btnText.close:
                changeText("Schließen")
              break;
            case btnText.open:
                changeText("Öffnen")
            break;
            case btnText.collect:
                changeText("Einsammeln")
            break;
            default: 
                console.log("Fehler")

        }
        currentButtonText = changeBtnText;
    }
}

let delta = 0;

function intersect() {
    for(let i in coins) {
        var coin = coins[i].spriteRef.getBounds();
        var trtl = turtle_animatedSprite.getBounds();
        if(coin.x + coin.width > trtl.x && coin.x < trtl.x + trtl.width && coin.y + coin.height > trtl.y && coin.y < trtl.y + trtl.height){
            setBtnText(btnText.collect);
            delta += 0.1
            coins[i].spriteRef.width = coins[i].spriteRef.width + Math.sin(delta) *1
            coins[i].spriteRef.height = coins[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchCoin(coins[i])
                tapButton = false;
                return;
            }
            return
        }
    } 
    for(let i in buttons) {
        var btn = buttons[i].spriteRef.getBounds();
        var trtl = turtle_animatedSprite.getBounds();
        if(btn.x + btn.width > trtl.x && btn.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height){
            setBtnText(btnText.open);
            delta += 0.1
            buttons[i].spriteRef.width = buttons[i].spriteRef.width + Math.sin(delta) *1
            buttons[i].spriteRef.height = buttons[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchInfoBtn(buttons[i].content)
                showInfopage = true;
                tapButton = false;
                setBtnText(btnText.close);
                return;
            }
            return
        } else {
            setBtnText(btnText.nothing);
        }
    } 
}

function touchInfoBtn(content) {
    console.log(content)
    const $result = $('#infopages'); 
    $result.load(`/${content}`);
}

function clickInfoBtn() {
    console.log(this.content)
    const $result = $('#infopages'); 
    $result.load(`/${this.content}`);
}

function touchCoin(coin) {
    console.log(coin.spriteRef.name)
    viewport.removeChild(coin.spriteRef)

    if(cointerCounter < 4){
        cointerCounter++;
        document.getElementById("counter").innerHTML = cointerCounter + "/5";
    } else {
        cointerCounter++;
        document.getElementById("counter").innerHTML = cointerCounter + "/5";
        document.getElementById("all-coins-collected").style.display = "flex";
    }
}

function clickCoin() {
    console.log(this.name)
    viewport.removeChild(this)
    if(cointerCounter < 4){
        cointerCounter++;
        document.getElementById("counter").innerHTML = cointerCounter + "/5";
    } else {
        cointerCounter++;
        document.getElementById("counter").innerHTML = cointerCounter + "/5";
        document.getElementById("all-coins-collected").style.display = "flex";
    }
}

let gamma = 0

function animate() {
    turtle_animatedSprite.position.set(viewport.center.x, viewport.center.y)
    if(viewport.position.y > -970){
        animatedSheet = superturtleSheet;
    } else {
        animatedSheet = turtleSheet;
    }
    gamma += 0.1
    for(let i in content){
        if(content[i].animation == "horizontal"){
            content[i].spriteRef.position.x = content[i].spriteRef.position.x + Math.cos(gamma) * getRandomArbitrary(0, 0.5)
        } else if (content[i].animation == "vertical") {
            content[i].spriteRef.position.y = content[i].spriteRef.position.y + Math.cos(gamma) * getRandomArbitrary(0, 0.5)
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }

    if(!showInfopage){
        /* intersectInfoBtn()
        intersectCoin() */
        intersect()
    }else if (tapButton && showInfopage){
        $('.infopage').remove();
        showInfopage = false;
        tapButton = false;
    }
}

window.moveViewport = function(directions){
    if (document.getElementById("infopages").querySelector(".infopage")) {
        window.scrollTo(window.scrollX, window.scrollY + directions.y/10);
    } else {
        viewport.position.x = viewport.position.x - (directions.x/10)
        viewport.position.y = viewport.position.y - (directions.y/10)

        //calculate degrees to display correct sprite
        let angle = calcAngleDegrees(directions.x, directions.y);
        console.log(angle)
        //calculate correct Animation speed based on drag on the joystick
        turtle_animatedSprite.animationSpeed = Math.sqrt(Math.pow(Math.abs(directions.x),2) + Math.pow(Math.abs(directions.y),2))/400;

        if (!turtle_animatedSprite.playing) {
            if      (angle <  110 && angle >  70) { turtle_animatedSprite.textures = animatedSheet.swimDown; }
            else if (angle > -110 && angle < -70) { turtle_animatedSprite.textures = animatedSheet.swimUp; }
            else if (angle < -160 || angle > 160) { turtle_animatedSprite.textures = animatedSheet.swimLeft; }
            else if (angle > -20 && angle < 20) { turtle_animatedSprite.textures = animatedSheet.swimRight; }
            else if (angle > -70 && angle < -20) { turtle_animatedSprite.textures = animatedSheet.swimRightUp; }
            else if (angle > -160 && angle < -110) { turtle_animatedSprite.textures = animatedSheet.swimLeftUp; }
            else if (angle < 70 && angle > 20) { turtle_animatedSprite.textures = animatedSheet.swimRightDown; }
            else if (angle < 160 && angle > 110) { turtle_animatedSprite.textures = animatedSheet.swimLeftDown; }
            turtle_animatedSprite.play();
        }
    }
} 

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

window.addTurtle = function() {
    turtle_animatedSprite.visible = true;
}

window.removeTurtle = function() {
    turtle_animatedSprite.visible = false;
}

function handleLoadError(){
    console.error("error loading")
}

function handleLoadAsset(){
    console.log("asset loaded")
}

function handleLoadProgress(loader, resource){
    document.getElementById("loader-percentage").innerHTML = Math.round(loader.progress) + "% loaded";
    console.log(Math.round(loader.progress) + "% loaded", resource.name)
}

// Create a new emitter
var emitter = new Emitter(
	// The PIXI.Container to put the emitter in
	viewport,
	// The collection of particle images to use
	['assets/bubble-big.png', 'assets/bubble-small.png'],
	// Emitter configuration
	{
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.25,
            "end": 0.35,
            "minimumScaleMultiplier": 0.5
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 200,
            "end": 200,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 260,
            "max": 280
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 50
        },
        "lifetime": {
            "min": 3.5,
            "max": 4
        },
        "blendMode": "normal",
        "frequency": 0.016,
        "emitterLifetime": -1,
        "maxParticles": 80,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        "spawnRect": {
            "x": -0,
            "y": 2500,
            "w": 8090,
            "h": 6627
        }
    }
);

// Calculate the current time
var elapsed = Date.now();
// Update function every frame
var update = function(){
	// Update the next frame
	requestAnimationFrame(update);
	var now = Date.now();
	// The emitter requires the elapsed
	// number of seconds since the last update
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
};
// Start emitting
emitter.emit = true;
// Start the update
update();