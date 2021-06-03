"use strict";

var seamore = seamore || {};

seamore.startIntro = (function ($) {

	function init() {
        $('.screen-one--button').on('click', function(e){
            e.preventDefault();
            $('.screen-one').hide();
            $('.screen-two').fadeIn();
        });

        $('.screen-two--button').on('click', function(e) {
            e.preventDefault();
            $('#start-intro').fadeOut();
        });

        $('.screen-two-highlight-qr--button').on('click', function(e) {
            e.preventDefault();
            $('#qrcode').addClass('pulsation');
        });
	}

	return {
		init: init
	}
})(jQuery);

jQuery(function ($) {
    seamore.startIntro.init();
});