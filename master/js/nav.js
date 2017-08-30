// Nav functions

var lastScrollTop = 0,
        st,
        direction;

// scroll direction detect
function detectDirection() {

	st = window.pageYOffset;

    if (st > lastScrollTop) {
    	direction = "down";
    } else {
        direction = "up";
    }

    lastScrollTop = st;

    return  direction;
}

// jQuery on Ready

jQuery(window).load(function() {

	//if ($('html').hasClass('touch')) {  // Disable for touch devices.

		var $myBody = $('html, body')

		$('nav a, .cta-text').click(function(event){
			event.preventDefault();
			//alert('here');
			var myURL = $(this).attr("href");

			$('nav a.current').removeClass("current");

		    $('nav a').each( function(i){

		    	if ($(this).attr("href") == myURL) 
		    		$(this).addClass("current");
		    });
		    
		    var offsetAdjust = $('header').height();
		    // detect firefox - :-(
		   	if(BrowserDetect.browser == 'Firefox') {
	     		offsetAdjust -= 13;
			}

		    $myBody.animate({
		        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - offsetAdjust
		    }, 500);
		    return false;
		});

		// Detect scroll direction and update nav when new section hit


	    $(window).bind('scroll', function() {

	        var myDirection = detectDirection();


	    	
	    	if (myDirection == 'down') {
	    		$('.checkpoint-top').waypoint(function() {

					var myURL = "#" + $(this).attr("name");

					$('nav a.current').removeClass("current");

				    $('nav a').each( function(i){

				    	if ($(this).attr("href") == myURL) 
				    		$(this).addClass("current");
				    });

				    //$('.checkpoint-top').waypoint('destroy');

				}, { offset: '30%' });
	    	}
	    	else {
	    		$('.checkpoint-bottom').waypoint(function() {

					var myURL = "#" + $(this).attr("id");

					$('nav a.current').removeClass("current");

				    $('nav a').each( function(i){

				    	if ($(this).attr("href") == myURL) 
				    		$(this).addClass("current");
				    });

				    //$('.checkpoint-bottom').waypoint('destroy');
				}, { offset: 'bottom-in-view' });
	    	} 


	    });
	//}
	

});