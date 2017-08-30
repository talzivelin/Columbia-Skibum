jQuery( document ).ready(function( $ ) {
	$('.swinger').css('transform-origin', '38% top');
	swingMe(false);	
});

function swingMe(left) {
	if (left) {
		$('.swinger').animate({transform: 'rotate(25deg)'}, 2800, 'easeInOutQuad', function(){
			swingMe(false);
		});
	} else {
		$('.swinger').animate({transform: 'rotate(-25deg)'}, 2800, 'easeInOutQuad',function(){
			swingMe(true);
		});
	}
}
