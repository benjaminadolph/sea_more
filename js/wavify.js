import { gsap, Power1 } from "gsap";

/*
 *   Wavify
 *   JavaScript library to make some nice waves
 *   by peacepostman @ potion
 */
window.wavify = function(wave_element, options) {
    if ("undefined" === typeof options) options = {};
  
    //  Options
    //
    //
    var settings = Object.assign(
      {},
      {
        container: options.container ? options.container : "body",
        // Height of wave
        height: 200,
        // Amplitude of wave
        amplitude: 100,
        // Animation speed
        speed: 0.15,
        // Total number of articulation in wave
        bones: 3,
        // Color
        color: "currentColor"
      },
      options
    );
  
    var wave = wave_element,
      width = document.querySelector(settings.container).getBoundingClientRect()
        .width,
      height = document.querySelector(settings.container).getBoundingClientRect()
        .height,
      points = [],
      lastUpdate,
      totalTime = 0,
      animationInstance = false,
      gsapInstance = false;
  
    //  Allow new settings, avoid setting new container for logic purpose please :)
    //
    function rebuilSettings(params) {
      settings = Object.assign({}, settings, params);
    }
  
    function drawPoints(factor) {
      var points = [];
  
      for (var i = 0; i <= settings.bones; i++) {
        var x = (i / settings.bones) * width;
        var sinSeed =
          (factor + (i + (i % settings.bones))) * settings.speed * 100;
        var sinHeight = Math.sin(sinSeed / 100) * settings.amplitude;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + settings.height;
        points.push({ x: x, y: yPos });
      }
  
      return points;
    }
  
    function drawPath(points) {
      var SVGString = "M " + points[0].x + " " + points[0].y;
  
      var cp0 = {
        x: (points[1].x - points[0].x) / 2,
        y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
      };
  
      SVGString +=
        " C " +
        cp0.x +
        " " +
        cp0.y +
        " " +
        cp0.x +
        " " +
        cp0.y +
        " " +
        points[1].x +
        " " +
        points[1].y;
  
      var prevCp = cp0;
      var inverted = -1;
  
      for (var i = 1; i < points.length - 1; i++) {
        var cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
        var cp1 = {
          x: points[i].x - prevCp.x + points[i].x,
          y: points[i].y - prevCp.y + points[i].y
        };
  
        SVGString +=
          " C " +
          cp1.x +
          " " +
          cp1.y +
          " " +
          cp1.x +
          " " +
          cp1.y +
          " " +
          points[i + 1].x +
          " " +
          points[i + 1].y;
        prevCp = cp1;
        inverted = -inverted;
      }
  
      SVGString += " L " + width + " " + height;
      SVGString += " L 0 " + height + " Z";
      return SVGString;
    }
  
    //  Draw function
    //
    //
    function draw() {
      var now = window.Date.now();
  
      if (lastUpdate) {
        var elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;
  
        totalTime += elapsed;
  
        var factor = totalTime * Math.PI;
        gsapInstance = gsap.to(wave, {
          attr: {
            d: drawPath(drawPoints(factor))
          },
          duration: settings.speed,
          ease: 'power1.inOut'
        });
      } else {
        lastUpdate = now;
      }
  
      animationInstance = requestAnimationFrame(draw);
    }
  
    //  Pure js debounce function to optimize resize method
    //
    //
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    }
  
    //  Redraw for resize with debounce
    //
    var redraw = debounce(function() {
      pause();
      points = [];
      totalTime = 0;
      width = document.querySelector(settings.container).getBoundingClientRect()
        .width;
      height = document.querySelector(settings.container).getBoundingClientRect()
        .height;
      lastUpdate = false;
      play();
    }, 250);
  
    function boot() {
      if (!animationInstance) {
        gsapInstance = gsap.set(wave, { attr: { fill: settings.color } });
        play();
        window.addEventListener("resize", redraw);
      }
    }
  
    function reboot(options) {
      kill();
      if (typeof options !== undefined) {
        rebuilSettings(options);
      }
      gsapInstance = gsap.set(wave, { attr: { fill: settings.color } });
      play();
      window.addEventListener("resize", redraw);
    }
  
    function play() {
      if (!animationInstance) {
        animationInstance = requestAnimationFrame(draw);
      }
    }
  
    function pause() {
      if (animationInstance) {
        cancelAnimationFrame(animationInstance);
        animationInstance = false;
      }
    }
  
    function updateColor(options) {
      if (typeof options.timing === undefined) {
        options.timing = 1;
      }
      if (typeof options.color === undefined) {
        options.color = settings.color;
      }
      gsapInstance = gsap.to(wave, {
        attr: { fill: options.color },
        duration: parseInt(options.timing),
        onComplete: function() {
          if (
            typeof options.onComplete !== undefined &&
            {}.toString.call(options.onComplete) === "[object Function]"
          ) {
            options.onComplete();
          }
        }
      });
    }
  
    function kill() {
      if (animationInstance) {
        pause();
        gsapInstance.kill();
        gsapInstance = gsap.set(wave, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 0,
          clearProps: "all",
          attr: {
            d: "M0,0",
            fill: ""
          }
        });
        window.removeEventListener("resize", redraw);
        animationInstance = false;
      }
    }
  
    //  Boot Wavify
    //
    boot();
  
    return {
      reboot: reboot,
      play: play,
      pause: pause,
      kill: kill,
      updateColor: updateColor
    };
  }