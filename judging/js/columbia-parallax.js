$(document).ready(function() {

	if (!$('html').hasClass('touch')) { 
		var scrollorama = $.scrollorama({
	        blocks:'.scrollblock',
	        enablePin:false
	    });

	    $('#hero-graphic').each(function() {
					scrollorama
						.animate($(this),{ duration: 300, property:'top', start: -10, end: -60, easing: 'Back' })
				});

	    $('#howtoenter-steps').each(function() {
					scrollorama
						.animate($(this),{ duration: 700, property:'top', start: 130, end: 30, easing: 'Back' })
				});

        $('#fireball').each(function() {
                    scrollorama
                        .animate($(this),{ duration: 1200, property:'margin-top', end: -400 })
                        .animate($(this),{ duration: 1200, property:'margin-bottom', end: 400 })
                });
        $('#moose1').each(function() {
                    scrollorama
                    .animate($(this),{ duration: 1200, property:'left', start: -400, end: -210 })
                });
        $('#moose2').each(function() {
                    scrollorama
                        .animate($(this),{ duration: 1200, property:'right', start: -400, end: -210 })
                });

	    $('.omni-yeti').each(function() {
					scrollorama
						.animate($(this),{ duration: 400, property:'margin-top', start: 0, delay: 200, easing: 'Back' })
						.animate($(this),{ duration: 400, property:'margin-bottom', end: 73, delay: 200, easing: 'Back' })
				});
	}
    
});