import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

window.infopage = (function ($) {

	function init() {
        
        $('.infopage .close-icon').on('click', function() {
            $('.infopage').remove();
        }); 

        if ($(window).width() > 850){
            parallax();
        }

        moveBottomWave();
    
        resizeBottomLineSvg();
        setMiddleAfter();

        $( window ).resize(function() {
            resizeBottomLineSvg();

            if ($('.middle').height() < $(window).height() + 30 && $('.after-element').length) {
                $('.middle .after-element').height(($(window).height() - $('.middle').height()) + ($(window).height() * 0.5));
            }
        });
	}

    function setMiddleAfter() {
        setTimeout(function() {
            if ($('.middle').height() < $(window).height() + 30 && $('.after-element').length) {
                $('.middle .after-element').height(($(window).height() - $('.middle').height()) + ($(window).height() * 0.5));
            }
        }, 1000);
    }

    function resizeBottomLineSvg() {
        var $svg = $('#bottom-info-line');
        $svg.attr({
            width: $(window).width(),
            height: (769 / 1442) * $(window).width()
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


