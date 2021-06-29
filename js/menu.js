import { gsap, Power4, Power2 } from 'gsap';

window.menu = (function ($) {
  function setCharsToSpan() {
    const $menuElements = $('#nav').find('.menu-item');

    // set chars to span to create wave animation
    $menuElements.each(function () {
      const textNode = $(this).html();
      $(this).empty();
      /* for (let i = 0; i < textNode.length; i++) { */
      for (let i in textNode) {
        $(this).append(`<span class="char">${textNode.charAt(i)}</span>`);
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
    let startPercent = -40;
    $element.parents('ul').addClass('hover');
    $element.parents('a').addClass('active');
    let $prevElement = $element;
    let $nextElement = $element;

    gsap.to($element, { yPercent: startPercent });

    for (let i = 0; i <= 7; i += 1) {
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

  function init() {
    setCharsToSpan();

    $('.menu-button.menu-icon').on('click', () => {
      openNavigation();
    });

    $('.menu-button.close-icon').on('click', () => {
      closeNavigation();
    });

    // create wave animation on hover
    const $charElement = $('.char');
    $charElement.on('mouseenter', function () {
      waveTextAnimation($(this));
    });

    $charElement.on('mouseleave', () => {
      groundWaveAnimation();
    });
    // set wave width and height (to work in chrome)
    function resizeMenuWave() {
      const $wave = $('.svg-wave');
      const $waveHeight = (3067 / 2623) * $(window).width();
      $wave.attr({
        width: $(window).width(),
        height: $waveHeight,
      });
    }

    resizeMenuWave();

    $(window).resize(() => {
      resizeMenuWave();
    });
  }

  return {
    init,
    closeNavigation,
  };
}(jQuery));

// eslint-disable-next-line no-unused-vars
jQuery(($) => {
  menu.init();
});
