"use strict";

var seamore = seamore || {};

seamore.infopage = (function ($) {

	function init() {
        parallaxEffect($(".background-elements .top"), 0.5);
        // parallaxEffect($(".background-elements .middle"), 0.75);

        $('.infopage .close-icon').on('click', function() {
            $('.infopage').remove();
        }); 
	}

    function parallaxEffect($object, multiplier) {
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;

        $(window).on("load scroll", function() {
            var parallaxElement = $object;
           /* window.requestAnimationFrame(function() {
                var windowTop = $(document).scrollTop();
                var elementTop = parallaxElement.position().top;
                var elementHeight = parallaxElement.height();
                var viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5;
                var scrolled = (windowTop - elementTop + viewPortHeight) + elementTop;
                parallaxElement.css({
                    transform: "translate3d(0," + scrolled * multiplier + "px, 0)"
                });
            });*/

            var top = $('.background-elements .top').position().top * 0.5;
            gsap.to('.background-elements .top', {duration: 1, y: top});
        });
    };

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.infopage.init();
});