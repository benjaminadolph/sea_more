"use strict";

var seamore = seamore || {};

seamore.menu = (function ($) {

	function init() {
        $('.menu-button').on('click', function() {
            $('#nav').toggle("slide", {direction: "right" }, 1000);
        });

        $('#nav').find('ul li').on('mouseover', function() {
			var $el = $(this);
			console.log($el);
			$el.animate({
				transform: 'translate3d(0, -5px, 0)'
			  }, 1000);
		});
	}

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.menu.init();
});