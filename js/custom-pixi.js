import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Emitter } from 'pixi-particles'
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
let cointerCounter = 0;
let turtleSheet = {};
let superTurtleSheet = {};
let animatedSheet = {};
let ssheet, superssheet;

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
    /* {name: "sewageisland", url: "assets/SVGs/sewage-island.svg", x:5815, y:1482, scale: 4}, */ 
    /* {name: "sewage", url: "assets/SVGs/sewage.svg", x:5665, y:1932, scale: 4},  */
    /* {name: "sewage1", url: "assets/SVGs/animation/sewage-1.svg", x:5665, y:1932, scale: 4}, */ 
    {name: "sewage2", url: "assets/SVGs/animation/sewage-2.svg", x:5707, y:1888, scale: 3.7}, 
    {name: "sewage3", url: "assets/SVGs/animation/sewage-3.svg", x:5707, y:1888, scale: 3.7}, 
    {name: "submarine", url: "assets/SVGs/submarine.svg", x:4917, y:6020, scale: 4}, 
    {name: "submarinerocks", url: "assets/SVGs/submarine-rocks.svg", x:4148, y:6790, scale: 4},
    /* {name: "island1", url: "assets/SVGs/island1.svg", x:7137, y:1631, scale: 4},  */
    /* {name: "garbagecarpet", url: "assets/SVGs/garbage-carpet.svg", x:3568, y:1762, scale: 4}, */
    {name: "garbagecarpet1", url: "assets/SVGs/animation/garbage-carpet-1.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet2", url: "assets/SVGs/animation/garbage-carpet-2.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet3", url: "assets/SVGs/animation/garbage-carpet-3.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet4", url: "assets/SVGs/animation/garbage-carpet-4.svg", x:3568, y:1742, scale: 4},
    /* {name: "boat", url: "assets/SVGs/boat.svg", x:1339, y:1209, scale: 4}, 
    {name: "fishnet", url: "assets/SVGs/fish-net.svg", x:1792, y:2185, scale: 4}, */ 
    /* {name: "fishnet1", url: "assets/SVGs/animation/fish-net-1.svg", x:1792, y:2185, scale: 4},  */
    {name: "fishnet2", url: "assets/SVGs/animation/fish-net-2.svg", x:1792, y:2185, scale: 4}, 
    {name: "fishnet3", url: "assets/SVGs/animation/fish-net-3.svg", x:1792, y:2185, scale: 4}, 
    {name: "fishnet4", url: "assets/SVGs/animation/fish-net-4.svg", x:1792, y:2185, scale: 4}, 
    {name: "deepseamining", url: "assets/SVGs/deep-sea-mining.svg", x:1298, y:5053, scale: 4}, 
    {name: "microplastic", url: "assets/SVGs/microplastic.svg", x:5116, y:3934, scale: 4},
    /* {name: "whale", url: "assets/SVGs/whale.svg", x: 6868, y: 5168, scale: 4}, */
    {name: "starfish", url: "assets/SVGs/starfish.svg", x: 4654, y: 5996, scale: 4},
    /* {name: "seaweed", url: "assets/SVGs/seaweed.svg", x: 3773, y: 5920, scale: 4}, */
    /* {name: "seaweed1", url: "assets/SVGs/animation/seaweed-1.svg", x: 3833, y: 5984, scale: 4},
    {name: "seaweed2", url: "assets/SVGs/animation/seaweed-2.svg", x: 3833, y: 5984, scale: 4},
    {name: "seaweed3", url: "assets/SVGs/animation/seaweed-3.svg", x: 3833, y: 5984, scale: 4}, */
    /* {name: "jellyfish", url: "assets/SVGs/jellyfish.svg", x: 3683, y: 3592, scale: 4}, */
    {name: "jellyfish1", url: "assets/SVGs/animation/jellyfish-1.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish2", url: "assets/SVGs/animation/jellyfish-2.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish3", url: "assets/SVGs/animation/jellyfish-3.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish4", url: "assets/SVGs/animation/jellyfish-4.svg", x: 3683, y: 3592, scale: 4},
    /* {name: "humanwateringcan", url: "assets/SVGs/human-wateringcan.svg", x: 6816, y: 1293, scale: 4},
    {name: "humanunderwater", url: "assets/SVGs/human-under-water.svg", x: 2326, y: 4876, scale: 4}, */
    {name: "humanunderwater1", url: "assets/SVGs/animation/human-under-water-1.svg", x: 2326, y: 4876, scale: 4},
    {name: "humanunderwater2", url: "assets/SVGs/animation/human-under-water-2.svg", x: 2326, y: 4876, scale: 4},
    {name: "humanunderwater3", url: "assets/SVGs/animation/human-under-water-3.svg", x: 2326, y: 4876, scale: 4},
    /* {name: "humanonisland", url: "assets/SVGs/human-on-island.svg", x: 5346, y: 1339, scale: 4},
    {name: "humanonboat", url: "assets/SVGs/human-on-boat.svg", x: 1144, y: 1216, scale: 4}, */
    /* {name: "anchor", url: "assets/SVGs/anchor.svg", x: 907, y: 6414, scale: 4},
    {name: "corals", url:" assets/SVGs/corals.svg", x: 4020, y: 6842, scale: 4}, */
    /* {name: "corals1", url:" assets/SVGs/animation/corals-1.svg", x: 4020, y: 6842, scale: 4},
    {name: "corals2", url:" assets/SVGs/animation/corals-2.svg", x: 4020, y: 6842, scale: 4},
    {name: "corals3", url:" assets/SVGs/animation/corals-3.svg", x: 4020, y: 6842, scale: 4},
    {name: "corals4", url:" assets/SVGs/animation/corals-4.svg", x: 4020, y: 6842, scale: 4},
    {name: "corals5", url:" assets/SVGs/animation/corals-5.svg", x: 4020, y: 6842, scale: 4}, */
]

let buttons = [
    {name: "buttonsewage", url: "assets/SVGs/marker.svg", x:5815, y:1482, scale: 4, content: "sewage"},
    {name: "buttonsubmarine", url: "assets/SVGs/marker.svg", x:4917, y:6020, scale: 4, content: "shipwrecks"},
    {name: "buttongarbagecarpet", url: "assets/SVGs/marker.svg", x:3568, y:1672,  scale: 4, content: "fishernets"},
    {name: "buttonboat", url: "assets/SVGs/marker.svg", x:1339, y:1209, scale: 4, content: "overfishing"},
    {name: "buttondeepseamining", url: "assets/SVGs/marker.svg", x:1928, y:5363, scale: 4, content: "deep-sea-mining"},
    {name: "buttonmicroplastic", url: "assets/SVGs/marker.svg", x:5116, y:3934, scale: 4, content: "microplastic"},
]

let coins = [
    {name: "coin1", url: "assets/SVGs/coin.svg", x:5077, y:6350, scale: 2, content: "submarine"},
    {name: "coin2", url: "assets/SVGs/coin.svg", x:1739, y:1279, scale: 2, content: "boat"},
    {name: "coin3", url: "assets/SVGs/coin.svg", x:2138, y:5913, scale: 2, content: "deepseamining"},
    {name: "coin4", url: "assets/SVGs/coin.svg", x:6180, y:1204, scale: 2, content: "sewageisland"},
    {name: "coin5", url: "assets/SVGs/coin.svg", x:2378, y:3009, scale: 2, content: "fishnet"},
]

let loader = PIXI.Loader.shared

loader.add("turtle", "assets/turtle-sprite.png")
loader.add("superturtle", "assets/superturtle-sprite.png")

loader.add("bg", "assets/background_performance.jpg")

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

    for(let i = 0; i < content.length; i++) {
        let resourcename = eval("loader.resources." + content[i].name + ".texture")
        content[i].spriteRef = PIXI.Sprite.from(resourcename)
        content[i].spriteRef.position.set(content[i].x, content[i].y)
        content[i].spriteRef.anchor.set(0.5); 
        content[i].spriteRef.name = content[i].name; 
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
    app.ticker.add(animate)

    /*********
     * PIXIJS WITH GSAP TEST
     ********/
    // Animating using GSAP
    /*  gsap.to(circle, {
        x: 500, duration: 2, repeat: -1, yoyo: true,
    }); */


    // ANIMATION TURTLE
    ssheet = loader.resources.turtle.texture;
    let w = 416;
    let h = 368;

    turtleSheet["standRightUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standLeftUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h))
    ];
    turtleSheet["standUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h))
    ];
    turtleSheet["standDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h))
    ];
    turtleSheet["standRight"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(13 * w, 0, w, h))
    ];
    turtleSheet["standLeft"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(16 * w, 0, w, h))
    ];
    turtleSheet["standRightDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(19 * w, 0, w, h))
    ];
    turtleSheet["standLeftDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(22 * w, 0, w, h))
    ];

    turtleSheet["swimRightUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimLeftUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h))
    ];
    turtleSheet["swimUp"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0, w, h))
    ];
    turtleSheet["swimDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h))
    ];
    turtleSheet["swimRight"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(12 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(13 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(14 * w, 0, w, h))
    ];
    turtleSheet["swimLeft"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(15 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(16 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(17 * w, 0, w, h))
    ];
    turtleSheet["swimRightDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(18 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(19 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(20 * w, 0, w, h))
    ];
    turtleSheet["swimLeftDown"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(21 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(22 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(23 * w, 0, w, h))
    ];

    // ANIMATION SUPERTURTLE
    superssheet = loader.resources.superturtle.texture;

    superTurtleSheet["standRightUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superTurtleSheet["standLeftUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(4 * w, 0, w, h))
    ];
    superTurtleSheet["standUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(7 * w, 0, w, h))
    ];
    superTurtleSheet["standDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(10 * w, 0, w, h))
    ];
    superTurtleSheet["standRight"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(13 * w, 0, w, h))
    ];
    superTurtleSheet["standLeft"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(16 * w, 0, w, h))
    ];
    superTurtleSheet["standRightDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(19 * w, 0, w, h))
    ];
    superTurtleSheet["standLeftDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(22 * w, 0, w, h))
    ];

    superTurtleSheet["swimRightUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superTurtleSheet["swimLeftUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(5 * w, 0, w, h))
    ];
    superTurtleSheet["swimUp"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(8 * w, 0, w, h))
    ];
    superTurtleSheet["swimDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(11 * w, 0, w, h))
    ];
    superTurtleSheet["swimRight"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(12 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(13 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(14 * w, 0, w, h))
    ];
    superTurtleSheet["swimLeft"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(15 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(16 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(17 * w, 0, w, h))
    ];
    superTurtleSheet["swimRightDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(18 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(19 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(20 * w, 0, w, h))
    ];
    superTurtleSheet["swimLeftDown"] = [
        new PIXI.Texture(superssheet, new PIXI.Rectangle(21 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(22 * w, 0, w, h)),
        new PIXI.Texture(superssheet, new PIXI.Rectangle(23 * w, 0, w, h))
    ];

    //set Startsheet
    animatedSheet = turtleSheet;    

    turtle_sprite = new PIXI.AnimatedSprite(animatedSheet.standUp)
    turtle_sprite.anchor.set(0.5)
    turtle_sprite.animationSpeed =0.01;
    turtle_sprite.loop = false;
    turtle_sprite.visible = false;
    turtle_sprite.interactive;
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    viewport.addChild(turtle_sprite)
    turtle_sprite.play();

}

let delta = 0

function intersectInfoBtn() {
    for(let i = 0; i < buttons.length; i++) {
        var btn = buttons[i].spriteRef.getBounds();
        var trtl = turtle_sprite.getBounds();
        if(btn.x + btn.width > trtl.x && btn.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height){
            changeText("Open");
            delta += 0.1
            buttons[i].spriteRef.width = buttons[i].spriteRef.width + Math.sin(delta) *1
            buttons[i].spriteRef.height = buttons[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchInfoBtn(buttons[i].content)
                showInfopage = true;
                tapButton = false;
                changeText("Close");
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
            changeText("Collect");
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

let gamma = 0

function animate() {
    turtle_sprite.position.set(viewport.center.x, viewport.center.y)
    if(viewport.position.y > -970){
        animatedSheet = superTurtleSheet;
    } else {
        animatedSheet = turtleSheet;
    }

    gamma += 0.1

    // Animation Sewage
   content[0].spriteRef.position.x = content[0].spriteRef.position.x + Math.cos(gamma) *0.2
   content[1].spriteRef.position.y = content[1].spriteRef.position.y + Math.cos(gamma) *0.2
   // Animation Garbagecarpet
   content[4].spriteRef.position.x = content[4].spriteRef.position.x + Math.cos(gamma) *0.1
   content[5].spriteRef.position.y = content[5].spriteRef.position.y + Math.cos(gamma) *0.1
   content[6].spriteRef.position.x = content[6].spriteRef.position.x + Math.sin(gamma) *0.2
   content[7].spriteRef.position.y = content[7].spriteRef.position.y + Math.sin(gamma) *0.1
   // Animation Fish-Net
   content[8].spriteRef.position.y = content[8].spriteRef.position.y + Math.cos(gamma) *0.3
   content[9].spriteRef.position.x = content[9].spriteRef.position.x + Math.sin(gamma) *0.2
   content[10].spriteRef.position.y = content[10].spriteRef.position.y + Math.sin(gamma) *0.4
   //Animation Jellyfish
   content[14].spriteRef.position.y = content[14].spriteRef.position.y + Math.cos(gamma) *0.3
   content[15].spriteRef.position.x = content[15].spriteRef.position.x + Math.sin(gamma) *0.2
   content[16].spriteRef.position.y = content[16].spriteRef.position.y + Math.sin(gamma) *0.4
   content[17].spriteRef.position.y = content[17].spriteRef.position.y + Math.sin(gamma) *0.4
   //Animation Human under Water
   content[18].spriteRef.position.y = content[18].spriteRef.position.y + Math.cos(gamma) *0.3
   content[19].spriteRef.position.x = content[19].spriteRef.position.x + Math.sin(gamma) *0.2
   content[20].spriteRef.position.y = content[20].spriteRef.position.y + Math.sin(gamma) *0.4

    if(!showInfopage){
        changeText("");
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

        //calculate degrees to display correct sprite
        let angle = calcAngleDegrees(directions.x, directions.y);
        console.log(angle)
        //calculate correct Animation speed based on drag on the joystick
        turtle_sprite.animationSpeed = Math.sqrt(Math.pow(Math.abs(directions.x),2) + Math.pow(Math.abs(directions.y),2))/400;

        if(angle < 110 && angle > 70){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimDown;
                turtle_sprite.play();
            }
        } else if(angle > -110 && angle < -70){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimUp;
                turtle_sprite.play();
            }
        } else if(angle < -160 || angle > 160){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimLeft;
                turtle_sprite.play();
            }
        } else if(angle > -20 && angle < 20){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimRight;
                turtle_sprite.play();
            }
        } else if(angle > -70 && angle < -20){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimRightUp;
                turtle_sprite.play();
            }
        } else if(angle > -160 && angle < -110){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimLeftUp;
                turtle_sprite.play();
            }
        } else if(angle < 70 && angle > 20){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimRightDown;
                turtle_sprite.play();
            }
        } else if(angle < 160 && angle > 110){
            if (!turtle_sprite.playing) {
                turtle_sprite.textures = animatedSheet.swimLeftDown;
                turtle_sprite.play();
            }
        }
    }
} 

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
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
	// Should re-render the PIXI Stage
	// renderer.render(stage);
};
// Start emitting
emitter.emit = true;
// Start the update
update();