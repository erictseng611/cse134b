window.addEventListener("DOMContentLoaded", function(event) {
	document.querySelector('#signOut-button').addEventListener('click', signOut);

	// get the list of users 
	function makeRequest(){
		loadJSON(function(response) {
		    jsonresponse = JSON.parse(response);
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

	function signOut(){
		localStorage.clear();
		window.location.href = "../index.html";
	}
});