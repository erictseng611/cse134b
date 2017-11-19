window.addEventListener("DOMContentLoaded", function(event) {
	
	function loadJSON(callback) {

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', '../json/schedule.json', true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            // .open will NOT return a value but simply returns undefined in async mode so use a callback
	            callback(xobj.responseText);
	        }
	    }
	    xobj.send(null);
	}

	// Call to function with anonymous callback
	loadJSON(function(response) {
	    // Do Something with the response e.g.
	    jsonresponse = JSON.parse(response);

	    // Assuming json data is wrapped in square brackets as Drew suggests
	    var schedule = jsonresponse.schedule;
		let t = document.getElementById('schedule-view');

		let markup = schedule.map(game =>`<a href="./liveGame.html" class="large_button"><p>${game.date} ${game.team1} vs. ${game.team2}</p></a>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		document.querySelector('#view').appendChild(clonedTemplate);
	});
});

