window.addEventListener("DOMContentLoaded", function() {

    var roster = JSON.parse(localStorage.getItem('roster'));
    var rosterContainer = document.querySelector('#view');
    var userType = localStorage.getItem('userType');
    var team;

    if (!roster) {
        //console.log('there is nothing in local storage for roster so make a network request');
        getRosterData(null);
    } else {
        //console.log('render list using local browser data for now then make a network request to get updated items');

        // get the roster data inside local storage
        var retrieved = localStorage.getItem('roster');
        team = JSON.parse(retrieved);

        // render the roster data first 
        renderRoster(team);

        // runs a check to see if the network roster is the same as the local storage. if they are different, update local and re-render
        getRosterData(team);
    }

    // later, retrieve the user type from the rest end point
    if (userType === 'coach') {
        document.querySelector('#addPlayer-button').classList.remove('hidden');
    }

    document.querySelector('#returnTo-homePage').addEventListener('click', returnToHome);

    // event listeners for dynamically created content
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
        let markup = team.map(player => {
            if (!player.archived) {
                return `<figure class="player-card" id="${player.name}" onclick="">
				<img src="${player.img}" class="inline_block" alt="player headshot">
				<figcaption class="inline_block">
				<p class="inline_block">${player.name}</p><span> #${player.number}</span>
				<p> ${player.position} </p>
				<button class="delete-button hidden" data-player="${player.name}" data-number="${player.number}">Delete</button>
				<button class="inline_block edit-button hidden" data-player="${player.name}" data-number="${player.number}"> Edit </button>
				</figcaption>
				</figure>`
            }
        }).join('');

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

            // first remove the player from the DOM on the client side
            var finder = e.target.dataset.player;
            var el = document.getElementById(finder);
            el.parentNode.removeChild(el);

            // update the local storage version of the copy
            let localRosterCopy = JSON.parse(localStorage.getItem('roster'));

            var playerIndex = findPlayerIndex(finder, parseInt(e.target.dataset.number), localRosterCopy);

            localRosterCopy[playerIndex].archived = "true";

            // perform post request when using REST
            localStorage.setItem('roster', JSON.stringify(localRosterCopy));

            // update the server version of the roster
            // Once teams are setup, change Tritons to the local storage of current team if there is one 
            firebase.database().ref('teams/' + 'Tritons' + '/roster/' + playerIndex + '/archived').set(true);
        }
    }

    function editPlayer(e) {
        if (userType === "coach") {

            let rosterContainer = document.getElementById('roster');

            // get the local storage copy of the roster
            let rosterCopy = JSON.parse(localStorage.getItem('roster'));

            // get the player based on the name and number
            var result = rosterCopy.find(function(player) {
                if (player.name === e.target.dataset.player && player.number.toString() === e.target.dataset.number) {
                    return true;
                }
            });

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

            const playerName = inputs.name.dataset.player;
            const playerNumber = parseInt(inputs.number.dataset.number);

            // get the local version of the roster to update local
            let rosterCopy = JSON.parse(localStorage.getItem('roster'));

            // get the player based on the name and number
            var index = findPlayerIndex(playerName, playerNumber, rosterCopy);
            rosterCopy[index].name = inputs.name.value;
            rosterCopy[index].number = parseInt(inputs.number.value);
            rosterCopy[index].position = inputs.position.value;

            localStorage.setItem('roster', JSON.stringify(rosterCopy));

            // blow out existing container
            playerlist.parentElement.removeChild(playerlist);
            renderRoster(rosterCopy);
            rosterContainer.classList.remove('hidden');
            t.classList.add('hidden');

            // update the server version of the roster
            // Once teams are setup, change Tritons to the local storage of current team if there is one 
            firebase.database().ref('teams/' + 'Tritons' + '/roster/' + index + '/name').set(inputs.name.value);
            firebase.database().ref('teams/' + 'Tritons' + '/roster/' + index + '/number').set(parseInt(inputs.number.value));
            firebase.database().ref('teams/' + 'Tritons' + '/roster/' + index + '/position').set(inputs.position.value);
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

    function getRosterData(compare) {
        // Once teams are setup, change Tritons to the local storage of current team if there is one 
        team = firebase.database().ref('teams/' + 'Tritons' + '/roster');
        team.on('value', function(snapshot) {
            localStorage.setItem('roster', JSON.stringify(snapshot.val()));

            if (compare !== team) {
                while (rosterContainer.firstChild) {
                    rosterContainer.removeChild(rosterContainer.firstChild);
                }
                renderRoster(snapshot.val());
            }
        });
    }

    function findPlayerIndex(playerName, playerNumber, roster) {
        var index = 9999;
        roster.forEach(function(player, i) {
            if (player.name === playerName && player.number === playerNumber) {
                index = i;
            }
        });
        return index;
    }

});