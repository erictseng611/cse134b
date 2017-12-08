window.addEventListener("DOMContentLoaded",function(){var teamName=localStorage.getItem("team");teamName=teamName.replace(/\"/g,"");var games=JSON.parse(localStorage.getItem("schedule"));var userType="coach";var scheduleContainer=document.querySelector("#view");var mainGame;if(!games){getScheduleData(null)}else{var retrieved=localStorage.getItem("schedule");var schedule=JSON.parse(retrieved);renderSchedule(schedule);getScheduleData(schedule)}document.querySelector("#returnTo-homepage").addEventListener("click",function(){window.location.href="./homepage.html"});document.addEventListener("click",function(e){if(e.target.classList.contains("delete-button")){deleteGame(e)}else if(e.target.classList.contains("edit-button")){editGame(e)}else if(e.target.classList.contains("save-button")){saveGame(e)}else if(e.target.classList.contains("large_button")){renderGamePage(e)}else if(e.target.id==="returnToSchedule-button"){returnToSchedule(e)}else if(e.target.id==="goEventFeed-button"){renderEventPage(e)}else if(e.target.id==="addEvent-button"){addEvent(e)}else if(e.target.id==="returnToGamePage-button"){returnToGamePage(e)}});if(userType==="coach"){document.querySelector("#addGame-button").classList.remove("hidden")}function getScheduleData(compare){console.log(teamName);schedule=firebase.database().ref("teams/"+teamName+"/schedule");schedule.on("value",function(snapshot){console.log(snapshot.val());localStorage.setItem("schedule",JSON.stringify(snapshot.val()));if(compare!==schedule){while(scheduleContainer.firstChild){scheduleContainer.removeChild(scheduleContainer.firstChild)}renderSchedule(snapshot.val())}})}function renderSchedule(schedule){let t=document.getElementById("schedule-view");let markup=schedule.map(game=>{if(!game.archived){return`<div class="large_button" id="${game.date}" data-date="${game.date}" data-opponent="${game.team2}" onclick="">\n                <span>${game.date} </span><span>${game.team1}</span> vs. <span>${game.team2}</span> <br>\n                <button class="delete-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> Delete </button>\n                <button class="edit-button hidden" data-date="${game.date}" data-opponent="${game.team2}"> Edit </button>\n                </div>`}}).join("");t.content.querySelector("#schedule-list").innerHTML=markup;let clonedTemplate=document.importNode(t.content,true);scheduleContainer.appendChild(clonedTemplate);if(userType==="coach"){var actionButtons=Array.from(scheduleContainer.getElementsByTagName("button"));actionButtons.forEach(button=>{button.classList.remove("hidden")})}}function deleteGame(e){if(userType==="coach"){var finder=e.target.dataset.date;var el=document.getElementById(finder);el.parentNode.removeChild(el);let localScheduleCopy=JSON.parse(localStorage.getItem("schedule"));var scheduleIndex=findScheduleIndex(finder,e.target.dataset.opponent,localScheduleCopy);localScheduleCopy[scheduleIndex].archived="true";localStorage.setItem("schedule",JSON.stringify(localScheduleCopy));firebase.database().ref("teams/"+teamName+`/schedule/${scheduleIndex}/archived`).set(true)}}function editGame(e){if(userType==="coach"){var scheduleContainer=document.querySelector(".schedule");let scheduleCopy=JSON.parse(localStorage.getItem("schedule"));var result=scheduleCopy.find(function(game){if(game.date===e.target.dataset.date&&game.team2===e.target.dataset.opponent){return true}});let t=document.getElementById("update-view");let markup=`<label>Date<input name="date" data-date="${result.date}" value="${result.date}"></label>\n                          <label>Opponent<input name="team2" data-opponent="${result.team2}" value="${result.team2}"></label>\n                          <button class="save-button"> Save </button>`;t.innerHTML=markup;t.classList.remove("hidden");scheduleContainer.classList.add("hidden")}}function saveGame(){var scheduleContainer=document.querySelector(".schedule");var scheduleView=document.getElementById("view");let t=document.getElementById("update-view");var inputs=document.getElementsByTagName("input");var date=inputs.date.dataset.date;var opponent=inputs.team2.dataset.opponent;let localScheduleCopy=JSON.parse(localStorage.getItem("schedule"));var index=findScheduleIndex(date,opponent,localScheduleCopy);localScheduleCopy[index].date=inputs.date.value;localScheduleCopy[index].team2=inputs.team2.value;localStorage.setItem("schedule",JSON.stringify(localScheduleCopy));while(scheduleView.firstChild){scheduleView.removeChild(scheduleView.firstChild)}renderSchedule(localScheduleCopy);t.classList.add("hidden");scheduleContainer.classList.remove("hidden");firebase.database().ref("teams/"+teamName+`/schedule/${index}/date`).set(inputs.date.value);firebase.database().ref("teams/"+teamName+`/schedule/${index}/team2`).set(inputs.team2.value)}function renderGamePage(e){var schedule=document.querySelector(".schedule");var gamePage=document.getElementById("gamePage-view");schedule.classList.add("hidden");let scheduleCopy=JSON.parse(localStorage.getItem("schedule"));var index=findScheduleIndex(e.target.dataset.date,e.target.dataset.opponent,scheduleCopy);var currentGame=scheduleCopy[index];mainGame=currentGame;let markup=`<main class="margin_center">\n                        <button id="returnToSchedule-button" class="returnTo"> Return to Schedule </button>\n                        <div class="live-game-info text_align_center">\n                            <h1 class="no_margin"> ${currentGame.date} </h1>\n                            <h3 class="no_margin"> ${currentGame.location} </h3>\n                        </div>\n                        <div class="live-game-teams">\n                            <div class="live-game-team">\n                                <h1 class="no_margin"> ${currentGame.team1}</h1>\n                            </div>\n                            <div id="live-game-vs">\n                                <p> vs. </p>\n                            </div>\n                            <div class="live-game-team">\n                                <h1 class="no_margin"> ${currentGame.team2} </h1>\n                            </div>\n                        </div>\n                        <div class="live-game-stats">\n                            <div class="live-game-stats-team">\n                                <div class="stat-container">\n                                    <div class="stat-item">\n                                        <h2> Goals: ${currentGame.team1Goals} </h2>\n                                        <ul>\n                                            <li>Shots on Goal: ${currentGame.team1Shots}</li>\n                                            <li>Corner Kicks: ${currentGame.team1Corners} </li>\n                                            <li>Goal Kicks: ${currentGame.team1GoalKicks}</li>\n                                        </ul>\n                                    </div>\n                                    <div class="stat-item">\n                                        <h2> Cards </h2>\n                                        <ul>\n                                            <li> Yellow: ${currentGame.team1YellowCards} </li>\n                                            <li> Red: ${currentGame.team1RedCards} </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="live-game-stats-team">\n                                <div class="stat-container">\n                                    <div class="stat-item">\n                                        <h2> Goals: ${currentGame.team2Goals} </h2>\n                                        <ul>\n                                            <li>Shots on Goal: ${currentGame.team2Shots}</li>\n                                            <li>Corner Kicks: ${currentGame.team2Corners} </li>\n                                            <li>Goal Kicks: ${currentGame.team2GoalKicks}</li>\n                                        </ul>\n                                    </div>\n                                    <div class="stat-item">\n                                        <h2> Cards </h2>\n                                        <ul>\n                                            <li> Yellow: ${currentGame.team2YellowCards} </li>\n                                            <li> Red: ${currentGame.team2RedCards} </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="event-feed-button button text_align_center">\n                        <button id="goEventFeed-button">Go To Event</button>\n                        </div>\n                    </main>`;gamePage.innerHTML=markup;gamePage.classList.remove("hidden");window.scrollTo(0,0)}function renderEventPage(){var gamePage=document.getElementById("gamePage-view");var eventPage=document.getElementById("eventPage-view");let markup=`<main class="margin_center">  <section class="add-event">\n                    <button id="returnToGamePage-button" class="returnTo" data-date="${mainGame.date}" data-opponent="${mainGame.team2}"> Return to Game Page </button>\n                    <h1> Add Event </h1>\n                    <form id="event-form">\n                        <select form="team-form" name="team-type" id="team-type-selection">\n                            <option value="${mainGame.team1}">${mainGame.team1}</option>\n                            <option value="${mainGame.team2}">${mainGame.team2}</option>\n                        </select>\n                        <select form="event-form" name="event-type" id="event-type-selection">\n                            <option value="Goal Attempt">Goal Attempt</option>\n                          <option value="Goal">Goal</option>\n                            <option value="Foul">Foul</option>\n                            <option value="Goal Kick">Goal Kick</option>\n                            <option value="Corner Kick">Corner Kick</option>\n                            <option value="Yellow Card">Yellow Card</option>\n                            <option value="Red Card">Red Card</option>\n                        </select>\n                        <input type="number" name="playerNumber" placeholder="Enter Player #" id="playerNumber-input">\n                        <button class="form-button" type="submit" id="addEvent-button">Add Event</button>\n                        <section id="event-feed">\n                        </section>\n                    </form>\n                </section>\n                </main>`;eventPage.innerHTML=markup;const feedList=document.getElementById("event-feed");let localScheduleCopy=JSON.parse(localStorage.getItem("schedule"));var index=findScheduleIndex(mainGame.date,mainGame.team2,localScheduleCopy);const dbRefObject=firebase.database().ref(`teams/${teamName}/schedule/${index}/events`);let t=document.getElementById("#event-feed");dbRefObject.on("child_added",function(snapshot){let event=snapshot.val();var el=document.createElement("p");el.innerHTML=`${event.team}: Player #${event.playerNumber} ${event.eventType}`;document.getElementById("event-feed").appendChild(el)});gamePage.classList.add("hidden");eventPage.classList.remove("hidden")}function addEvent(e){e.preventDefault();const playerNumberInput=document.getElementById("playerNumber-input");const eventSelect=document.getElementById("event-type-selection");const teamSelect=document.getElementById("team-type-selection");const eventValue=eventSelect.options[eventSelect.selectedIndex].value;const teamValue=teamSelect.options[teamSelect.selectedIndex].value;const inputs=document.getElementsByTagName("input");let updatedStats=JSON.parse(localStorage.getItem("schedule"));let rosterData=JSON.parse(localStorage.getItem("roster"));let team;if(!checkEmptyInput(inputs)){return false}var newEvent={playerNumber:parseInt(playerNumberInput.value,0),eventType:eventValue,team:"hello"};var gameIndex=findScheduleIndex(mainGame.date,mainGame.team2,updatedStats);var newGameKey=firebase.database().ref().child(`teams/${teamName}/schedule/${gameIndex}/events`).push().key;firebase.database().ref(`teams/${teamName}/schedule/${gameIndex}/events/${newGameKey}`).set(newEvent);const playerData=rosterData.find((player,i)=>{playerIndex=i;return player.number===parseInt(playerNumberInput.value)?player:false});var isTeamOne=newEvent.team===mainGame.team1;if(isTeamOne){if(eventValue=="Goal Attempt"){updatedStats[gameIndex].team1Shots+=1;rosterData[playerIndex].shotsOnGoal+=1}else if(eventValue=="Goal"){updatedStats[gameIndex].team1Goals+=1;rosterData[playerIndex].goals+=1}else if(eventValue=="Foul"){updatedStats[gameIndex].team1Fouls+=1;rosterData[playerIndex].fouls+=1}else if(eventValue=="Goal Kick"){updatedStats[gameIndex].team1GoalKicks+=1;rosterData[playerIndex].goalKicks+=1}else if(eventValue=="Corner Kick"){updatedStats[gameIndex].team1Corners+=1;rosterData[playerIndex].cornerKicks+=1}else if(eventValue=="Yellow Card"){updatedStats[gameIndex].team1YellowCards+=1;rosterData[playerIndex].yellowCards+=1}else if(eventValue=="Red Card"){updatedStats[gameIndex].team1RedCards+=1;rosterData[playerIndex].redCards+=1}}else if(!isTeamOne){if(eventValue=="Goal Attempt"){updatedStats[gameIndex].team2Shots+=1}else if(eventValue=="Goal"){updatedStats[gameIndex].team2Goals+=1}else if(eventValue=="Foul"){updatedStats[gameIndex].team2Fouls+=1}else if(eventValue=="Goal Kick"){updatedStats[gameIndex].team2GoalKicks+=1}else if(eventValue=="Corner Kick"){updatedStats[gameIndex].team2Corners+=1}else if(eventValue=="Yellow Card"){updatedStats[gameIndex].team2YellowCards+=1}else if(eventValue=="Red Card"){updatedStats[gameIndex].team2RedCards+=1}}firebase.database().ref(`teams/${teamName}/schedule/${gameIndex}`).update(updatedStats[gameIndex]);firebase.database().ref(`teams/${teamName}/roster/${playerIndex}`).update(rosterData[playerIndex]);localStorage.setItem("schedule",JSON.stringify(updatedStats));localStorage.setItem("roster",JSON.stringify(rosterData));renderEventPage()}function checkEmptyInput(arr){var isFilled=true;for(var i=0;i<arr.length;i++){if(arr[i].value===""){isFilled=false;arr[i].style.border="2px solid red"}}return isFilled}function returnToSchedule(){var gamePage=document.getElementById("gamePage-view");var schedule=document.querySelector(".schedule");schedule.classList.remove("hidden");while(gamePage.firstChild){gamePage.removeChild(gamePage.firstChild)}}function returnToGamePage(e){var gamePage=document.getElementById("gamePage-view");var eventPage=document.getElementById("eventPage-view");gamePage.innerHTML="";eventPage.classList.add("hidden");renderGamePage(e)}function findScheduleIndex(date,opponent,schedule){var index=9999;schedule.forEach(function(game,i){if(game.date===date&&game.team2===opponent){index=i}});return index}});