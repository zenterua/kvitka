
    "use strict";
    $('.open-sub').on('click', function (e) {
        $(this).next().slideToggle();
    });

     //Open hidden text on news
     $(document).on('click', '.read-more', function (e) {
        e.preventDefault();

        $(this).prev('.hidden-text').slideToggle(500);
        $(this).toggleClass('active');

        $(this).hasClass('active') ? $(this).text('Згорнути') : $(this).hasClass('read-job') ? $(this).text('Детальніше') : $(this).text('Читати далі');
    });

    //Load old posts
    $('.old-point').on('click', function () {
        $.ajax({
            url: "posts.html",
            beforeSend: function () {
                $('.loader-old').addClass('active');
            }
        })
        .done(function( data ) {
            setTimeout(function () {
                var responseObject = $($.parseHTML(data));
                $('.loader-old').removeClass('active');
                $('.news-container').append(responseObject);
                $(responseObject).animate({opacity: 1}, 500);
                $('.info-row-old').addClass('active');
                galleryImg();
            }, 1000);
        });
    });

    if ( $(".popup-info-box").length) {
        $(".popup-info-box").niceScroll({
            cursorcolor:"#07070c",
            background: "#efefef",
            cursorwidth: "3px"

        });
    }

    $('.open-detail-popup').on('click', function (e) {
        e.preventDefault();
        $('.popup').fadeIn();
    });


    $('#close-popup').on('click', function (e) {
        e.preventDefault();
        $('.popup').fadeOut();
    });

    // Initialize popup as usual
    function galleryImg() {
        $('.open-img').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below

            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }

        });
    }
    galleryImg();
    
    //open and close popup
    $(document).on('click', '.open-popup', function () {
        openPopup($(this).data('rel'));
        return false;
    });
    $(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function () {
        closePopup();
		return false;
    });
    
    function openPopup(foo){
        $('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
    }
    
    function closePopup(){
        $('.popup-wrapper, .popup-content').removeClass('active').find('.embed-responsive').html('');
        $('.videoCaption').html('');
		$('html').removeClass('overflow-hidden');
    }
    
    //MENU  RESPONSIVE CLICK
    $('.menu-button').on('click', function () {
        $('.nav').slideToggle(500);
        $(this).toggleClass('active');
         $('.header .navigation').toggleClass('full-height');
    });
    
    /*=====================*/
	   /* swiper sliders */
	/*=====================*/

    var initIterator = 0, swipers=[];
    $('.swiper-container').not('.initialized').each(function () {
        var $t = $(this);
        var index = 'swiper-unique-id-' + initIterator;
        $t.addClass('swiper-' + index + ' initialized').attr('id', index);
        $t.parent().find('.swiper-pagination').addClass('swiper-pagination-'+index);
        $t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-' + index);
        $t.parent().find('.swiper-button-next').addClass('swiper-button-next-' + index);
        var slidesPerViewVar = ($t.data('slides-per-view')) ? $t.data('slides-per-view') : 1;
        if (slidesPerViewVar != 'auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);
        swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
            pagination: '.swiper-pagination-' + index
            , paginationClickable: true
            , nextButton: '.swiper-button-next-' + index
            , prevButton: '.swiper-button-prev-' + index
            , slidesPerView: slidesPerViewVar
            , autoHeight: ($t.is('[data-auto-height]')) ? parseInt($t.data('auto-height'), 10) : 0
            , loop: ($t.is('[data-loop]')) ? parseInt($t.data('loop'), 10) : 0
            , autoplay: ($t.is('[data-autoplay]')) ? parseInt($t.data('autoplay'), 10) : 0
            , breakpoints: ($t.is('[data-breakpoints]')) ? {
                767: {
                    slidesPerView: parseInt($t.attr('data-xs-slides'), 10)
                }
                , 991: {
                    slidesPerView: parseInt($t.attr('data-sm-slides'), 10)
                }
                , 1199: {
                    slidesPerView: parseInt($t.attr('data-md-slides'), 10)
                }
            } : {}
            , initialSlide: ($t.is('[data-ini]')) ? parseInt($t.data('ini'), 10) : 0
            , speed: ($t.is('[data-speed]')) ? parseInt($t.data('speed'), 10) : 500
            , keyboardControl: true
            , mousewheelControl: ($t.is('[data-mousewheel]')) ? parseInt($t.data('mousewheel'), 10) : 0
            , mousewheelReleaseOnEdges: true
            , direction: ($t.is('[data-direction]')) ? $t.data('direction') : 'horizontal'
            , spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0
            , preventClicks: false,
            onClick: function(swiper, event){
                if ( $t.hasClass('docWrapper') ) {
                    openPopup('1');
                    swipers['swiper-' + $('.swiperPopup').find('.swiper-container').attr('id')].slideTo(swiper.clickedIndex, 0);
                }
            }
        });
        swipers['swiper-' + index].update();
        initIterator++;
    });

    //planDropDown
    $('.planDropDown').on('click', function() {
       $(this).parent().find('.planSubDown').slideToggle(250);
    });
    
    var winSrc;

    //window scroll
    $(window).scroll(function(){
        winSrc = $(window).scrollTop();
        //hide top menu
        
		if (winSrc > 50 ) {
            $('header').addClass('scrollActive');
        } else {
            $('header').removeClass('scrollActive');
        }
        
        //sticky menu
        if ( $('.subNavWrapper').length) {
            if( winSrc + 98 >= $('.subNavWrapper').offset().top ) {
                 $('.sub-nav').addClass('stickyMenu');
            } else {
                $('.sub-nav').removeClass('stickyMenu');
            }
        }
	});

    //Loader
    $(window).on('load', function() {
        $('#loader-wrapper').fadeOut();
    });

