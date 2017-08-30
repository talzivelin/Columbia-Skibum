// Add to Cal event details and initialization

jQuery( document ).ready(function( $ ) {
	$('.calendar-add').AddToCal({
	    // ical and vcal require an ics or vcs file to be served.
	    // Disable these features if reqired (as a result the 30boxes, iCal and vCalendar menu links will not appear)
	    icalEnabled:true,
	    vcalEnabled:false,
        boxesEnabled: false,
        yahooEnabled: false,
        liveEnabled: false,
        googleEnabled: true,

	    getEventDetails: function( element ) {
        var
          dtstart_element = element.find('.dtstart'), start,
          dtend_element = element.find('.dtend'), end,
          title_element = element.find('.summary'), title,
          details_element = element.find('.description'), details;

        // in this demo, we attempt to get hCalendar attributes or otherwise just dummy the values
        start = dtstart_element.length ? dtstart_element.attr('title') : new Date();
        if(dtend_element.length) {
          end = dtend_element.attr('title');
        } else {
          end = new Date();
          end.setTime(end.getTime() + 60 * 60 * 1000);
        }
        title = title_element.length ? title_element.html() : element.attr('id');
        details = details_element.length ? details_element.html() : element.html();

        // return the required event structure
        return {
          webcalurl: null,
          icalurl: "../skibumscholarship.ics",
          vcalurl: null,
          start: start,
          end: end,
          title: title,
          details: details,
          location: "Skibumscholarship.com",
          url: null
          };
      }
  });
});