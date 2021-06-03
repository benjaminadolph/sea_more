"use strict";

var seamore = seamore || {};

seamore.infopage = (function ($) {

	function init() {
        var $activeSection = $('.infopage .section.active').next();
        var $nextActiveSection = $activeSection.next();

        /*$(document).on('scroll', function () {
            $('html, body').animate({
                scrollTop: $nextActiveSection.offset().top
            }, 800, function(){
                $nextActiveSection.addClass('active');
                $activeSection.removeClass('active');
            });
        });*/
	}

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.infopage.init();
});