window.addEventListener("DOMContentLoaded", function(event) {

	var games = localStorage.getItem('schedule');
	var schedule;
	var scheduleContainer = document.querySelector('#view');

	if(!games){
		console.log('there wasnt anything in local storage so make a fake network request to get data');
		makeRequest(null);

	} else{
		console.log('render list using local browser data for now then make a network request to get updated items');
		var retrieved = localStorage.getItem('schedule');
		schedule = JSON.parse(retrieved);
		renderSchedule(schedule);
		makeRequest(schedule);
	}

	function makeRequest(compare){
		loadJSON(function(response) {
		    // Do Something with the response e.g.
		    jsonresponse = JSON.parse(response);

		    // Assuming json data is wrapped in square brackets as Drew suggests
		    schedule = jsonresponse.schedule;
		    localStorage.setItem('schedule', JSON.stringify(schedule));

		    // now that there is something on screen, make a request and update the container if local and request data differs
		    // make sure schedule container is empty
		    if(JSON.stringify(schedule) !== JSON.stringify(compare)){
		    	console.log('local and request different');
		    	while(scheduleContainer.firstChild){
		    		console.log('remove kid');
		    		scheduleContainer.removeChild(scheduleContainer.firstChild);
		    	}
		    	renderSchedule(schedule);
			}
		});
	}	

	function renderSchedule(schedule){
		console.log('render schedule');
		let t = document.getElementById('schedule-view');
		let markup = schedule.map(game =>`<a href="./liveGame.html" class="large_button"><p>${game.date} ${game.team1} vs. ${game.team2}</p></a>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		scheduleContainer.appendChild(clonedTemplate);
	}

	function loadJSON(callback) {

	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    // when using network, change the json file to a REST endpoint
	    xobj.open('GET', '../json/schedule.json', true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            // .open will NOT return a value but simply returns undefined in async mode so use a callback
	            callback(xobj.responseText);
	        }
	    }
	    xobj.send(null);
	}

});

