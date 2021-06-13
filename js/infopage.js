import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.infopage = (function ($) {

	function init() {
        if ($(window).width() > 850){
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
        
        $('.infopage .close-icon').on('click', function() {
            $('.infopage').remove();
        }); 

        moveBottomWave();
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


