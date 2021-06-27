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

const content = [
    {name: "sewageisland", url: "assets/SVGs/sewage-island.svg", x:5806, y:1462, scale: 4}, 
    {name: "sewage1", url: "assets/SVGs/animation/sewage-1.svg", x:5665, y:1932, scale: 4},
    {name: "sewage2", animation: "horizontal", url: "assets/SVGs/animation/sewage-2.svg", x:5666, y:1932, scale: 4}, 
    {name: "sewage3", animation: "horizontal", url: "assets/SVGs/animation/sewage-3.svg", x:5666, y:1932, scale: 4}, 
    {name: "submarine", url: "assets/SVGs/submarine.svg", x:4917, y:6020, scale: 4}, 
    {name: "submarinerocks", url: "assets/SVGs/submarine-rocks.svg", x:4148, y:6790, scale: 4},
    {name: "garbagecarpet1", animation: "horizontal", url: "assets/SVGs/animation/garbage-carpet-1.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet2", animation: "horizontal", url: "assets/SVGs/animation/garbage-carpet-2.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet3", animation: "horizontal", url: "assets/SVGs/animation/garbage-carpet-3.svg", x:3568, y:1742, scale: 4},
    {name: "garbagecarpet4", animation: "vertical", url: "assets/SVGs/animation/garbage-carpet-4.svg", x:3568, y:1742, scale: 4},
    {name: "boat", url: "assets/SVGs/boat.svg", x:1339, y:1209, scale: 4}, 
    {name: "fishnet1", url: "assets/SVGs/animation/fish-net-1.svg", x:1792, y:2185, scale: 4}, 
    {name: "fishnet2", animation: "horizontal", url: "assets/SVGs/animation/fish-net-2.svg", x:1792, y:2185, scale: 4}, 
    {name: "fishnet3", animation: "vertical", url: "assets/SVGs/animation/fish-net-3.svg", x:1792, y:2185, scale: 4}, 
    {name: "fishnet4", animation: "horizontal", url: "assets/SVGs/animation/fish-net-4.svg", x:1792, y:2185, scale: 4}, 
    {name: "deepseamining", url: "assets/SVGs/deep-sea-mining.svg", x:1298, y:5053, scale: 4}, 
    {name: "microplastic", url: "assets/SVGs/microplastic.svg", x:5116, y:3934, scale: 4},
    {name: "whale", animation: "vertical", url: "assets/SVGs/animation/whale.svg", x: 6868, y: 5168, scale: 4},
    {name: "starfish", url: "assets/SVGs/starfish.svg", x: 4654, y: 5996, scale: 4},
    {name: "jellyfish1", animation: "vertical", url: "assets/SVGs/animation/jellyfish-1.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish2", animation: "vertical",url: "assets/SVGs/animation/jellyfish-2.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish3", animation: "vertical", url: "assets/SVGs/animation/jellyfish-3.svg", x: 3683, y: 3592, scale: 4},
    {name: "jellyfish4", animation: "horizontal", url: "assets/SVGs/animation/jellyfish-4.svg", x: 3683, y: 3592, scale: 4},
    {name: "humanunderwater1", animation: "vertical", url: "assets/SVGs/animation/human-under-water-1.svg", x: 2326, y: 4876, scale: 4},
    {name: "humanunderwater2", animation: "horizontal", url: "assets/SVGs/animation/human-under-water-2.svg", x: 2326, y: 4876, scale: 4},
    {name: "humanunderwater3", animation: "vertical", url: "assets/SVGs/animation/human-under-water-3.svg", x: 2326, y: 4876, scale: 4},
    {name: "humanonisland", url: "assets/SVGs/human-on-island.svg", x: 5346, y: 1339, scale: 4},
    {name: "humanonboat", url: "assets/SVGs/human-on-boat.svg", x: 1144, y: 1216, scale: 4},
]

const buttons = [
    {name: "buttonsewage", url: "assets/SVGs/marker.svg", x:5815, y:1482, scale: 4, content: "sewage"},
    {name: "buttonsubmarine", url: "assets/SVGs/marker.svg", x:4917, y:6020, scale: 4, content: "shipwrecks"},
    {name: "buttongarbagecarpet", url: "assets/SVGs/marker.svg", x:3568, y:1672,  scale: 4, content: "fishernets"},
    {name: "buttonboat", url: "assets/SVGs/marker.svg", x:1339, y:1209, scale: 4, content: "overfishing"},
    {name: "buttondeepseamining", url: "assets/SVGs/marker.svg", x:1928, y:5363, scale: 4, content: "deep-sea-mining"},
    {name: "buttonmicroplastic", url: "assets/SVGs/marker.svg", x:5116, y:3934, scale: 4, content: "microplastic"},
]

const coins = [
    {name: "coin1", url: "assets/SVGs/coin.svg", x:5407, y:6340, scale: 2, content: "submarine"},
    {name: "coin2", url: "assets/SVGs/coin.svg", x:1733, y:1287, scale: 2, content: "boat"},
    {name: "coin3", url: "assets/SVGs/coin.svg", x:2138, y:5913, scale: 2, content: "deepseamining"},
    {name: "coin4", url: "assets/SVGs/coin.svg", x:6166, y:1198, scale: 2, content: "sewageisland"},
    {name: "coin5", url: "assets/SVGs/coin.svg", x:2418, y:3069, scale: 2, content: "fishnet"},
]

const turtle = [
    {name: "turtledown", url: "assets/turtle/turtle-down.png"},
    {name: "turtledownright", url: "assets/turtle/turtle-down-right.png"},
    {name: "turtledownleft", url: "assets/turtle/turtle-down-left.png"},
    {name: "turtleup", url: "assets/turtle/turtle-up.png"},
    {name: "turtleupright", url: "assets/turtle/turtle-up-right.png"},
    {name: "turtleupleft", url: "assets/turtle/turtle-up-left.png"},
    {name: "turtleright", url: "assets/turtle/turtle-right.png"},
    {name: "turtleleft", url: "assets/turtle/turtle-left.png"},
]

const superturtle = [
    {name: "superturtledown", url: "assets/turtle/superturtle-down.png"},
    {name: "superturtledownright", url: "assets/turtle/superturtle-down-right.png"},
    {name: "superturtledownleft", url: "assets/turtle/superturtle-down-left.png"},
    {name: "superturtleup", url: "assets/turtle/superturtle-up.png"},
    {name: "superturtleupright", url: "assets/turtle/superturtle-up-right.png"},
    {name: "superturtleupleft", url: "assets/turtle/superturtle-up-left.png"},
    {name: "superturtleright", url: "assets/turtle/superturtle-right.png"},
    {name: "superturtleleft", url: "assets/turtle/superturtle-left.png"},
]

let loader = PIXI.Loader.shared

loader.add("bg1", "assets/background_performance1.jpg")
loader.add("bg2", "assets/background_performance2.jpg")
loader.add("bg3", "assets/background_performance3.jpg")
loader.add("bg4", "assets/background_performance4.jpg")

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
    
    const bg1_texture = loader.resources.bg1.texture
    const bg1_sprite = PIXI.Sprite.from(bg1_texture)
    bg1_sprite.anchor.set(0);
    bg1_sprite.position.set(0, 0)
    viewport.addChild(bg1_sprite)

    const bg2_texture = loader.resources.bg2.texture
    const bg2_sprite = PIXI.Sprite.from(bg2_texture)
    bg2_sprite.anchor.set(0);
    bg2_sprite.position.set(4045, 0)
    viewport.addChild(bg2_sprite)

    const bg3_texture = loader.resources.bg3.texture
    const bg3_sprite = PIXI.Sprite.from(bg3_texture)
    bg3_sprite.anchor.set(0);
    bg3_sprite.position.set(4045, 4063.5)

    viewport.addChild(bg3_sprite)
    const bg4_texture = loader.resources.bg4.texture
    const bg4_sprite = PIXI.Sprite.from(bg4_texture)
    bg4_sprite.anchor.set(0);
    bg4_sprite.position.set(0, 4063.5)
    viewport.addChild(bg4_sprite)

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
    let w = 420;
    let h = 300;

    const texture_turtledown = loader.resources.turtledown.texture;
    const texture_turtledownleft = loader.resources.turtledownleft.texture;
    const texture_turtledownright = loader.resources.turtledownright.texture;
    const texture_turtleup = loader.resources.turtleup.texture;
    const texture_turtleupright = loader.resources.turtleupright.texture;
    const texture_turtleupleft = loader.resources.turtleupleft.texture;
    const texture_turtleright = loader.resources.turtleright.texture;
    const texture_turtleleft = loader.resources.turtleleft.texture;

    turtleSheet["standRightUp"] = [
        new PIXI.Texture(texture_turtleupright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standLeftUp"] = [
        new PIXI.Texture(texture_turtleupleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standUp"] = [
        new PIXI.Texture(texture_turtleup, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standDown"] = [
        new PIXI.Texture(texture_turtledown, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standRight"] = [
        new PIXI.Texture(texture_turtleright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standLeft"] = [
        new PIXI.Texture(texture_turtleleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standRightDown"] = [
        new PIXI.Texture(texture_turtledownright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    turtleSheet["standLeftDown"] = [
        new PIXI.Texture(texture_turtledownleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];

    turtleSheet["swimRightUp"] = [
        new PIXI.Texture(texture_turtleupright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleupright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleupright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimLeftUp"] = [
        new PIXI.Texture(texture_turtleupleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleupleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleupleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimUp"] = [
        new PIXI.Texture(texture_turtleup, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleup, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleup, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimDown"] = [
        new PIXI.Texture(texture_turtledown, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledown, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledown, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimRight"] = [
        new PIXI.Texture(texture_turtleright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimLeft"] = [
        new PIXI.Texture(texture_turtleleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtleleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimRightDown"] = [
        new PIXI.Texture(texture_turtledownright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledownright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledownright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    turtleSheet["swimLeftDown"] = [
        new PIXI.Texture(texture_turtledownleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledownleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_turtledownleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];

    const texture_superturtledown = loader.resources.superturtledown.texture;
    const texture_superturtledownleft = loader.resources.superturtledownleft.texture;
    const texture_superturtledownright = loader.resources.superturtledownright.texture;
    const texture_superturtleup = loader.resources.superturtleup.texture;
    const texture_superturtleupright = loader.resources.superturtleupright.texture;
    const texture_superturtleupleft = loader.resources.superturtleupleft.texture;
    const texture_superturtleright = loader.resources.superturtleright.texture;
    const texture_superturtleleft = loader.resources.superturtleleft.texture;

    superturtleSheet["standRightUp"] = [
        new PIXI.Texture(texture_superturtleupright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standLeftUp"] = [
        new PIXI.Texture(texture_superturtleupleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standUp"] = [
        new PIXI.Texture(texture_superturtleup, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standDown"] = [
        new PIXI.Texture(texture_superturtledown, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standRight"] = [
        new PIXI.Texture(texture_superturtleright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standLeft"] = [
        new PIXI.Texture(texture_superturtleleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standRightDown"] = [
        new PIXI.Texture(texture_superturtledownright, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
    superturtleSheet["standLeftDown"] = [
        new PIXI.Texture(texture_superturtledownleft, new PIXI.Rectangle(1 * w, 0, w, h))
    ];

    superturtleSheet["swimRightUp"] = [
        new PIXI.Texture(texture_superturtleupright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleupright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleupright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimLeftUp"] = [
        new PIXI.Texture(texture_superturtleupleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleupleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleupleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimUp"] = [
        new PIXI.Texture(texture_superturtleup, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleup, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleup, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimDown"] = [
        new PIXI.Texture(texture_superturtledown, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledown, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledown, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimRight"] = [
        new PIXI.Texture(texture_superturtleright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimLeft"] = [
        new PIXI.Texture(texture_superturtleleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtleleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimRightDown"] = [
        new PIXI.Texture(texture_superturtledownright, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledownright, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledownright, new PIXI.Rectangle(2 * w, 0, w, h))
    ];
    superturtleSheet["swimLeftDown"] = [
        new PIXI.Texture(texture_superturtledownleft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledownleft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(texture_superturtledownleft, new PIXI.Rectangle(2 * w, 0, w, h))
    ];

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

let delta = 0

function intersectInfoBtn() {
    for(let i = 0; i < buttons.length; i++) {
        var btn = buttons[i].spriteRef.getBounds();
        var trtl = turtle_animatedSprite.getBounds();
        if(btn.x + btn.width > trtl.x && btn.x < trtl.x + trtl.width && btn.y + btn.height > trtl.y && btn.y < trtl.y + trtl.height){
            changeText("Öffnen");
            delta += 0.1
            buttons[i].spriteRef.width = buttons[i].spriteRef.width + Math.sin(delta) *1
            buttons[i].spriteRef.height = buttons[i].spriteRef.height + Math.sin(delta) *1
            if(tapButton){
                touchInfoBtn(buttons[i].content)
                showInfopage = true;
                tapButton = false;
                changeText("Schließen");
                return true;
            }
        }
    } 
} 

function intersectCoin() {
    for(let i = 0; i < coins.length; i++) {
        var coin = coins[i].spriteRef.getBounds();
        var trtl = turtle_animatedSprite.getBounds();
        if(coin.x + coin.width > trtl.x && coin.x < trtl.x + trtl.width && coin.y + coin.height > trtl.y && coin.y < trtl.y + trtl.height){
            changeText("Einsammeln");
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
    turtle_animatedSprite.position.set(viewport.center.x, viewport.center.y)
    if(viewport.position.y > -970){
        animatedSheet = superturtleSheet;
    } else {
        animatedSheet = turtleSheet;
    }
    gamma += 0.1
    for(let i = 0; i < content.length; i++){
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
        turtle_animatedSprite.animationSpeed = Math.sqrt(Math.pow(Math.abs(directions.x),2) + Math.pow(Math.abs(directions.y),2))/400;

        if(angle < 110 && angle > 70){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimDown;
                turtle_animatedSprite.play();
            }
        } else if(angle > -110 && angle < -70){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimUp;
                turtle_animatedSprite.play();
            }
        } else if(angle < -160 || angle > 160){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimLeft;
                turtle_animatedSprite.play();
            }
        } else if(angle > -20 && angle < 20){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimRight;
                turtle_animatedSprite.play();
            }
        } else if(angle > -70 && angle < -20){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimRightUp;
                turtle_animatedSprite.play();
            }
        } else if(angle > -160 && angle < -110){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimLeftUp;
                turtle_animatedSprite.play();
            }
        } else if(angle < 70 && angle > 20){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimRightDown;
                turtle_animatedSprite.play();
            }
        } else if(angle < 160 && angle > 110){
            if (!turtle_animatedSprite.playing) {
                turtle_animatedSprite.textures = animatedSheet.swimLeftDown;
                turtle_animatedSprite.play();
            }
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