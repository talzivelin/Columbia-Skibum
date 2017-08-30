jQuery(document).ready(function( $ ) {

	var graphMode = "submit";

	//Set date range
	var startSubmitDate  = new Date(2013, 9, 2); // FYI, Javascript months are 0 - 11!
	var endSubmitDate = new Date(2013, 11, 7);
	var startEvalDate = new Date(2013, 11, 8);
	var endEvalDate = new Date(2013, 11, 14);

	var today = new Date(); // leave () blank for today's date, or fill in date to test/debug

	// Submission date calculations
	var daysToSubmit = Date.daysBetween(startSubmitDate, endSubmitDate);
	var currentDay = Date.daysBetween(startSubmitDate, today);
	
	var weeksLeft = Math.floor((daysToSubmit - currentDay) / 7) + 1;

	// Eval date calculations
	var totalEvalDays = Date.daysBetween(startEvalDate, endEvalDate);
	var	currentEvalDay = Date.daysBetween(startEvalDate, today);

	// Percent complete calculcations
	var percentComplete = 0;

	// Determine proper graph mode
	if (currentDay > daysToSubmit) { 
		
		if (currentEvalDay <= totalEvalDays)
			graphMode = "eval";
		else
			graphMode = "complete";
	}

	// calculate graph accordingly
	if (graphMode == "eval") {
		var daysLeft = Date.daysBetween(today, endEvalDate) + 1;

		currentDay = daysToSubmit;
		percentComplete = currentDay / daysToSubmit * 100 * .71;
		percentComplete += (currentEvalDay / (totalEvalDays + 1) * 100 * .29);
		
		if (daysLeft > 1)
			$('#label-status').text(daysLeft.toString() + " days of evaluation left");	
		else
			$('#label-status').text(daysLeft.toString() + " day of evaluation left");
	}
	else if (graphMode == "submit") {
		percentComplete = currentDay / daysToSubmit * 100 * .71;
		
		if (weeksLeft != 1) {
			$('#label-status').text("About " + weeksLeft.toString() + " weeks to submit"); 		}
		else {
			var daysLeft = Date.daysBetween(today, endSubmitDate) + 1;
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

	$('.swing-ski').css('transform-origin', '38% top');
	swingMeClock();


	// console.log("Start Submit Date:" + startSubmitDate.toString());
	// console.log("End Submit Date:" + endSubmitDate.toString());
	// console.log("Start Eval Date:" + startEvalDate.toString());
	// console.log("End Eval Date:" + endEvalDate.toString());
	// console.log("Today:" + today.toString());
	// console.log("Days to Submit:" + daysToSubmit.toString());
	// console.log("Current Day:" + currentDay.toString());
	// console.log("Total Eval Days:" + totalEvalDays.toString());
	// console.log("Current Eval Day:" + currentEvalDay.toString());
	// console.log("Percent Complete:" + percentComplete.toString());
	// console.log("Mode:" + graphMode);


});


// Functions
function swingMeClock() {
	$('.swing-ski').animate({transform: 'rotate(25deg)'}, 1800, 'easeInOutQuad');
	setTimeout(swingMeCounter,1);
}

function swingMeCounter() {
	$('.swing-ski').animate({transform: 'rotate(-25deg)'}, 1800, 'easeInOutQuad');
	setTimeout(swingMeClock,1);
}

Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}