import { gsap } from 'gsap';
import { Power4, Power2 } from 'gsap';

window.menu = (function ($) {
  function init() {
    setCharsToSpan();

    $('.menu-button.menu-icon').on('click', function () {
      openNavigation();
    });

    $('.menu-button.close-icon').on('click', function () {
      closeNavigation();
    });

    // create wave animation on hover
    var $charElement = $('.char');
    $charElement.on('mouseenter', function () {
      waveTextAnimation($(this));
    });

    $charElement.on('mouseleave', function () {
      groundWaveAnimation();
    });
  }

  function setCharsToSpan() {
    var $menuElements = $('#nav').find('.menu-item');

    // set chars to span to create wave animation
    $menuElements.each(function () {
      var textNode = $(this).html();
      $(this).empty();
      for (var i = 0; i < textNode.length; i++) {
        $(this).append('<span class="char">' + textNode.charAt(i) + '</span>');
      }
    });
  }

  function openNavigation() {
    gsap.to('#nav', { y: 0, ease: Power4.easeInOut, duration: 2 });

    gsap.to('#wave-path', {
      duration: 3,
      attr: { d: `${$('#wave-path').data('to')}` },
    });

    gsap.to('.shell-content', { x: 0, opacity: 1, delay: 1.2 });
    gsap.to('.footer-links', { opacity: 1, delay: 1.2 });
  }

  function closeNavigation() {
    // gsap.to('.shell-content', { x: 200 });
    gsap.to('#wave-path', {
      duration: 2,
      attr: { d: `${$('#wave-path').data('from')}` },
      delay: 0.3,
    });
    gsap.to('#nav', {
      y: '-100vh',
      ease: Power4.easeInOut,
      duration: 3,
      delay: 0.3,
    });
    gsap.to('.shell-content', { x: 200, opacity: 0 });
    gsap.to('.footer-links', { opacity: 0 });
  }

  function waveTextAnimation($element) {
    var startPercent = -40;
    $element.parents('ul').addClass('hover');
    $element.parents('a').addClass('active');
    var $prevElement = $element;
    var $nextElement = $element;

    gsap.to($element, { yPercent: startPercent });

    for (var i = 0; i <= 7; i += 1) {
      startPercent += 5;
      $prevElement = $prevElement.prev();
      $nextElement = $nextElement.next();
      if ($prevElement.length) {
        gsap.to($prevElement, { yPercent: startPercent });
      }
      if ($nextElement.length) {
        gsap.to($nextElement, { yPercent: startPercent });
      }
    }
  }

  function groundWaveAnimation() {
    $('#nav ul').removeClass('hover');
    $('#nav ul a').removeClass('active');
    gsap.to('.char', { yPercent: 0, ease: Power2.easeOut });
  }

  return {
    init: init,
    closeNavigation: closeNavigation,
  };
})(jQuery);

jQuery(function ($) {
  menu.init();
});
