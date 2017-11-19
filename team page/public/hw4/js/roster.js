
window.addEventListener("DOMContentLoaded", function(event) {
	
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

	// Call to function with anonymous callback
	loadJSON(function(response) {
	    // Do Something with the response e.g.
	    jsonresponse = JSON.parse(response);

	    // Assuming json data is wrapped in square brackets as Drew suggests
	    var team = jsonresponse.team;
		let t = document.getElementById('roster-view');

		let markup = team.map(player =>	`<figure class="player-card" onclick="location.href='playerProfile.html'">
											<img src="${player.img}" class="inline_block" alt="player headshot">
											<figcaption class="inline_block">
												<p> ${player.name} </p>
												<p> ${player.position} </p>
												<p> Goals: ${player.goals} </p>
											</figcaption>
										</figure>`).join('');
		t.content.querySelector('#player-list').innerHTML = markup;
		let clonedTemplate = document.importNode(t.content, true);
		document.querySelector('#view').appendChild(clonedTemplate);
	});
});

