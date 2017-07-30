(function($,sr){

	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) 	func.apply(obj, args);
				timeout = null;
			};

			if (timeout) clearTimeout(timeout);
			else if (execAsap) func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function(fn){
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};

})(jQuery,'smartresize');

(function(){

	$wrapper = $('#wrapper');
    
    function min(a, b) {
        if(a < b) {
            return a;
        }
        return b;
    }
    
    function isMobile() {
        return jQuery(window).width() < 960;
    }

	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
        console.log("HEIGHT: " + windowHeight);
		jQuery('#header').height(windowHeight);
	}

	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').height()/2) - (jQuery('#header > .center').height()/2);
		bannerText.css('padding-top', bannerTextTop+'px');
		bannerText.show();
	}

	function setHeaderBackground() {
        if (isMobile()) {
            return;
        }
        
		var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top
        
		if (scrollTop > 200) {
			if (jQuery(window).width() < 992){
				jQuery('.logo').show();
				jQuery('.logo-mobile').hide();
			}
			jQuery('#header .top').addClass('solid');
		} else {
			if (jQuery(window).width() < 992){
				jQuery('.logo').hide();
				jQuery('.logo-mobile').show();
			}
			if (jQuery(window).width() > 992){
				jQuery('.logo').show();
				jQuery('.logo-mobile').hide();
			}
			jQuery('#header .top').removeClass('solid');
		}
	}

	jQuery.noConflict();
	setHomeBannerHeight();
	centerHomeBannerText();
	setHeaderBackground();

	//Resize events
    
    jQuery(window).smartresize(function(){
        setHomeBannerHeight();
        centerHomeBannerText();
        setHeaderBackground();
   });
    
    jQuery('.nav-dropdown .nav-dropdown-items a').click(function(e) {
        e.stopPropagation();
        jQuery('.nav-dropdown').removeClass('active');
    });
    
    jQuery('.nav-dropdown').click(function(e) {
        e.stopPropagation(); //stops the document click action
        jQuery(this).toggleClass('active');
    });
    
    //Ideally this should be the document root, but for some mystical reason
    //if I use the document root, it doesn't work on iOS but works elsewhere.
    jQuery('#wrapper').click(function() {
        jQuery('.nav-dropdown').removeClass('active');
    });

	jQuery('.scrollTo').click(function(e){
		e.preventDefault();
        if (isMobile()) {
            jQuery.scrollTo(jQuery(this).attr('href'), 1000, {
                axis:'y'
            });
        }
        else {
            jQuery.scrollTo(jQuery(this).attr('href'), 1000, {
                offset:-(jQuery('#header .top').height()+28),
                axis:'y'
            });
        }
		return false;
	});

	jQuery(window).scroll( function() {
		setHeaderBackground();
		return false;
	});

})();