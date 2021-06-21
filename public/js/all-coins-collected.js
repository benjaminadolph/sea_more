"use strict";

var seamore = seamore || {};

seamore.allCoinsCollected = (function ($) {

	function init() {
        $('.screen-one--button').on('click', function(e){
            e.preventDefault();
            $('#all-coins-collected').fadeOut();
        });

        $('.download--button').on('click', function(e) {
            $('#all-coins-collected').fadeOut();
        });
	}

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.allCoinsCollected.init();
});