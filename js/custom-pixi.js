import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

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
    {name: "backgroundcrater", url: "assets/svgs/background-crater.svg", x: 3339, y: 5057}, 
    {name: "sewageisland", url: "assets/svgs/sewage-island.svg", x:5815, y:1482}, 
    {name: "sewage", url: "assets/svgs/sewage.svg", x:5665, y:1932}, 
    {name: "submarine", url: "assets/svgs/submarine.svg", x:4917, y:6020}, 
    {name: "submarinerocks", url: "assets/svgs/submarine-rocks.svg", x:4148, y:6790}, 
    {name: "island1", url: "assets/svgs/island1.svg", x:7137, y:1631}, 
    {name: "garbagecarpet", url: "assets/svgs/garbage-carpet.svg", x:3568, y:1672}, 
    {name: "boat", url: "assets/svgs/boat.svg", x:1339, y:1209}, 
    {name: "fishnet", url: "assets/svgs/fish-net.svg", x:1837, y:2356}, 
    {name: "deepseamining", url: "assets/svgs/deep-sea-mining.svg", x:1298, y:5053}, 
    {name: "microplastic", url: "assets/svgs/microplastic.svg", x:5116, y:3934}
]

let loader = PIXI.Loader.shared

console.log(loader.add("bg", "assets/background.png"))

for(let i = 0; i < objects.length; i++) {
    loader.add(objects[i].name, objects[i].url, { 
        metadata: {
            resourceOptions: {
                scale: 4
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
        objects[i].spriteRef.interactive = true
        objects[i].spriteRef.buttonMode = true
    }
    objects[7].spriteRef.on('pointerdown', onClick)
    objects[8].spriteRef.on('pointerdown', onClick)

    app.ticker.add(animate)

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

function onClick() {
    console.log("test")
    document.getElementById("information").style.display = "flex";
    document.getElementById("menu-icon").style.display = "none";
}

let delta = 0
function animate() {
    
    delta += 0.1
    // legt bewegungen fest
    objects[7].spriteRef.y = objects[7].spriteRef.position.y + Math.sin(delta) *0.1
    objects[7].spriteRef.x = objects[7].spriteRef.position.x + Math.sin(delta) *0.6
    objects[8].spriteRef.y = objects[8].spriteRef.position.y + Math.sin(delta) *0.1
    objects[8].spriteRef.x = objects[8].spriteRef.position.x + Math.sin(delta) *0.6
/* 
    submarine_sprite.y = submarine_sprite.position.y + Math.sin(delta) *0.2

    boat_sprite.y = boat_sprite.position.y + Math.cos(delta) *0.3 */

   /*  fish_sprite.y = fish_sprite.position.y + Math.sin(delta) *0.2
    fish_sprite.x = fish_sprite.position.x + Math.cos(delta) *1 */
}

window.goLeft = function(){
    viewport.position.x = viewport.position.x + 10
}

window.goRight = function(){
    viewport.position.x = viewport.position.x - 10
}

window.goTop = function(){
    viewport.position.y = viewport.position.y - 10
}

window.goBottom = function(){
    viewport.position.y = viewport.position.y + 10
}