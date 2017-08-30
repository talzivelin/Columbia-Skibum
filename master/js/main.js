

function resizeFireball() { 
	var windowWidth = $(window).width();
	if (windowWidth <= 960) { 
		windowWidth = 960;
	} 
	var fireballLeft = (windowWidth - $('section').width()) / 2 + parseInt($('#fireball').css('marginLeft'));
	var fireballAvailWidth = windowWidth - fireballLeft;
	$('#fireball').css({ 'width': fireballAvailWidth });
}

// RETRIEVE $_GET PARAMS
jQuery.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) { 
    	return results[1] || 0;
    } else { 
    	return 0;
    }
    
}


jQuery(document).ready(function($) { 

	// ADD IE8 TEST to MODERNIZR
	Modernizr.addTest('ie8', function() { 
		if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version == 8) { 
			return true;
		}
		return false;
	});

	// RESIZE THE FIREBALL
	$(window).resize(function() { 
		resizeFireball();
	});
	resizeFireball();

	// MOBILE ROUTING
	// if we were directed here from the mobile site
	if ($.urlParam('src') == 'm') { 
		$('body').addClass('mobile');
	} else {
		// if we are on a touch device
		if (Modernizr.touch) { 
			// if we are not an iPad mini
			if (!Modernizr.mq('only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (-webkit-min-device-pixel-ratio: 1)')) {	
				// if device width is <= 568
				if (Modernizr.mq('only screen and (max-device-width : 568px)')) { 
					window.location = 'm'; // redirect to mobile site
				} else { 
					$('body').addClass('mobile'); // add mobile class
				}
			} 
		}
	}

	// RESIZE VIDEO SECTION
	$('section.video').css({ height: $('section.hero').height() });

	// VIDEO PLAYER
	var heroVideo = '';
	var heroVideoWidth = 960;
	var heroVideoHeight = 581;
	if ($('body').hasClass('facebook')) { 
		heroVideoWidth = 730;
		heroVideoHeight = 445;
	}


	function populateHeroVideo() { 
		heroVideo = '<iframe id="heroVideoIframe" width="' + heroVideoWidth + '" height="' + heroVideoHeight + '" src="//www.youtube.com/embed/4-yFhCvTyxw?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
		/*
		if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version >= 9) { 
			heroVideo = '<video controls="true" autoplay="true" width="' + heroVideoWidth + '" height="' + heroVideoHeight + '" poster="http://storage.filemobile.com/storage/12763871/15"><source src="http://storage.filemobile.com/storage/12763871/22" type="video/mp4" /></video>';
		} else { 
			heroVideo = '<object allowScriptAccess="always" id="vp12763871" type="application/x-shockwave-flash" allowFullScreen="true" data="http://mediafactory.fm/static/videoplayer/player.swf" width="' + heroVideoWidth + '" height="' + heroVideoHeight + '" flashVars="skin=http://mediafactory.fm/static/videoplayer/filemobileSkin.zip&file=http://rstorage.filemobile.com/storage/12763871/21&provider=video&image=http://storage.filemobile.com/storage/12763871/15&autostart=true"><param name="movie" value="http://mediafactory.fm/static/videoplayer/player.swf" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="wmode" value="transparent" /><param name="flashVars" value="skin=http://mediafactory.fm/static/videoplayer/filemobileSkin.zip&file=http://rstorage.filemobile.com/storage/12763871/21&provider=video&image=http://storage.filemobile.com/storage/12763871/15&autostart=true"></object><script type="text/javascript">if(navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/)){ document.getElementById("vp12763871").innerHTML = \'<video controls="true" autoplay="true" width="' + heroVideoWidth + '" height="' + heroVideoHeight + '" poster="http://storage.filemobile.com/storage/12763871/15"><source src="http://storage.filemobile.com/storage/12763871/22" type="video/mp4" /></video>\';}</script>';
		}
		*/
		$('.heroVideo').html(heroVideo);
	}

	$('.heroVideo').html(heroVideo);

	$('#hero-play-btn').click(function() { 
		if ($('html').hasClass('touch')) { 
			window.open('//www.youtube.com/embed/bjNRX7pij3I?rel=0&autoplay=1', 'heroVideo');
		} else { 
			$('.wrapperVideo').addClass('active');
			populateHeroVideo();
		}
		
	});
	$('.videoClose').click(function() { 
		$('.wrapperVideo').removeClass('active');
		$('#heroVideoIframe').attr('src', '');
	});
	$('.wrapperVideo').click(function() { 
		if ($('.wrapperVideo').hasClass('active')) { 
			$('.videoClose').click();
		}
	});
	$('.heroVideo').click(function(e) { 
		e.stopPropagation();
	});

	// IE 8 Countdown fallback
	/*
	if ($('html').hasClass('ie8')) { 
		var today = new Date();
		var date = new Date(1382328000000);
		var diffMs = (date - today); // milliseconds between now & Christmas
		var diffDays = Math.round(diffMs / 86400000); // days
		var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
		$('#myTimer').html('<div id="ie8Countdown">'  + diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes</div>");
	}
	*/
	

});


/* rollover */

jQuery(document).ready(function($) {
	$("img.rollover").hover( 
	function() { this.src = this.src.replace("_off", "_on"); 
	}, 
	function() { this.src = this.src.replace("_on", "_off"); 
	});
}); 
