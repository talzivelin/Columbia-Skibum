jQuery( document ).ready(function( $ ) {
	$('.swinger').css('transform-origin', '38% top');
	swingMeClock();
});

function swingMeClock() {
	$('.swinger').animate({transform: 'rotate(25deg)'}, 1800, 'easeInOutQuad');
	setTimeout(swingMeCounter,1);
}

function swingMeCounter() {
	$('.swinger').animate({transform: 'rotate(-25deg)'}, 1800, 'easeInOutQuad');
	setTimeout(swingMeClock,1);
}