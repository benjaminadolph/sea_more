"use strict";

var seamore = seamore || {};

seamore.infopage = (function ($) {

	function init() {
        parallaxEffect($(".background-elements .top"), 0.5);
        parallaxEffect($(".background-elements .middle"), 0.75);

        console.log($('.infopage .close-icon'));

        $('.infopage .close-icon').on('click', function() {
            console.log('hehehe');
            $('.infopage').remove();
        }); 
	}

    function parallaxEffect($object, multiplier) {
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;
        var $doc = $(document);
        var scrollTop = $object.position().top;
        $(window).scroll(function(){
            var from_top = $doc.scrollTop();
            var bg_css = scrollTop + (multiplier * from_top) + 'px';
            $object.css({"top" : bg_css });
        });
    }

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.infopage.init();
});