window.addEventListener("DOMContentLoaded", function() {

    var games = localStorage.getItem('schedule');
    var userType = localStorage.getItem('userType');
    var scheduleContainer = document.querySelector('#view');
    var mainGame;

    if (!games) {
        // console.log('there wasnt anything in local storage so make a fake network request to get data');
        getScheduleData(null);

    } else {
        // console.log('render list using local browser data for now then make a network request to get updated items');
        var retrieved = localStorage.getItem('schedule');
        var schedule = JSON.parse(retrieved);
        renderSchedule(schedule);

        getScheduleData(schedule);
    }

    document.querySelector('#returnTo-homepage').addEventListener('click', function() {
        window.location.href = "./homepage.html";
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-button')) {
            deleteGame(e);
        } else if (e.target.classList.contains('edit-button')) {
            editGame(e);
        } else if (e.target.classList.contains('save-button')) {
            saveGame(e);
        } else if (e.target.classList.contains('large_button')) {
            renderGamePage(e);
        } else if (e.target.id === 'returnToSchedule-button') {
            returnToSchedule(e);
        } else if (e.target.id === 'goEventFeed-button') {
            renderEventPage(e);
        } else if (e.target.id === 'addEvent-button') {
            addEvent(e);
        } else if (e.target.id === 'returnToGamePage-button') {
            returnToGamePage(e);
        }
    });

    // only allow addition of games if coach
    if (userType === "coach") {
        document.querySelector('#addGame-button').classList.remove('hidden');
    }

    function getScheduleData(compare) {

        // Once teams are setup, change Tritons to the local storage of current team if there is one 
        schedule = firebase.database().ref('teams/' + 'Tritons' + '/schedule');
        schedule.on('value', function(snapshot) {
            localStorage.setItem('schedule', JSON.stringify(snapshot.val()));

            if (compare !== schedule) {
                while (scheduleContainer.firstChild) {
                    scheduleContainer.removeChild(scheduleContainer.firstChild);
                }
                renderSchedule(snapshot.val());
            }
        });
    }

    function renderSchedule(schedule) {
        let t = document.getElementById('schedule-view');
        let markup = schedule.map(game => {
            if (!game.archived) {
                return `<div class="large_button" id="${game.date}" data-date="${game.date}" data-opponent="${game.team2}" onclick="">
				<span>${game.date} </span><span>${game.team1}</span> vs. <span>${game.team2}</span> <br>
				<button class="delete-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> delete </button>
				<button class="edit-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> edit </button>
				</div>`
            }
        }).join('');
        t.content.querySelector('#schedule-list').innerHTML = markup;
        let clonedTemplate = document.importNode(t.content, true);
        scheduleContainer.appendChild(clonedTemplate);

        if (userType === "coach") {
            // collect buttons and turn it into an array
            var actionButtons = Array.from(scheduleContainer.getElementsByTagName('button'));
            actionButtons.forEach(button => {
                button.classList.remove('hidden')
            });
        }
    }

    function deleteGame(e) {

        if (userType === 'coach') {

        	// first remove the DOM element on the client side
            var finder = e.target.dataset.date;
            var el = document.getElementById(finder);
            el.parentNode.removeChild(el);

            // get a copy of the local schedule to update local copy of schedule first
            let localScheduleCopy = JSON.parse(localStorage.getItem('schedule'));

            // find the index of the schedule
            var scheduleIndex = findScheduleIndex(finder, e.target.dataset.opponent, localScheduleCopy);

            // set the game to be deleted to archived = true so that it doesn't show up
            localScheduleCopy[scheduleIndex].archived = "true";

            // set the local storage item
            localStorage.setItem('schedule', JSON.stringify(localScheduleCopy));

            // make changes on the data base
            firebase.database().ref('teams/' + 'Tritons' + `/schedule/${scheduleIndex}/archived`).set(true);

        }
    }

    function editGame(e) {

        if (userType === 'coach') {

            var scheduleContainer = document.querySelector('.schedule');
            //perform get request when using REST
            let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
            var result = scheduleCopy.find(function(game) {
                if (game.date === e.target.dataset.date && game.team2 === e.target.dataset.opponent) {
                    return true;
                }
            });

            let t = document.getElementById('update-view');
            let markup = `<label>Date<input name="date" data-date="${result.date}" value="${result.date}"></label>
						  <label>Opponent<input name="team2" data-opponent="${result.team2}" value="${result.team2}"></label>
						  <button class="save-button"> save </button>`;
            t.innerHTML = markup;
            t.classList.remove('hidden');
            scheduleContainer.classList.add('hidden');
        }
    }

    function saveGame() {

        var scheduleContainer = document.querySelector('.schedule');
        var scheduleView = document.getElementById('view');
        let t = document.getElementById('update-view');
        var inputs = document.getElementsByTagName('input');

        // get the input fields of date and opponent
        var date = inputs.date.dataset.date;
        var opponent = inputs.team2.dataset.opponent;

        // get a local version of the schedule
        let localScheduleCopy = JSON.parse(localStorage.getItem('schedule'));

        // findt the index of the game we want to edit info for
        var index = findScheduleIndex(date, opponent, localScheduleCopy);

        // edit the local schedule copy with the inputted data
        localScheduleCopy[index].date = inputs.date.value;
        localScheduleCopy[index].team2 = inputs.team2.value;

        // store the new values back into the local storage
        localStorage.setItem('schedule', JSON.stringify(localScheduleCopy));

        // delete the existing stuff and add some new stuff in
        while (scheduleView.firstChild) {
            scheduleView.removeChild(scheduleView.firstChild);
        }

        renderSchedule(localScheduleCopy);
        t.classList.add('hidden');
        scheduleContainer.classList.remove('hidden');

        //make the changes to firebase
        firebase.database().ref('teams/' + 'Tritons' + `/schedule/${index}/date`).set(inputs.date.value);
        firebase.database().ref('teams/' + 'Tritons' + `/schedule/${index}/team2`).set(inputs.team2.value);
    }

    function renderGamePage(e) {
        //hide the schedule container
        var schedule = document.querySelector('.schedule');
        var gamePage = document.getElementById('gamePage-view');

        schedule.classList.add('hidden');
        //perform get request when using REST
        //should only return an array with the 1 game with the fit date and opponent
        let scheduleCopy = JSON.parse(localStorage.getItem('schedule'));
        var currentGame = scheduleCopy.filter(function(game) {
            if (game.date !== e.target.dataset.date || game.team2 !== e.target.dataset.opponent) {
                return false;
            } else {
                return true;
            }
        })[0];
        mainGame = currentGame;
        let markup = `<main class="margin_center">
						<button id="returnToSchedule-button" class="returnTo"> Return to Schedule </button>
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
						<button id="goEventFeed-button">Go To Event</button>
						</div>
					</main>`;

        //insert html into the game page and display it
        gamePage.innerHTML = markup;
        gamePage.classList.remove('hidden');

        // scroll back to the top of the screen
        window.scrollTo(0, 0);
    }

    function renderEventPage() {
        var gamePage = document.getElementById('gamePage-view');
        var eventPage = document.getElementById('eventPage-view');
        let markup = `<main class="margin_center">	<section class="add-event">
					<button id="returnToGamePage-button" class="returnTo" data-date="${mainGame.date}" data-opponent="${mainGame.team2}"> Return to Game Page </button>
					<h1> Add Event </h1>
					<form id="event-form">
						<select form="team-form" name="team-type" id="team-type-selection">
							<option value="${mainGame.team1}">${mainGame.team1}</option>
							<option value="${mainGame.team2}">${mainGame.team2}</option>
						</select>
						<select form="event-form" name="event-type" id="event-type-selection">
							<option value="Goal Attempt">Goal Attempt</option>
						  <option value="Goal">Goal</option>
							<option value="Foul">Foul</option>
							<option value="Goal Kick">Goal Kick</option>
							<option value="Corner Kick">Corner Kick</option>
							<option value="Yellow Card">Yellow Card</option>
							<option value="Red Card">Red Card</option>
						</select>
						<input type="number" name="playerNumber" placeholder="Enter Player #" id="playerNumber-input">
						<button class="form-button" type="submit" id="addEvent-button">Add Event</button>
						<section id="event-feed">
						</section>
					</form>
				</section>
				</main>`;
        eventPage.innerHTML = markup;
        gamePage.classList.add('hidden');
        eventPage.classList.remove('hidden');
        renderEventFeed(mainGame.events);
    }

    function addEvent(e) {
        e.preventDefault();
        const playerNumberInput = document.getElementById('playerNumber-input');
        const eventSelect = document.getElementById('event-type-selection');
        const teamSelect = document.getElementById('team-type-selection');
        const eventValue = eventSelect.options[eventSelect.selectedIndex].value;
        const teamValue = teamSelect.options[teamSelect.selectedIndex].value;
        const inputs = document.getElementsByTagName('input');
        let updatedStats = JSON.parse(localStorage.getItem('schedule'));
        let rosterData = JSON.parse(localStorage.getItem('roster'));
        let team;

        if (!checkEmptyInput(inputs)) {
            return false;
        }
        var newEvent = {
            "playerNumber": parseInt(playerNumberInput.value, 0),
            "event": eventValue,
            "team": teamValue
        };

        let playerIndex;
        var isTeamOne = (newEvent.team == mainGame.team1)
        // const playerData = rosterData.find((player, i) => {
        // 	playerIndex = i;
        // 	return player.number == playerNumberInput.value ? player : false;
        // });

        for (var i = 0; i < (Object.keys(updatedStats)).length; i++) {
            if ((updatedStats[i]).date == mainGame.date) {
                team = i;
                //if main team
                if (isTeamOne) {
                    if (eventValue == "Goal Attempt") {
                        updatedStats[i].team1Shots += 1;
                    } else if (eventValue == "Goal") {
                        updatedStats[i].team1Goals += 1;
                    } else if (eventValue == "Foul") {
                        updatedStats[i].team1Fouls += 1;
                    } else if (eventValue == "Goal Kick") {
                        updatedStats[i].team1GoalKicks += 1;
                    } else if (eventValue == "Corner Kick") {
                        updatedStats[i].team1Corners += 1;
                    } else if (eventValue == "Yellow Card") {
                        updatedStats[i].team1YellowCards += 1;
                    } else if (eventValue == "Red Card") {
                        updatedStats[i].team1RedCards += 1;
                    }
                } else if (!isTeamOne) {
                    if (eventValue == "Goal Attempt") {
                        updatedStats[i].team2Shots += 1;
                    } else if (eventValue == "Goal") {
                        updatedStats[i].team2Goals += 1;
                    } else if (eventValue == "Foul") {
                        updatedStats[i].team2Fouls += 1;
                    } else if (eventValue == "Goal Kick") {
                        updatedStats[i].team2GoalKicks += 1;
                    } else if (eventValue == "Corner Kick") {
                        updatedStats[i].team2Corners += 1;
                    } else if (eventValue == "Yellow Card") {
                        updatedStats[i].team2YellowCards += 1;
                    } else if (eventValue == "Red Card") {
                        updatedStats[i].team2RedCards += 1;
                    }
                }

                updatedStats[i].events.push(newEvent);

                rosterData[playerIndex] = {
                    ...playerData,
                    goals: isTeamOne ? updatedStats[i].team1Goals : updatedStats[i].team2Goals,
                    fouls: isTeamOne ? updatedStats[i].team1Fouls : updatedStats[i].team2Fouls,
                    shotsOnGoal: isTeamOne ? updatedStats[i].team1Shots : updatedStats[i].team2Shots,
                    yellowCards: isTeamOne ? updatedStats[i].team1YellowCards : updatedStats[i].team2YellowCards,
                    redCards: isTeamOne ? updatedStats[i].team1RedCards : updatedStats[i].team2RedCards,
                    goalKicks: isTeamOne ? updatedStats[i].team1GoalKicks : updatedStats[i].team2GoalKicks,
                    cornerKicks: isTeamOne ? updatedStats[i].team1Corners : updatedStats[i].team2Corners
                };
            }
        }

        localStorage.setItem('schedule', JSON.stringify(updatedStats));
        localStorage.setItem('roster', JSON.stringify(rosterData));
        renderEventPage();
        renderEventFeed(updatedStats[team].events);
    }


    function renderEventFeed(feed) {
        const feedContainer = document.getElementById("event-feed");
        const feedContent = feed.map(feedItem => `<p>${feedItem.team}: Player #${feedItem.playerNumber} ${feedItem.event}</p>`).join('');
        feedContainer.innerHTML = feedContent;
    }

    function checkEmptyInput(arr) {
        // console.log('checking for empty inputs');
        var isFilled = true;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value === "") {
                // console.log('something is empty');
                isFilled = false;
                arr[i].style.border = "2px solid red";
            }
        }
        return isFilled;
    }

    function returnToSchedule() {
        var gamePage = document.getElementById('gamePage-view');
        //show the schedule container
        var schedule = document.querySelector('.schedule');
        schedule.classList.remove('hidden');
        while (gamePage.firstChild) {
            gamePage.removeChild(gamePage.firstChild);
        }

    }

    function returnToGamePage(e) {
        var gamePage = document.getElementById('gamePage-view');
        var eventPage = document.getElementById('eventPage-view');
        // while (gamePage.firstChild) {
        // 	gamePage.removeChild(gamePage.firstChild);
        // }
        gamePage.innerHTML = "";
        eventPage.classList.add('hidden');
        renderGamePage(e);
    }

    function findScheduleIndex(date, opponent, schedule) {
        var index = 9999;
        schedule.forEach(function(game, i) {
            if (game.date === date && game.team2 === opponent) {
                index = i;
            }
        });
        return index;
    }
});