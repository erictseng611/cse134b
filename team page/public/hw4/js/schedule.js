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

		//temporarily commented out until we use rest endpoint
		//makeRequest(schedule);
	}

	document.addEventListener('click', function(e){
		if(e.target.classList.contains('delete-button')){
			deleteGame(e);
		} else if (e.target.classList.contains('edit-button')){
			editGame(e);
		} else if(e.target.classList.contains('save-button')){
			saveGame(e);
		}
	});

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
		let markup = schedule.map(game =>`<p class="large_button" id="${game.date}">
											<span>${game.date} </span><span>${game.team1}</span> vs. <span>${game.team2}</span>
											<button class="delete-button" data-date="${game.date}" data-opponent="${game.team2}"> delete </button>
											<button class="edit-button" data-date="${game.date}" data-opponent="${game.team2}"> edit </button>
											<button class="hidden save-button" data-date="${game.date}" data-opponent="${game.team2}"> save </button>
											</p>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		scheduleContainer.appendChild(clonedTemplate);
	}

	function deleteGame(e){
		var finder = e.target.dataset.date;
		var el = document.getElementById(finder);
		el.parentNode.removeChild(el);
		
		//perform get request when using REST
		let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
		var result = scheduleCopy.filter(function(game){
			if(game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent){
				return true;
			} else{
				return false;
			}
		});
		// perform post request when using REST
		localStorage.setItem('schedule', JSON.stringify(result));

		// make request when using REST
	}

	function editGame(e){
		var gameContainer = e.target.parentNode;
		var spanTags = gameContainer.getElementsByTagName('span');
		var saveButton = gameContainer.querySelector('.save-button');
		saveButton.classList.remove('hidden');
		for(var i = 0; i < spanTags.length; i++){
			if(i != 1){
				spanTags[i].contentEditable = "true";
				spanTags[i].classList.add('contentEditable');
			}
		}
	}

	function saveGame(e){
		//perform get request when using REST
		let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));

		var gameContainer = e.target.parentNode;
		e.target.classList.add('hidden');
		var spanTags = gameContainer.getElementsByTagName('span');
		for(var i = 0; i < spanTags.length; i++){
			if(i != 1){
				spanTags[i].contentEditable = "false";
				spanTags[i].classList.remove('contentEditable');
			}
		}
		var newDate = spanTags[0].innerHTML;
		var newOpponent = spanTags[2].innerHTML;
		console.log(newOpponent);
		scheduleCopy.forEach(game =>{
			if(game.date === e.target.dataset.date){
				console.log('run');
				game.date = newDate;
				game.team2 = newOpponent;
			}
		});
		// perform post when using REST endpoint
		localStorage.setItem('schedule', JSON.stringify(scheduleCopy));

		//this is gonna be a makeRequest() when using REST
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

