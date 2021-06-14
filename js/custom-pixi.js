import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";

// register the plugin
gsap.registerPlugin(PixiPlugin);
// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);
//Nur für Devtools in Chrome notwendig
window.PIXI = PIXI

const canvas = document.getElementById('mycanvas')
let _w = window.innerWidth
let _h = window.innerHeight

let turtle_sprite, turtle_texture;
let cointerCounter = 0;

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

let content = [
    {name: "sewageisland", url: "assets/svgs/sewage-island.svg", x:5815, y:1482, scale: 4}, 
    {name: "sewage", url: "assets/svgs/sewage.svg", x:5665, y:1932, scale: 4}, 
    {name: "submarine", url: "assets/svgs/submarine.svg", x:4917, y:6020, scale: 4}, 
    {name: "submarinerocks", url: "assets/svgs/submarine-rocks.svg", x:4148, y:6790, scale: 4}, 
    {name: "island1", url: "assets/svgs/island1.svg", x:7137, y:1631, scale: 4}, 
    {name: "garbagecarpet", url: "assets/svgs/garbage-carpet.svg", x:3568, y:1672, scale: 4}, 
    {name: "boat", url: "assets/svgs/boat.svg", x:1339, y:1209, scale: 4}, 
    {name: "fishnet", url: "assets/svgs/fish-net.svg", x:1837, y:2356, scale: 4}, 
    {name: "deepseamining", url: "assets/svgs/deep-sea-mining.svg", x:1298, y:5053, scale: 4}, 
    {name: "microplastic", url: "assets/svgs/microplastic.svg", x:5116, y:3934, scale: 4},
]

let buttons = [
    {name: "buttonsewage", url: "assets/svgs/marker.svg", x:5815, y:1482, scale: 1, content: "sewage"},
    {name: "buttonsubmarine", url: "assets/svgs/marker.svg", x:4917, y:6020, scale: 1, content: "shipwrecks"},
    {name: "buttongarbagecarpet", url: "assets/svgs/marker.svg", x:3568, y:1672,  scale: 1, content: "fishernets"},
    {name: "buttonboat", url: "assets/svgs/marker.svg", x:1339, y:1209, scale: 1, content: "overfishing"},
    {name: "buttondeepseamining", url: "assets/svgs/marker.svg", x:1298, y:5053, scale: 1, content: "deep-sea-mining"},
    {name: "buttonmicroplastic", url: "assets/svgs/marker.svg", x:5116, y:3934, scale: 1, content: "microplastic"},
]

let coins = [
    {name: "coin1", url: "assets/svgs/coin.svg", x:5077, y:6350, scale: 2, content: "submarine"},
    {name: "coin2", url: "assets/svgs/coin.svg", x:1739, y:1279, scale: 2, content: "boat"},
    {name: "coin3", url: "assets/svgs/coin.svg", x:1838, y:5493, scale: 2, content: "deepseamining"},
    {name: "coin4", url: "assets/svgs/coin.svg", x:3077, y:6350, scale: 2, content: "xy"},
    {name: "coin5", url: "assets/svgs/coin.svg", x:2739, y:1279, scale: 2, content: "xyz"},
]

let loader = PIXI.Loader.shared

loader.add("bg", "assets/background.jpg")
loader.add("turtle", "assets/svgs/turtle.svg", { 
    metadata: {
        resourceOptions: {
            scale: 4
        }
    }
});
loader.add("superturtle", "assets/svgs/superturtle.svg", { 
    metadata: {
        resourceOptions: {
            scale: 4
        }
    }
});

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

    viewport.position.x = -viewport.worldWidth/2
    viewport.position.y = -viewport.worldHeight/2

    const bg_texture = loader.resources.bg.texture
    const bg_sprite = PIXI.Sprite.from(bg_texture)
    bg_sprite.width = viewport.screenWorldWidth
    bg_sprite.height = viewport.screenWorldHeight
    viewport.addChild(bg_sprite)

    for(let i = 0; i < content.length; i++) {
        let resourcename = eval("loader.resources." + content[i].name + ".texture")
        content[i].spriteRef = PIXI.Sprite.from(resourcename)
        content[i].spriteRef.position.set(content[i].x, content[i].y)
        content[i].spriteRef.anchor.set(0.5); 
        viewport.addChild(content[i].spriteRef);
    }

    for(let i = 0; i < buttons.length; i++) {
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

    for(let i = 0; i < coins.length; i++) {
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
    
    turtle_texture = loader.resources.turtle.texture
    turtle_sprite = PIXI.Sprite.from(turtle_texture)
    turtle_sprite.visible = false;
    turtle_sprite.anchor.set(0.5); 
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    turtle_sprite.interactive;

    viewport.addChild(turtle_sprite)

    app.ticker.add(animate)

    /*********
     * PIXIJS WITH GSAP TEST
     ********/
// Animating using GSAP
    /*  gsap.to(circle, {
        x: 500, duration: 2, repeat: -1, yoyo: true,
    }); */
}

let delta = 0

function intersectInfoBtn() {
    for(let i = 0; i < buttons.length; i++) {
        var btn = buttons[i].spriteRef.getBounds();
        var trtl = turtle_sprite.getBounds();
        if(btn.x + btn.width > trtl.x && btn.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height){
            delta += 0.1
            buttons[i].spriteRef.width = buttons[i].spriteRef.width + Math.sin(delta) *1
            buttons[i].spriteRef.height = buttons[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchInfoBtn(buttons[i].content)
                showInfopage = true;
                tapButton = false;
                return true;
            }
        }
    } 
} 

function intersectCoin() {
    for(let i = 0; i < coins.length; i++) {
        var coin = coins[i].spriteRef.getBounds();
        var trtl = turtle_sprite.getBounds();
        if(coin.x + coin.width > trtl.x && coin.x < trtl.x + trtl.width && coin.y + coin.height > trtl.y && coin.y < trtl.y + trtl.height){
            delta += 0.1
            coins[i].spriteRef.width = coins[i].spriteRef.width + Math.sin(delta) *1
            coins[i].spriteRef.height = coins[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchCoin(coins[i])
                tapButton = false;
                return true;
            }
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

function animate() {
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    if(viewport.position.y > -970){
        turtle_sprite.texture = loader.resources.superturtle.texture;
    } else {
        turtle_sprite.texture = turtle_texture;
    }

    /* if(tapButton){
        intersectInfoBtn()
        intersectCoin()
    } */
    
    if(!showInfopage){
        intersectInfoBtn()
        intersectCoin()
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
    }
} 

window.addTurtle = function() {
    turtle_sprite.visible = true;
}

window.removeTurtle = function() {
    turtle_sprite.visible = false;
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