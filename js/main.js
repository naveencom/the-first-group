$(document).ready(function() {

    var winWidth = $(window).width();
    var winHeight = $(window).height();
    // alert( 'Width ='+winWidth + ' & ' + 'Height =' + winHeight );
    

    // RTL check --------------------------

    var dirRtl = false;

    if ( $('body').hasClass('rtl') ) {
        dirRtl = true;
    }

    // Custom scrollbar style --------------------------

    if ( $('.scrollbar-inner').length ) {
        $('.scrollbar-inner').scrollbar();
    }

    //  Initialize masonry - Testimonials page --------------------------

    if( $('.grid').length ) {

        $('.grid').isotope({
            itemSelector: '.grid-item', 
            masonry: {
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer'
            } 
        });
    }


    //  Initialize date picker --------------------------

    if ( $('.date-picker').length ) {

        $('.date-picker').dcalendarpicker({
            format: 'dd-mm-yyyy' // default: mm/dd/yyyy
        });
    }
    

 
	// Menu "Hamburger" Icon action --------------------------

	$('.menu-icon').click(function(){

		$('html, body').toggleClass('overflow-hidden');
		$(this).find('.nav-icon').toggleClass('open');
		$('#main-header, .main-menu').toggleClass('menu-opened');

	});

	// Agents listing -------------------------- 

	if ( $(".agents-wrapper").length ) {

		$(".agents-wrapper .row").slick({
            centerMode: true,
            rtl: ( $('body').hasClass('rtl') ) ? true : false,
            centerPadding: '0px',
            slidesToShow: 3,
            responsive: [ {
              breakpoint: 700,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '70px',
                slidesToShow: 1
              }
            }, {
              breakpoint: 400,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
		  ]
		});
	}

	// Services - Payment Options flip action --------------------------

	$('.flip-open').click(function(e) {
		e.preventDefault();
		$(this).parents('.flip-container').addClass('flip-active');
	});

	$('.flip-close').click(function(e) {
		$(this).parents('.flip-container').removeClass('flip-active');
	});

	

	// Properties Carousal Slider -------------------------- 
    


	if ( $(".properties-slider").length ) {

        $(".properties-slider").slick({
            appendArrows: '.properties-module .slider-arrows',
            prevArrow: '<div class="slick-prev slick-arrow"></div>',
            nextArrow: '<div class="slick-next slick-arrow"></div>',
            rtl: ( $('body').hasClass('rtl') ) ? true : false,
            slidesToShow: 4,
            responsive: [{
              breakpoint: 1026,
              settings: {
                slidesToShow: 3
              }
            }, {
              breakpoint: 767,
              settings: {
                slidesToShow: 2
              }
            }, {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
            ]
        });
        }

	// Titanium Rewards Tab - Service page --------------------------

    $('.titanium-tabs-wrapper .tablist li').click(function() {

        var tab_id      = $( this ).attr('data-tab');
        var offset      = $( this ).offset();
        var offsetTop   = offset.top - 50;

        $('html, body ').animate({ scrollTop: offsetTop }, 500 );

        $('.tablist li').removeClass('current');
        $('.tab-content-point').removeClass('current');

        $(this).addClass('current');
        $( "#tab-" + tab_id ).addClass('current');

        // ----------------------------------------------------------

        // var tab_id = $( this ).attr( 'data-tab' );

        // $('.tab-content-point').slideUp();
        // $('.tablist li').removeClass('current');

        // if ( $( "#tab-" + tab_id ).is(":visible") ) {

        //     $(this).removeClass('current');
        //     $( "#tab-" + tab_id ).slideUp().removeClass('current');
        // } else {

        //     $(this).addClass('current');
        //     $( "#tab-" + tab_id ).slideDown();
        // }
    });

    //Titanium Rewards Main Accordian - Service page --------------------------

    $('.titanium-tabs-wrapper .tab-content-point .accord-title').click(function() {

        $('.titanium-tabs-wrapper .tab-content-point .accord-content').slideUp();
        $('.titanium-tabs-wrapper .tab-content-point .accord-title').removeClass('open');

        if ( $(this).next().is(":visible") ) {

            $(this).removeClass('open');
            $(this).next().slideUp();
        } else {

            $(this).addClass('open');
            $(this).next().slideDown();
        }

    });

    $(window).resize(function() {
        var winWidth = $(window).width();

        if ( winWidth > 767 ) { 
            $('.tab-content-point.current .accord-content').show();
        }  
    });

	// Video model box initialization - Home page --------------------------

	$("a.fancybox-video").click(function(e) {

	    $.fancybox({
            'padding': 0,
	        'autoScale': false,
            'wrapCSS': 'fancy-video-wrap',
	        'type': 'iframe', 
	        'openEffect': "fade",
			'closeEffect': "fade",
			'width': 853,
            'height': 480,
            'href': this.href,
            'helpers': {
                overlay: {
                    media : true,
                    locked: false
                }
            }
	    });

	    return false;

	});



	//Breadcrumb --------------------------

    var swipeBreadcrumb = function() {

        if ( $(window).width() < 500 ) {

            var scrollPos = $('.tfg-breadcrumb ul').width();

            if ( scrollPos > 300 ) {
                $('.tfg-breadcrumb').css("overflow-x", "auto");
                $('.tfg-breadcrumb ul').css("margin-right", "40%");
                $('.tfg-breadcrumb ul').css("margin-left", "15px");
                $('.tfg-breadcrumb ul').css('width', scrollPos )
                $('.tfg-breadcrumb').scrollLeft( scrollPos );
            } else {
                $('.tfg-breadcrumb').css('text-align', 'center');
                $('.tfg-breadcrumb').css("overflow-x", "hidden");
            }

        } else {

            $('.tfg-breadcrumb ul').css("margin-left", "");
            $('.tfg-breadcrumb ul').css("margin-right", "");
            $('.tfg-breadcrumb ul').css('width', "");
            $('.tfg-breadcrumb').css("overflow-x", "hidden");

        }
    }

    swipeBreadcrumb();

    // Construction status panel - Property landing page -----------------------------

    $('.status-open-btn').click(function(e) {

    	e.preventDefault();
    	
    	var offset 			= $(this).offset();
    	var winWidth 		= $(window).width();
    	var headerHeight 	= $('#main-header').outerHeight();

    	if ( winWidth <= 480 ) {

    		$('#main-header').addClass('panel-opened');
    		$('.status-panel').css('top', headerHeight );
            $('body, html').animate({ scrollTop:  0 });
    		panel_action();

    	} else {
    		panel_action( offset.top );
    	}
    	
    	function panel_action( vOffset ) {

     		$('body, html').animate({ scrollTop:  vOffset+'px' }, 500, function() {
 	    		$('body').addClass('overflow-hidden');
                $('.status-panel').fadeIn( 500 );

                if ( dirRtl === true ) {
                    $('.status-content').fadeIn().animate({ marginLeft: 0 }, 500 );
                } else {
                    $('.status-content').fadeIn().animate({ marginRight: 0 }, 500 );
                }
                
     		});
    	}

    });

    $(window).resize(function() {
    	var winWidth = $(window).width();

    	if ( winWidth >= 480 ) {
    		$('.status-panel').animate({ 'top': 0});
    	} else {
    		var headerHeight = $('#main-header').outerHeight();
    		$('.status-panel').animate({ 'top': headerHeight });
    	}
    });

    $('.status-close-btn').click(function() {
    	
    	$('body').removeClass('overflow-hidden');
    	var panelWidth = $('.status-content').width();

        if ( dirRtl === true ) {
            $('.status-content').animate({ marginLeft: -panelWidth }, 500 ).fadeOut();
        } else {
    	   $('.status-content').animate({ marginRight: -panelWidth }, 500 ).fadeOut();
        }
        $('.status-panel').fadeOut( 500 );
        $('#main-header').removeClass('panel-opened');
    
    });


    // My profile page --------------------------
	
    $('.edit-btn').click(function(e) {

        e.preventDefault();
        $(this).hide();
        var parent =  $(this).parents('.user-info-box');
        parent.find('.user-info-wrap').stop().slideUp();
        parent.find('.edit-info-wrap').stop().slideDown().addClass('edit-active');
    });

    $('.cancel-edit').click(function(e) {

        e.preventDefault();
        $('.edit-btn').show();
        var parent =  $(this).parents('.user-info-box');
        parent.find('.user-info-wrap').stop().slideDown();
        parent.find('.edit-info-wrap').stop().slideUp().removeClass('edit-active');
    }); 


    // Service page top tab navigation mobile view -----------------------

    $(window).load(function() {
        set_active_tab();
    });

    $(window).resize(function() {
         clearTimeout(setTimeout);
         var resizeTimeOut = setTimeout( _removeTabStyle, 500 );
    });

    function set_active_tab() {

        if ( $('.top-tab-nav').length ) {
            var active_page = $('.top-tab-nav').find('.tab-active').text();
            $('.tab-active-page').text( active_page );
        }
    }

    $( '.tab-toggle' ).click(function() {

        $(this).toggleClass( 'tab-dropped' );
        $(this).next( '.top-tab-nav' ).slideToggle( 500, 'easeInOutCirc' );
    });

    function _removeTabStyle(){

        var winWidth = $(window).width();
        if ( winWidth >= 768 ) {
            $( '.tab-toggle' ).removeClass( 'tab-dropped' );
            $('.top-tab-nav').removeAttr('style');
        }
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    
    // Un-used code ==========================

    // equal_columns_height( '.properties .row',  '.col-xs-6 .properties-info-wrap' );
    // $('.gallery').load('http://staging.thefirstgroup.com/en/developments/tecom/grand-central/ #galleryconstruction');
    // $('.gallery').load('http://2.bp.blogspot.com/-FkOVglPDfvA/UNXVBDt1j5I/AAAAAAAABdg/dgfPIXBAkCg/s1600/iframe.png'); 

    
    
    function equal_columns_height( container, child )  {

        $(window).resize(function() {

            $( child, this ).css('height','auto'); 
            get_height( container, child );

            console.log( container, child );

            
        });

        function get_height( container, child ) {
            $( container ).each(function(){
              var highestBox = 0;
              
              $( child, this).each(function(){
                if( $(this).height() > highestBox ) { 
                  highestBox = $(this).height(); 
                }
              });  
                    
              $( child, this ).height( highestBox );
                            
            });
        }
    }
    // -------------------------------------------------------------------------------------------------------------------------------


 












}); // Jquery Document End here