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

let turtle_sprite;

window.tapButton = false;

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
    {name: "backgroundcrater", url: "assets/svgs/background-crater.svg", x: 3339, y: 5057, scale: 4}, 
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
    {name: "buttonsubmarine", url: "assets/svgs/marker.svg", x:4917, y:6020, scale: 1, content: "submarine"},
    {name: "buttongarbagecarpet", url: "assets/svgs/marker.svg", x:3568, y:1672,  scale: 1, content: "garbagecarpet"},
    {name: "buttonboat", url: "assets/svgs/marker.svg", x:1339, y:1209, scale: 1, content: "boat"},
    {name: "buttondeepseamining", url: "assets/svgs/marker.svg", x:1298, y:5053, scale: 1, content: "deepseamining"},
    {name: "buttonmicroplastic", url: "assets/svgs/marker.svg", x:5116, y:3934, scale: 1, content: "microplastic"},
]

let coins = [
    {name: "coinsubmarine", url: "assets/svgs/coin.svg", x:5077, y:6350, scale: 2, content: "coinsubmarine"},
    {name: "coinboat", url: "assets/svgs/coin.svg", x:1739, y:1279, scale: 2, content: "coinboat"},
    {name: "coindeepseamining", url: "assets/svgs/coin.svg", x:1838, y:5493, scale: 2, content: "coindeepseamining"},
]

let loader = PIXI.Loader.shared

loader.add("bg", "assets/background.png")
loader.add("turtle", "assets/svgs/turtle.svg", { 
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
        buttons[i].spriteRef.name = buttons[i].name
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
    
    const turtle_texture = loader.resources.turtle.texture
    turtle_sprite = PIXI.Sprite.from(turtle_texture)

    turtle_sprite.anchor.set(0.5); 
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    turtle_sprite.interactive;
    turtle_sprite.hitArea = new PIXI.Rectangle(0, 0, 200, 200);

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

function intersectInfoBtn() {
    if(window.tapButton){
        for(let i = 0; i < buttons.length; i++) {
            var btn = buttons[i].spriteRef.getBounds();
            var trtl = turtle_sprite.getBounds();
            if(btn.x + btn.width > trtl.x && trtl.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height){
                touchInfoBtn(buttons[i].name)
                tapButton = false;
                return true;
            }
        } 
    }
} 

function intersectCoin() {
    if(window.tapButton){
        for(let i = 0; i < coins.length; i++) {
            var coin = coins[i].spriteRef.getBounds();
            var trtl = turtle_sprite.getBounds();
            if(coin.x + coin.width > trtl.x && trtl.x < trtl.x + trtl.width && coin.y + coin.height > trtl.y && coin.y < trtl.y + trtl.height){
                touchCoin(coins[i].name)
                tapButton = false;
                return true;
            }
        } 
    }
} 

function handleLoadError(){
    console.error("error loading")
}

function handleLoadAsset(){
    console.log("asset loaded")
}

function handleLoadProgress(loader, resource){
    console.log(loader.progress + "% loaded", resource.name)
}


function touchInfoBtn(name) {
    console.log(name)
}

function touchCoin(name) {
    console.log(name)
}

function clickInfoBtn() {
    console.log(this.name)
}

function clickCoin() {
    console.log(this.name)
}

function animate() {
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    if(viewport.position.y > -970){
        turtle_sprite.tint = 0xFF0000;
    } else {
        turtle_sprite.tint = 0xFFFFFF;
    }
    intersectInfoBtn()
    intersectCoin()
}

window.moveViewport = function(directions){
    viewport.position.x = viewport.position.x - (directions.x/10)
    viewport.position.y = viewport.position.y - (directions.y/10)
} 
