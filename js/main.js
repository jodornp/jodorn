( function( window ) {
  'use strict';
    $.exists = function(selector) {
      return ($(selector).length > 0);
    }
    /*------------------
    Page transition
    -------------------*/
      $('body').prepend('<div class="preload"></div>');
        // load page effect
        end_transition();
        $('.page-transition a').on('click', function(event){
          event.preventDefault();
          var newLocation = $(this).attr('href');
          start_transition(newLocation);
        });
        // Page transition function
          function start_transition(newLocation) {
            if (newLocation != '#' && newLocation != '') {
              $('.container').css('overflow', 'visible');
              $('.preload').css('visibility', 'visible');
              anime({
                targets: '.preload',
                  opacity: [0, 1],
                  duration: 800,
                  easing: 'easeOutExpo'
              });
              anime({
                targets: '.container',
                duration: 1400,
                translateX: [0, -100],
                easing: 'easeOutExpo'
              });
              anime({
                targets: '.header-inner',
                duration: 1400,
                translateY: [0, -20],
                easing: 'easeOutExpo'
              });
              anime({
                targets: 'footer',
                duration: 1400,
                translateY: '20px',
                easing: 'easeOutExpo'
              });
              setTimeout(function() {window.location = newLocation;}, 600);
            }
          }
          function end_transition(){
            $('.container').css('visibility', 'visible');
              anime({
                targets: '.preload',
                  opacity: [1, 0],
                  duration: 1000,
                  easing: 'easeInOutCubic',
                  complete: function(){
                    $('.preload').css('visibility', 'hidden');
                  },
              });
              anime({
                targets: '.container',
                duration: 1400,
                translateX: [100, 0],
                easing: 'easeOutExpo',
                complete: function(){
                  $('.container').css({
                    'transform': ''
                  });
                },
              });
              anime({
                targets: '.header-inner',
                duration: 1400,
                translateY: [-40, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo'
              });
              anime({
                targets: 'footer',
                duration: 1400,
                translateY: [40, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
              });
          }
    /*------------------
    Sticky element
    -------------------*/
      if ($.exists('#sticky')) {
        $(document).on( 'scroll', function(){
          $('#sticky').stick_in_parent({offset_top: 100, parent: '.project-content'});
        });   
      }
    /*------------------
    Mobile menu
    -------------------*/
      var onsize = function() {
          var w_width = $(window).width();
          if(w_width >= 1024) {
            $('.sub-menu').css({'display' : 'block'});
            $('.nav-trigger').parent().removeClass('nav-open');
            $('.menu').removeClass('menu-open');
            $('.dropdown').next('ul').slideUp();
            $('.menu').find('.sub-menu').prev('a').removeClass('dropdown on');
          } else {
            $('.sub-menu').css({'display' : 'none'});
          }
      };
      $(window).on('resize', onsize, function(e){
        e.stopPropagation();
        onsize();
      });
        $('.nav-trigger').on('click', function(){
          $(this).parent().toggleClass('nav-open');
          $('.menu').toggleClass('menu-open');
           $('.menu').find('.sub-menu').prev('a').toggleClass('dropdown');
        });
        $('.menu').on('click', 'a.dropdown', function(){
          $(this).next('ul').slideToggle('fast').prev().toggleClass('on');
        });
    /*------------------
    Home slider
    -------------------*/
      if ($.exists('.home-slider-horizontal')) {
        var slider = $('.home-slider-horizontal').slick({
          centerMode: true,
          variableWidth: true,
          infinite: true,
          dots: true,
          mobileFirst: true,
          customPaging : function(slider, i) {
            return '<button class="nav__item"></button>';
          },
          speed: 600,
          autoplaySpeed: 6000,
          autoplay: true,
          arrows: false,
          cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          centerPadding: '160px',
          slidesToShow: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerPadding: '500px',
              }
            },            
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
        $('.prev').on('click', function(){
          slider.slick('slickPrev');
        });
        $('.next').on('click', function(){
          slider.slick('slickNext');
        });
        slider.on('click', '.slide a', function(event) {
          event.preventDefault();
        });
        slider.on('click', '.slide.slick-current a', function(event) {
          event.preventDefault();
          var newLocation = $(this).attr('href');
          start_transition(newLocation);
        });
      }
    /*------------------
    Project slider
    -------------------*/
      if ($.exists('.project-slider')) {
        var slider = $('.project-slider').slick({
          slidesToShow: 1,
          lazyLoad: "progressive",
          dots: true,
          arrows: false,
          adaptiveHeight: false,
          infinite: true,
          customPaging : function(slider, i) {
            return '<button class="nav__item"><span class="nav__item-inner"></span></button>';
          },
        });
        $('.controls-navigate .prev').on('click', function(){
          slider.slick('slickPrev');
        });
        $('.controls-navigate .next').on('click', function(){
          slider.slick('slickNext');
        });    
      }
    /*------------------
    Sticky header
    -------------------*/
      if ($.exists('.auto-hide-header')) {
        var mainHeader = $('.auto-hide-header'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();
        var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;
        $(window).on('scroll', function(){
        if( !scrolling ) {
          scrolling = true;
          (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
        }
        });
        $(window).on('resize', function(){
          headerHeight = mainHeader.height();
        });
        function autoHideHeader() {
          var currentTop = $(window).scrollTop();
          ( belowNavHeroContent.length > 0 ) 
          ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
          previousTop = currentTop;
          scrolling = false;
        }
        function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
          mainHeader.removeClass('is-hidden');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
          mainHeader.addClass('is-hidden');
        }
        }
      }
    /*------------------
    Grid gallery
    -------------------*/
      if ($.exists('.grid')) {
        $('.grid').imagesLoaded()
          .done( function( instance ) {
            $('.grid').isotope({
              itemSelector: '.grid-item',
              percentPosition: true,
            });
            $('.grid-item').css('visibility', 'visible');
            anime({
              targets: '.grid-item',
              translateX: [200, 0],
              opacity: [0, 1],
              duration: 1400,
              easing: 'easeOutExpo',
              delay: function(el, index) {
                return index * 100;
              }
            });  
          });
        // filter items on button click
        $('#filters').on( 'click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $('.grid').isotope({ filter: filterValue });
        });
        $('#filters .btn-filter').on( 'click', function() {
          $(this).addClass('current');
          $(this).siblings().removeClass('current');
        });    
      }
      if ($.exists('#lightgallery')) {
        $("#lightgallery").lightGallery(); 
      }
      if ($.exists('#video-gallery')) {       
        $('#video-gallery').lightGallery({
          videojs: true,
          selector: '.grid-item a',
          thumbnail: true
        }); 
      } 
      //Paginat hover effect
        $('.button.all').hover(function(){
          $('.all-text').css({opacity: '1'});
        }, 
        function(){
          $('.all-text').css({opacity: '0'});
        });
        $('.button.prev').hover(function(){
          $('.arrow-texts p').css({transform: 'translateY(-2px)'});
        }, 
        function(){
          $('.arrow-texts p').css({transform: 'translateY(-35px)'});
        });
        $('.button.next').hover(function(){
          $('.arrow-texts p').css({transform: 'translateY(-67px)'});
        }, 
        function(){
          $('.arrow-texts p').css({transform: 'translateY(-35px)'});
        });
    /*------------------
    Skills
    -------------------*/
      $('.skills').addClass('active-bar');
      $('.skills .skill .skill-bar span').each(function() {
        $(this).animate({
          "width": $(this).parent().attr('data-bar') + "%"
        }, 1000);
        $(this).append('<b>' + $(this).parent().attr("data-bar") + '%</b>');
      });
      setTimeout(function() {
        $(".skills .skill .skill-bar span b").animate({"opacity":"1"},1000);
      }, 2000);
})( window );