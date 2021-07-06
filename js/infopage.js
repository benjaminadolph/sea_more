import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.infopage = (function ($) {
  // set privacy for youtube videos, to be only loaded when user accepts
  function setYoutubePrivacy() {
    $(document).ready(() => {
      if ($('.video_wrapper').length > 0) {
        $('.video_wrapper').each(function () {
          const wrapper = $(this);
          wrapper.find('.privacy-okay-btn').on('click', function () {
            const trigger = $(this).parent();
            trigger.fadeOut();
            trigger
              .siblings('.video_layer')
              .show()
              .children('iframe')
              .attr('src', `https://www.youtube-nocookie.com/embed/${trigger.attr('data-source')}?rel=0&controls=0&showinfo=0&autoplay=1`);
          });
        });
      }
    });
  }

  // for specfic pages we need to set background to middle element
  function setMiddleAfter() {
    const $middleElement = $('.middle');
    let timeout = null;
    if ($middleElement.height() < $(window).height() + 30 && $middleElement.height() > 100) {
      const height = ($(window).height() - $middleElement.height()) + ($(window).height() * 0.5);
      $middleElement.find('.after-element').height(height);
      $middleElement.find('.after-element').addClass('resized');
      clearTimeout(timeout);
    }

    if ($middleElement.find('.after-element').hasClass('resized') || !$middleElement.find('.after-element')) {
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(setMiddleAfter, 1000);
    }
  }

  // Bottom info is an svg, that needs to be set when viewport width changes
  function setBottomInfoSvg() {
    const $svg = $('#bottom-info-line');

    if ($(window).width() > 860) {
      $svg.removeAttr('viewBox');
      $svg.each(function () { $(this)[0].setAttribute('viewBox', '0 0 1920 1024'); });
      $svg.attr({
        width: $(window).width(),
        height: (1024 / 1920) * $(window).width(),
      });

      $('#Button-first').attr({
        transform: 'translate(418.000000, 343.000000)',
      });

      $('#Button-second').attr({
        transform: 'translate(796.000000, 468.000000)',
      });

      $('#Button-third').attr({
        transform: 'translate(1315.000000, 555.000000)',
      });

      $('#Button-fourth').attr({
        transform: 'translate(1094.000000, 825.000000)',
      });

      if ((1024 / 1920) * $(window).width() + 30 > $(window).height()) {
        $svg.closest('.bottom-info').css('bottom', '0');
      }
    } else if ($(window).width() <= 860 && $(window).width() > 779) {
      $svg.removeAttr('viewBox');
      $svg.each(function () { $(this)[0].setAttribute('viewBox', '0 0 855 1219'); });
      $svg.attr({
        width: $(window).width(),
        height: (1219 / 855) * $(window).width(),
      });

      $('#Button-first').attr({
        transform: 'translate(260.000000, 498.000000)',
      });

      $('#Button-second').attr({
        transform: 'translate(20.000000, 631.000000)',
      });

      $('#Button-third').attr({
        transform: 'translate(430.000000, 779.000000)',
      });

      $('#Button-fourth').attr({
        transform: 'translate(10.000000, 934.000000)',
      });
    }
  }

  function parallax() {
    gsap.to('.top', {
      y: -200,
      duration: 2,
      scrollTrigger: {
        trigger: '.background-elements',
        start: 'top top',
        end: '+=100%',
        scrub: true,
      },
    });

    gsap.to('.middle', {
      y: -100,
      duration: 2,
      scrollTrigger: {
        trigger: '.background-elements',
        start: 'top top',
        end: '+=100%',
        scrub: true,
      },
    });
  }

  function init() {
    // init clicks
    $('.infopage .close-icon').on('click', () => {
      $('.infopage').remove();
    });

    $('.menu-button.menu-icon').on('click', () => {
      menu.openNavigation();
    });

    if ($(window).width() > 850) {
      parallax();
    }

    setYoutubePrivacy();
    setBottomInfoSvg();

    $(window).resize(() => {
      setBottomInfoSvg();
    });
  }

  return {
    init,
    setMiddleAfter,
  };
}(jQuery));
