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

/* let _w = window.screen.width
let _h = window.screen.height */

console.log(window.innerWidth)

const app = new PIXI.Application({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    width: _w,
    height: _h,
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

let objects = [
    {name: "backgroundcrater", url: "assets/svgs/background-crater.svg", x: 3339, y: 5057, scale: 4}, 
    {name: "sewageisland", url: "assets/svgs/sewage-island.svg", x:5815, y:1482, scale: 4}, 
    {name: "sewage", url: "assets/svgs/sewage.svg", x:5665, y:1932, scale: 4}, 
    {name: "buttonsewage", url: "assets/svgs/marker.svg", x:5815, y:1482, scale: 1, button: true, content: "sewage"},
    {name: "submarine", url: "assets/svgs/submarine.svg", x:4917, y:6020, scale: 4}, 
    {name: "submarinerocks", url: "assets/svgs/submarine-rocks.svg", x:4148, y:6790, scale: 4}, 
    {name: "buttonsubmarine", url: "assets/svgs/marker.svg", x:4917, y:6020, scale: 1, button: true, content: "submarine"},
    {name: "island1", url: "assets/svgs/island1.svg", x:7137, y:1631, scale: 4}, 
    {name: "garbagecarpet", url: "assets/svgs/garbage-carpet.svg", x:3568, y:1672, scale: 4}, 
    {name: "buttongarbagecarpet", url: "assets/svgs/marker.svg", x:3568, y:1672,  scale: 1, button: true, content: "garbagecarpet"},
    {name: "boat", url: "assets/svgs/boat.svg", x:1339, y:1209, scale: 4}, 
    {name: "fishnet", url: "assets/svgs/fish-net.svg", x:1837, y:2356, scale: 4}, 
    {name: "buttonboat", url: "assets/svgs/marker.svg", x:1339, y:1209, scale: 1, button: true, content: "boat"},
    {name: "deepseamining", url: "assets/svgs/deep-sea-mining.svg", x:1298, y:5053, scale: 4}, 
    {name: "buttondeepseamining", url: "assets/svgs/marker.svg", x:1298, y:5053, scale: 1, button: true, content: "deepseamining"},
    {name: "microplastic", url: "assets/svgs/microplastic.svg", x:5116, y:3934, scale: 4},
    {name: "buttonmicroplastic", url: "assets/svgs/marker.svg", x:5116, y:3934, scale: 1, button: true, content: "microplastic"},
]

let loader = PIXI.Loader.shared

console.log(loader.add("bg", "assets/background.png"))

for(let i = 0; i < objects.length; i++) {
    loader.add(objects[i].name, objects[i].url, { 
        metadata: {
            resourceOptions: {
                scale: objects[i].scale
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

    for(let i = 0; i < objects.length; i++) {
        let resourcename = eval("loader.resources." + objects[i].name + ".texture")

        objects[i].spriteRef = PIXI.Sprite.from(resourcename)
        objects[i].spriteRef.position.set(objects[i].x, objects[i].y)
        objects[i].spriteRef.anchor.set(0.5); 
        viewport.addChild(objects[i].spriteRef);

        if(objects[i].button == true){
            objects[i].spriteRef.interactive = true
            objects[i].spriteRef.buttonMode = true
            objects[i].spriteRef.on('pointerdown', onClick)
        }
    }

    app.ticker.add(animate)

    /*********
     * PIXIJS WITH GSAP TEST
     ********/

    var gr = new PIXI.Graphics();  
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.drawCircle(30, 30, 30);
        gr.endFill();

    var texture = app.renderer.generateTexture(gr);
    var circle = new PIXI.Sprite(texture);

    viewport.addChild(circle);
    // Animating using GSAP
    gsap.to(circle, {
        x: 500, duration: 2, repeat: -1, yoyo: true,
    });

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

function onClick(event) {
    console.log(event)
    document.getElementById("information").style.display = "flex";
    document.getElementById("menu-icon").style.display = "none";
}

let delta = 0
function animate() {
    
    delta += 0.1
    // legt bewegungen fest
    objects[8].spriteRef.y = objects[8].spriteRef.position.y + Math.sin(delta) *0.1
    objects[8].spriteRef.x = objects[8].spriteRef.position.x + Math.sin(delta) *0.6
    objects[10].spriteRef.y = objects[10].spriteRef.position.y + Math.sin(delta) *0.1
    objects[10].spriteRef.x = objects[10].spriteRef.position.x + Math.sin(delta) *0.6
    objects[11].spriteRef.y = objects[11].spriteRef.position.y + Math.sin(delta) *0.1
    objects[11].spriteRef.x = objects[11].spriteRef.position.x + Math.sin(delta) *0.6
}


window.moveViewport = function(directions){
    viewport.position.x = viewport.position.x - (directions.x/10)
    viewport.position.y = viewport.position.y - (directions.y/10)
}
