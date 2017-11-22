window.addEventListener("DOMContentLoaded", function(event) {

	var games = localStorage.getItem('schedule');
	var schedule;
	var scheduleContainer = document.querySelector('#view');
	var userType = localStorage.getItem('userType');

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

	var backToScheduleButton = document.querySelector('#returnToSchedule-button')

	document.addEventListener('click', function(e){
		if(e.target.classList.contains('delete-button')){
			deleteGame(e);
		} else if (e.target.classList.contains('edit-button')){
			editGame(e);
		} else if(e.target.classList.contains('save-button')){
			saveGame(e);
		} else if(e.target.classList.contains('large_button')){
			renderGamePage(e);
		} else if(e.target.id === 'returnToSchedule-button'){
			returnToSchedule();
		}
	});

	// only allow addition of games if coach
	if(userType === "coach"){
		document.querySelector('#addGame-button').classList.remove('hidden');
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
		let t = document.getElementById('schedule-view');
		let markup = schedule.map(game =>`<div class="large_button" id="${game.date}" data-date="${game.date}" data-opponent="${game.team2}">
											<span>${game.date} </span><span>${game.team1}</span> vs. <span>${game.team2}</span> <br>
											<button class="delete-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> delete </button>
											<button class="edit-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> edit </button>
											<button class="hidden save-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> save </button>
											</div>`).join('');
		t.content.querySelector('#schedule-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		scheduleContainer.appendChild(clonedTemplate);

		if(userType === "coach"){
			// collect buttons and turn it into an array
			var actionButtons = Array.from(scheduleContainer.getElementsByTagName('button'));
			actionButtons.forEach(button => {button.classList.remove('hidden')});
		}
	}

	function deleteGame(e){

		if(userType === 'coach'){

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
		} else{
			//do nothing, user doesn't have permissions
		}
	}

	function editGame(e){

		if(userType === 'coach'){
			var gameContainer = e.target.parentNode;
			console.log(gameContainer);
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
	}

	function saveGame(e){

		if(userType === 'coach'){
			//perform get request when using REST
			let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));

			var gameContainer = e.target.parentNode.parentNode;
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
			scheduleCopy.forEach(game =>{
				if(game.date === e.target.dataset.date){
					console.log('run');
					game.date = newDate;
					game.team2 = newOpponent;
				}
			});
			// perform post when using REST endpoint
			localStorage.setItem('schedule', JSON.stringify(scheduleCopy));
		}

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

	function renderGamePage(e){
		//hide the schedule container
		var schedule = document.querySelector('.schedule');
		var gamePage = document.getElementById('gamePage-view');

		schedule.classList.add('remove');
		//perform get request when using REST
		//should only return an array with the 1 game with the fit date and opponent
		let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
		var currentGame = scheduleCopy.filter(function(game){
			if(game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent){
				return false;
			} else{
				return true;
			}
		})[0];

		let markup = `<main class="margin_center">
						<button id="returnToSchedule-button"> Return to Schedule </button>
						<div class="live-game-info text_align_center">
							<h1 class="no_margin"> ${currentGame.date} </h1>
							<h3 class="no_margin"> ${currentGame.location} </h3>
						</div>
						<div class="live-game-teams">
							<div class="live-game-team">
								<h1 class="no_margin"> ${currentGame.team1}</h1>
							</div>
							<div id="live-game-vs">
								<p> vs. </p>
							</div>
							<div class="live-game-team">
								<h1 class="no_margin"> ${currentGame.team2} </h1>
							</div>
						</div>
						<div class="live-game-stats">
							<div class="live-game-stats-team">
								<div class="stat-container">
									<div class="stat-item">
										<h2> Goals: ${currentGame.team1Goals} </h2>
										<ul> 
											<li>Shots on Goal: ${currentGame.team1Shots}</li>
											<li>Corner Kicks: ${currentGame.team1Corners} </li>
											<li>Goal Kicks: ${currentGame.team1GoalKicks}</li>
										</ul>
									</div>
									<div class="stat-item">
										<h2> Cards </h2>
										<ul>
											<li> Yellow: ${currentGame.team1YellowCards} </li>
											<li> Red: ${currentGame.team1RedCards} </li>
										</ul>
									</div>
								</div>
							</div>
							<div class="live-game-stats-team">
								<div class="stat-container">
									<div class="stat-item">
										<h2> Goals: ${currentGame.team2Goals} </h2>
										<ul> 
											<li>Shots on Goal: ${currentGame.team2Shots}</li>
											<li>Corner Kicks: ${currentGame.team2Corners} </li>
											<li>Goal Kicks: ${currentGame.team2GoalKicks}</li>
										</ul>
									</div>
									<div class="stat-item">
										<h2> Cards </h2>
										<ul>
											<li> Yellow: ${currentGame.team2YellowCards} </li>
											<li> Red: ${currentGame.team2RedCards} </li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="event-feed-button button text_align_center">
							<a href="./eventFeed.html" class="button"><p>Event Feed </p></a>
						</div>
					</main>`;

		//insert html into the game page and display it
		gamePage.innerHTML = markup;
		gamePage.classList.remove('remove');
		};

		function returnToSchedule(){
			var gamePage = document.getElementById('gamePage-view');
			//show the schedule container
			var schedule = document.querySelector('.schedule');
			schedule.classList.remove('remove');
			while(gamePage.firstChild){
				gamePage.removeChild(gamePage.firstChild);
			}
		}


});


