function track(event_arr) {
	var test = false;
	event_arr.unshift('_trackEvent');
	
	if (test) {
		try {
			console.log(event_arr);
		} catch(err){}
	}
	_gaq.push(event_arr);
	return true;
}
