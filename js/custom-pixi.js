import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

const canvas = document.getElementById('mycanvas')
let _w = window.innerWidth
let _h = window.innerHeight

const app = new PIXI.Application({
    view: canvas,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    resizeTo: window,
    autoResize: true,
    backgroundColor: 0xffffff
})

const viewport = app.stage.addChild(new Viewport({ 
    width: _w,
    height: _h,
    worldWidth: _w*2,
    worldHeight: _h*4,
    interaction: app.renderer.plugins.interaction,
}))
 
let loader = PIXI.Loader.shared

loader.onComplete.add(handleLoadComplete)
loader.onLoad.add(handleLoadAsset)
loader.onError.add(handleLoadError)
loader.onProgress.add(handleLoadProgress)

// fish is the alias for the path
//loader.add("fish", "assets/SVGs/Fische/GrosserFisch.svg")
loader.add("bg", "assets/background.png")
/* loader.add("boat", "assets/boat.png")
loader.add("submarine", "assets/submarine.png")
loader.add("whale", "assets/whale.png") */
loader.load()

function handleLoadComplete(){
    
    viewport
        .drag()
        .pinch()
        .decelerate()
        /* .bounce({sides:'top-bottom-right-left'}) */
        .clamp({ direction: 'all' })
        .mouseEdges({radius: 250, speed: 15})
       

    let bg_texture = loader.resources.bg.texture
    const bg_sprite = new PIXI.Sprite(bg_texture)
    bg_sprite.width = _w*2
    bg_sprite.height = _h*4
    viewport.addChild(bg_sprite)
    
   /* let fish_texture = loader.resources.fish.texture
    const fish_sprite = new PIXI.Sprite(fish_texture)
    fish_sprite.position.set(viewport.worldWidth / 2, viewport.worldHeight  / 2)
    fish_sprite.height = 500
    fish_sprite.width = 1000
    viewport.addChild(fish_sprite) */

    /* let boat_texture = loader.resources.boat.texture
    const boat_sprite = new PIXI.Sprite(boat_texture)
    boat_sprite.position.set(viewport.worldWidth / 3, viewport.worldHeight  / 10)
    boat_sprite.height = 300
    boat_sprite.width = 300
    viewport.addChild(boat_sprite)
    // Sprite klickbar machen
    boat_sprite.interactive = true
    boat_sprite.buttonMode = true

    // Pointers normalize touch and mouse
    boat_sprite.on('pointerdown', (event) => onClick(boat_sprite));

    let whale_texture = loader.resources.whale.texture
    const whale_sprite = new PIXI.Sprite(whale_texture)
    whale_sprite.position.set(viewport.worldWidth / 1.5, viewport.worldHeight  / 1.6)
    whale_sprite.height = 300
    whale_sprite.width = 300
    // Sprite klickbar machen
    whale_sprite.interactive = true
    whale_sprite.buttonMode = true

    // Pointers normalize touch and mouse
    whale_sprite.on('pointerdown', (event) => onClick(whale_sprite));

    viewport.addChild(whale_sprite)

    let submarine_texture = loader.resources.submarine.texture
    const submarine_sprite = new PIXI.Sprite(submarine_texture)
    submarine_sprite.position.set(viewport.worldWidth / 3, viewport.worldHeight  / 1.2)
    submarine_sprite.height = 200
    submarine_sprite.width = 200
    viewport.addChild(submarine_sprite) */

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
        document.getElementById("mySidebar").style.display = "none";
    } 
    else{
        document.getElementById("mySidebar").style.display = "block";
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

    boat_sprite.y = boat_sprite.position.y + Math.cos(delta) *0.3

    fish_sprite.y = fish_sprite.position.y + Math.sin(delta) *0.2
    fish_sprite.x = fish_sprite.position.x + Math.cos(delta) *1 */
    
}