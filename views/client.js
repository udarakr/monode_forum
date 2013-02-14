function longPoll_feed () {
	$.ajax({
			cache: false,
			dataType: 'json',
			type: "GET",
			url: "http://localhost:3000/forums/",
			error: function () {
				setTimeout(longPoll_feed, 10*000000000);
			},
			success: function (json) {
				display_event(json);
				//setInterval(longPoll_feed,10000);
			}
		});
}

function display_event(json){
	$('#json_data').prepend('<hr />');
	console.log(json);
	$('#json_data').prepend('<p>'+JSON.stringify(json)+'</p>');
}
$(document).ready(function() {
	longPoll_feed();
});
