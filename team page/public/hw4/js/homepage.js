window.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#signOut-button').addEventListener('click', signOut);

	makeRequest();

	// get the list of users 
	function makeRequest() {
		loadJSON(function(response) {
			var jsonresponse = JSON.parse(response);
			var teamData = jsonresponse.teams;
			localStorage.setItem('teamData', JSON.stringify(teamData));
		});
	}

	function loadJSON(callback) {

		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");

		// when using network, change the json file to a REST endpoint
		xobj.open('GET', '../json/teams.json', true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		}
		xobj.send(null);
	}

	function signOut() {
		localStorage.clear();
		window.location.href = "../index.html";
	}
});