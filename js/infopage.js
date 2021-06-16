import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.infopage = (function ($) {

	function init() {
        // init clicks
        $('.infopage .close-icon').on('click', function() {
            $('.infopage').remove();
        }); 

        if ($(window).width() > 850){
            parallax();
        }

        moveBottomWave();
    
        setBottomInfoSvg();
        // set timeout, so image is loaded
        setTimeout(setMiddleAfter, 1000);

        $( window ).resize(function() {
            setBottomInfoSvg();
            setMiddleAfter();
        });
	}

    function setMiddleAfter() {
        if ($('.middle').height() < $(window).height() + 30 && $('.after-element').length) {
            $('.middle .after-element').height(($(window).height() - $('.middle').height()) + ($(window).height() * 0.5));
        }
    }

    function setBottomInfoSvg() {
        var $svg = $('#bottom-info-line');

        if ($(window).width() > 860) {
            $svg.removeAttr('viewBox');
            $svg.each(function () { $(this)[0].setAttribute('viewBox', '0 0 1442 769') });
            $svg.attr({
                width: $(window).width(),
                height: (769 / 1442) * $(window).width()
            });

            $('#Button-first').attr({
                transform: "translate(280.000000, 181.000000)"
            });

            $('#Button-second').attr({
                transform: "translate(515.000000, 340.000000)"
            });

            $('#Button-third').attr({
                transform: "translate(988.000000, 426.000000)"
            });

            $('#Button-fourth').attr({
                transform: "translate(868.000000, 663.000000)"
            });

        } else {
            $svg.removeAttr('viewBox');
            $svg.each(function () { $(this)[0].setAttribute('viewBox', '0 0 855 1219') });
            $svg.attr({
                width: $(window).width(),
                height: (1219 / 855) * $(window).width(),
            });

            $('#Button-first').attr({
                transform: "translate(260.000000, 498.000000)"
            });

            $('#Button-second').attr({
                transform: "translate(30.000000, 631.000000)"
            });

            $('#Button-third').attr({
                transform: "translate(440.000000, 779.000000)"
            });

            $('#Button-fourth').attr({
                transform: "translate(110.000000, 934.000000)"
            });


        }
        
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


