
window.addEventListener("DOMContentLoaded", function(event) {

	var roster = localStorage.getItem('roster');
	var team;
	var rosterContainer = document.querySelector('#view');


	if(!roster){
		console.log('there is nothing in local storage for roster so make a "network" request');
		makeRequest(null);
	} else{
		console.log('render list using local browser data for now then make a network request to get updated items');
		var retrieved = localStorage.getItem('roster');
		team = JSON.parse(retrieved);
		renderRoster(team);
		makeRequest(team);
	}

	function renderRoster(team){
		let t = document.getElementById('roster-view');
		let markup = team.map(player =>	`<figure class="player-card" onclick="location.href='playerProfile.html'">
											<img src="${player.img}" class="inline_block" alt="player headshot">
											<figcaption class="inline_block">
												<p> ${player.name} #${player.number}</p>
												<p> ${player.position} </p>
												<p> Goals: ${player.goals} </p>
											</figcaption>
										</figure>`).join('');
		t.content.querySelector('#player-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		rosterContainer.appendChild(clonedTemplate);
	}

	function makeRequest(compare){
		loadJSON(function(response) {

		    jsonresponse = JSON.parse(response);
		    team = jsonresponse.team;
		    //set item with key and value pair and then render
		    localStorage.setItem('roster', JSON.stringify(team));

		    // now that there is something on screen, make a request and update the container if local and request data differs
		    // make sure schedule container is empty
		    if(JSON.stringify(team) !== JSON.stringify(compare)){
		    	console.log('local and request different');
		    	while(rosterContainer.firstChild){
		    		console.log('remove children');
		    		rosterContainer.removeChild(rosterContainer.firstChild);
		    	}
		    	renderRoster(team);
			}
		});
	}


	function loadJSON(callback) {
	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', '../json/team.json', true);
	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            // .open will NOT return a value but simply returns undefined in async mode so use a callback
	            callback(xobj.responseText);
	        }
	    }
	    xobj.send(null);
	}
});

