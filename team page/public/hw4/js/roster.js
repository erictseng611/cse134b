window.addEventListener("DOMContentLoaded", function() {

	var roster = JSON.parse(localStorage.getItem('roster'));
	var rosterContainer = document.querySelector('#view');
	var userType = localStorage.getItem('userType');
	var team;

	if (!roster) {
		//console.log('there is nothing in local storage for roster so make a "network" request');
		makeRequest(null);
	} else {
		//console.log('render list using local browser data for now then make a network request to get updated items');
		var retrieved = localStorage.getItem('roster');
		team = JSON.parse(retrieved);
		renderRoster(team);
		//makeRequest(team);
	}

	if (userType === 'coach') {
		document.querySelector('#addPlayer-button').classList.remove('hidden');
	}

	document.querySelector('#returnTo-homePage').addEventListener('click', returnToHome);

	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('delete-button')) {
			deletePlayer(e);
		} else if (e.target.classList.contains('edit-button')) {
			editPlayer(e);
		} else if (e.target.classList.contains('save-button')) {
			savePlayer(e);
		} else if (e.target.classList.contains('player-card')) {
			renderPlayerProfile(e);
		} else if (e.target.id === 'returnToPlayers-button') {
			returnToPlayers();
		}
	});

	function returnToHome() {
		window.location.href = "./homepage.html";
	}

	function renderRoster(team) {
		let t = document.getElementById('roster-view');
		let markup = team.map(player => `<figure class="player-card" id="${player.name}" onclick="">
		<img src="${player.img}" class="inline_block" alt="player headshot">
		<figcaption class="inline_block">
		<p class="inline_block">${player.name}</p><span> #${player.number}</span>
		<p> ${player.position} </p>
		<button class="delete-button hidden" data-player="${player.name}" data-number="${player.number}">Delete</button>
		<button class="inline_block edit-button hidden" data-player="${player.name}" data-number="${player.number}"> Edit </button>
		</figcaption>
		</figure>`).join('');
		t.content.querySelector('#player-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		rosterContainer.appendChild(clonedTemplate);
		if (userType === "coach") {
			var actionButtons = Array.from(rosterContainer.getElementsByTagName('button'));
			actionButtons.forEach(button => {
				button.classList.remove('hidden')
			});
		}
	}

	function deletePlayer(e) {
		if (userType === "coach") {
			var finder = e.target.dataset.player;
			var el = document.getElementById(finder);
			el.parentNode.removeChild(el);

			//perform get request when using REST
			let rosterCopy = JSON.parse(localStorage.getItem('roster'));
			var result = rosterCopy.filter(function(player) {
				if (player.name !== e.target.dataset.player || player.number.toString() !== e.target.dataset.number) {
					return true;
				} else {
					return false;
				}
			});
			console.log(result);
			// perform post request when using REST
			localStorage.setItem('roster', JSON.stringify(result));
		}
	}

	function editPlayer(e) {
		if (userType === "coach") {

			let rosterContainer = document.getElementById('roster');

			//perform get request when using REST
			let rosterCopy = JSON.parse(localStorage.getItem('roster'));

			// get the player based on the name and number
			var result = rosterCopy.filter(function(player) {
				if (player.name !== e.target.dataset.player || player.number.toString() !== e.target.dataset.number) {
					return false;
				} else {
					return true;
				}
			})[0];

			let t = document.getElementById('update-view');
			let markup = `<label>Player<input name="name" data-player="${result.name}" value="${result.name}"></label>
<label>Number<input name="number" data-number="${result.number}" value="${result.number}"></label>
<label>Position<input name="position" data-position="${result.position}" value="${result.position}"></label>
<button class="save-button"> save </button>`;
			t.innerHTML = markup;
			rosterContainer.classList.add('hidden');
			t.classList.remove('hidden');
		}
	}

	function savePlayer() {

		if (userType === "coach") {
			var rosterContainer = document.getElementById('roster');
			var playerlist = document.getElementById('player-list');
			let t = document.getElementById('update-view');
			var inputs = document.getElementsByTagName('input');

			//perform get request when using REST
			let rosterCopy = JSON.parse(localStorage.getItem('roster'));

			// get the player based on the name and number
			var result = rosterCopy.filter(function(player) {
				// console.log(player.name, e.target.dataset.player);
				// console.log(player.number.toString(), e.target.dataset.number);
				if (player.name !== inputs.name.dataset.player || player.number.toString() !== inputs.number.dataset.number) {
					return false;
				} else {
					return true;
				}
			})[0];

			result.name = inputs.name.value;
			result.number = inputs.number.value;
			result.position = inputs.position.value;

			localStorage.setItem('roster', JSON.stringify(rosterCopy));
			while (playerlist.firstChild) {
				playerlist.removeChild(playerlist.firstChild);
			}
			renderRoster(rosterCopy);
			rosterContainer.classList.remove('hidden');
			t.classList.add('hidden');
		}
	}

	function renderPlayerProfile(e) {
		var roster = document.querySelector('#roster');
		var playerProfile = document.querySelector('#playerProfile-view');
		roster.classList.add('hidden');

		//perform get request when using REST
		let rosterCopy = JSON.parse(localStorage.getItem('roster'));
		var currPlayer;
		rosterCopy.forEach(player => {
			if (player.name === e.target.id) {
				currPlayer = player;
			}
		});

		let markup = `<button id="returnToPlayers-button"> Back to Players </button>
						<div class="text_align_center">
							<figure class="player-figure text_align_center">
							<img src=${currPlayer.img} class="player-profile-pic" alt="profile pic">
							<figcaption class="text_align_center no_margin">
							<h1> ${currPlayer.name} #${currPlayer.number}</h1>
							<h2 class="no_margin"> ${currPlayer.position} </h2>
							</figcaption>
							</figure>
							<div class="player-stats">
							<div class="margin_center">
							<p> Goals: ${currPlayer.goals} </p>
							<p> Fouls: ${currPlayer.fouls} </p>
							<p> Yellow Cards: ${currPlayer.yellowCards} </p>
							<p> Red Cards: ${currPlayer.redCards} </p>
							<p> Shots on Goal: ${currPlayer.shotsOnGoal} </p>
							<p> Corner Kicks: ${currPlayer.cornerKicks} </p>
							<p> Goal Kicks: ${currPlayer.goalKicks} </p>
							</div>
							</div>
						</div>`;
		playerProfile.innerHTML = markup;
		playerProfile.classList.remove('hidden');
	}

	function returnToPlayers() {
		var roster = document.querySelector('#roster');
		var playerProfile = document.querySelector('#playerProfile-view');
		roster.classList.remove('hidden');
		playerProfile.classList.add('hidden');
		while (playerProfile.firstChild) {
			playerProfile.removeChild(playerProfile.firstChild);
		}
	}


	function makeRequest(compare) {
		loadJSON(function(response) {

			let currentTeam = localStorage.getItem('currentTeam');
			var jsonresponse = JSON.parse(response);
			roster = jsonresponse.teams[currentTeam].roster;

			//set item with key and value pair and then render
			localStorage.setItem('roster', JSON.stringify(roster));

			// now that there is something on screen, make a request and update the container if local and request data differs
			// make sure schedule container is empty
			if (JSON.stringify(roster) !== JSON.stringify(compare)) {
				//console.log('local and request different');
				while (rosterContainer.firstChild) {
					//console.log('remove children');
					rosterContainer.removeChild(rosterContainer.firstChild);
				}
				renderRoster(roster);
			}
		});
	}


	function loadJSON(callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', '../json/teams.json', true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				// .open will NOT return a value but simply returns undefined in async mode so use a callback
				callback(xobj.responseText);
			}
		}
		xobj.send(null);
	}
});