import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

window.infopage = (function ($) {

	function init() {
        if ($(window).width() > 850){
            parallax();
        }
        
        $('.infopage .close-icon').on('click', function() {
            $('.infopage').remove();
        }); 

        moveBottomWave();
    
        resizeBottomLineSvg();
        $( window ).resize(function() {
            resizeBottomLineSvg();
        });

        gsap.from(".bottom-info-line", {
            duration:2,
            scrollTrigger: {
                trigger: ".wave",
            }, 
            motionPath: {
                path: "#bottom-line-path",
                align: "#bottom-line-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0.25,
            }
        });
	}

    function resizeBottomLineSvg() {
        var $svg = $('.bottom-info-line');
        $svg.attr({
            width: $(window).width()
        });
    }

    function parallax() {
        gsap.to(".top", {
            y: -200,
            duration:2,
            scrollTrigger: {
                trigger: ".background-elements",
                start:"top top",
                end:"+=100%",
                scrub: true
            }, 
        });

        gsap.to(".middle", {
            y: -100,
            duration:2,
            scrollTrigger: {
                trigger: ".background-elements",
                start:"top top",
                end:"+=100%",
                scrub: true
            }, 
        });
    }

    function moveBottomWave() {
        var waveBottom = wavify( document.querySelector('#bottom-wave-path'), {
            height: 60,
            bones: 5,
            amplitude: 40,
            speed: .25
        });
    }

	return {
		init: init
	}
})(jQuery);


