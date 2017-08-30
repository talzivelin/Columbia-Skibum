// Nav functions

jQuery(window).load(function() {

	//if ($('html').hasClass('touch')) {  // Disable for touch devices.

		var $myBody = $('html, body')

		$('nav a, .cta-text, .cta-hero').click(function(event){
			event.preventDefault();
			var myURL = $(this).attr("href");
			var $active = $('#headerWrap nav a[href="'+myURL+'"]');
		    
			var offsetAdjust = $('header').height();
		    // detect firefox - :-(
		   	// if(BrowserDetect.browser == 'Firefox') { offsetAdjust -= 13; } //this seems to be unneeded
			
			$('#headerWrap nav a.current').removeClass("current");
			$active.addClass("scrollactive");
			$('#headerWrap').addClass('scrolling');
			
		    $myBody.animate({
		        scrollTop: $('#' + $.attr(this, 'href').substr(1)).offset().top - offsetAdjust
		    }, 500, function(){
				$('#headerWrap').removeClass('scrolling');
				$('#headerWrap nav a.current').removeClass("scrollactive");
				$active.addClass("current");
			});
			
		    // return false;
		});

		// Detect scroll direction and update nav when new section hit

	    var offsetAdjust = $('header').height() + 5;
		$('.checkpoint').waypoint(function(direction) {
			
			if (direction == 'up') {
				var myURL = "#" + $(this).prev('.checkpoint').attr("id");
			} else {
				var myURL = "#" + $(this).attr("id");
			}
			var $active = $('#headerWrap nav a[href="'+myURL+'"]');
			
			// window.clearTimeout(newnav);
			$('#headerWrap nav a.current').removeClass("current");
		    $active.addClass("current");


		    //$('.checkpoint-top').waypoint('destroy');

		}, { offset: offsetAdjust});

	});
