$(document).ready(function() {

	if (!$('html').hasClass('touch')) { 
		var scrollorama = $.scrollorama({
	        blocks:'.scrollblock',
	        enablePin:false
	    });

	    $('#hero-graphic').each(function() {
					scrollorama
						.animate($(this),{ duration: 300, property:'top', start: 30, end: -60, easing: 'Back' })
				});

	    $('#howtoenter-steps').each(function() {
					scrollorama
						.animate($(this),{ duration: 700, property:'top', start: 130, end: -10, easing: 'Back' })
				});

	    $('#fireball').each(function() {
					scrollorama
						.animate($(this),{ duration: 1200, property:'margin-top', end: -600 })
						.animate($(this),{ duration: 1200, property:'margin-bottom', end: 600 })
				});

	    $('.omni-yeti').each(function() {
					scrollorama
						.animate($(this),{ duration: 400, property:'margin-top', start: 0, delay: 200, easing: 'Back' })
						.animate($(this),{ duration: 400, property:'margin-bottom', end: 73, delay: 200, easing: 'Back' })
				});
	}
    
});