jQuery(document).ready(function( $ ) {

	var graphMode = "submit";

	//Set date range
	var sept9  = new Date(2013, 9, 21, 9); // FYI, Javascript months are 0 - 11!
	var dec2 = new Date(2013, 11, 2, 9);
	var dec8 = new Date(2013, 11, 8, 9);
	var dec17 = new Date(2013, 11, 17, 9);
	var dec20 = new Date(2013, 11, 20, 9);

	var today = new Date(); // leave () blank for today's date, or fill in date to test/debug

	// Submission date calculations
	var daysToSubmit = Date.daysBetween(sept9, dec2);
	var currentDay = Date.daysBetween(sept9, today);
	
    

	// Percent complete calculcations
	var percentComplete = 0;

    
    var evaluation_phase = (currentDay > daysToSubmit);
    if (evaluation_phase) {
    	// Eval date calculations
    	var totalEvalDays = Date.daysBetween(dec2, dec17);
    	var	currentEvalDay = Date.daysBetween(today, dec17);
    	var totalFinalDays = Date.daysBetween(dec2, dec20);
        
		if (currentEvalDay <= totalEvalDays)
			graphMode = "eval";
		else
			graphMode = "complete";
    }
    

	// calculate graph accordingly
	if (graphMode == "eval") {
		var daysLeft = Date.daysBetween(today, dec17);

        // currentDay = daysToSubmit;
		percentComplete = Math.round(currentDay / (daysToSubmit + totalFinalDays) * 100);

        // percentComplete += (currentEvalDay / (totalEvalDays + 1) * 100 * .29);
		
		if (daysLeft > 1)
			$('#label-status').text(Math.round(daysLeft) + " days of evaluation left");	
		else
			$('#label-status').text(Math.round(daysLeft) + " day of evaluation left");
	}
	else if (graphMode == "submit") {
		percentComplete = currentDay / daysToSubmit * 100 * .71;
		

    	var weeksLeft = Math.floor((daysToSubmit - currentDay) / 7) + 1;
		if (weeksLeft != 1) {
			$('#label-status').text("About " + weeksLeft.toString() + " weeks to submit"); 		}
		else {
			var daysLeft = Date.daysBetween(today, dec2) + 1;
			if (daysLeft > 1)
				$('#label-status').text("About " + daysLeft.toString() + " days to submit");
			else
				$('#label-status').text("About " + daysLeft.toString() + " day to submit");
		}
	}
	else {
		percentComplete = 100;
		$('#label-status').text("Evaluation complete!");
	}

	// Animations
	$('.ski-balloon').animate({opacity: '1'}, 1000, 'easeInOutQuad');
	$('.ski-balloon').animate({marginTop: '-40px'}, 500, 'easeInOutQuad');

	$('#complete').animate({width: percentComplete.toString() + '%'}, 1200, 'linear');

	$object = $('.cssanimations .swing-ski');
	swingMe($object, true);	


    // console.log("Start Submit Date:" + sept9.toString());
    // console.log("End Submit Date:" + dec2.toString());
    // console.log("Start Eval Date:" + dec17.toString());
    // console.log("End Eval Date:" + dec20.toString());
    // console.log("Today:" + today.toString());
    // console.log("Days to Submit:" + daysToSubmit.toString());
    // console.log("Current Day:" + currentDay.toString());
    // console.log("Total Eval Days:" + totalEvalDays.toString());
    // console.log("Current Eval Day:" + currentEvalDay.toString());
    // console.log("Percent Complete:" + percentComplete.toString());
    // console.log("Mode:" + graphMode);


});

function swingMe($object, left) {
	if (left) {
		$object.addClass('left').removeClass('right');
		setTimeout(function () {
			swingMe($object, false);
		}, 1800);
	} else {
		$object.addClass('right').removeClass('left');
		setTimeout(function () {
			swingMe($object, true);
		}, 1800);
	}
}

// 
// // Functions
// function swingMeClock() {
// 	$('.swing-ski').animate({transform: 'rotate(25deg)'}, 1800, 'easeInOutQuad');
// 	setTimeout(swingMeCounter,1);
// }
// 
// function swingMeCounter() {
// 	$('.swing-ski').animate({transform: 'rotate(-25deg)'}, 1800, 'easeInOutQuad');
// 	setTimeout(swingMeClock,1);
// }

Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return difference_ms/one_day; 
}