import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
//Nur für Devtools in Chrome notwendig
window.PIXI = PIXI


const canvas = document.getElementById('mycanvas')
let _w = window.innerWidth
let _h = window.innerHeight

const app = new PIXI.Application({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    resizeTo: window,
    autoResize: true,
    // backgroundColor: 0xffffff
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

loader.add("bg", "assets/background.png")

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
        /* .bounce({sides:'top-bottom-right-left'}) */
        .clamp({ direction: 'all' })
        .mouseEdges({radius: 350, speed: 30})


    const bg_texture = loader.resources.bg.texture
    const bg_sprite = new PIXI.Sprite(bg_texture)
    bg_sprite.width = viewport.screenWorldWidth
    bg_sprite.height = viewport.screenWorldHeight
    viewport.addChild(bg_sprite)

    for(let i = 0; i < objects.length; i++) {
        const resourcename = eval("loader.resources." + objects[i].name + ".texture")
        const spritename = objects[i].name + "_sprite"

        spritename = PIXI.Sprite.from(resourcename)
        spritename.position.set(objects[i].x, objects[i].y)
        spritename.anchor.set(0.5); 
        viewport.addChild(spritename);
        spritename.interactive = true
        spritename.buttonMode = true
    }

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

function onClick(object) {
    console.log(object)
    if(object.tint === 0xff0000) {
        object.tint = 0xffffff
        // HIER KANN DAS MENU GEÖFFNET WERDEN
    } 
    else{
        // HIER KANN DAS MENU GESCHLOSSEN WERDEN
        object.tint = 0xff0000
    } 
}

let delta = 0
function animate() {
    
    delta += 0.1
    // legt bewegungen fest
    /* whale_sprite.y = whale_sprite.position.y + Math.sin(delta) *0.2
    whale_sprite.x = whale_sprite.position.x + Math.sin(delta) *1

    submarine_sprite.y = submarine_sprite.position.y + Math.sin(delta) *0.2

    boat_sprite.y = boat_sprite.position.y + Math.cos(delta) *0.3 */

   /*  fish_sprite.y = fish_sprite.position.y + Math.sin(delta) *0.2
    fish_sprite.x = fish_sprite.position.x + Math.cos(delta) *1 */
    
}
