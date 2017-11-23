window.addEventListener("DOMContentLoaded", function(event) {
	const signUpButton = document.getElementById('signUp-button');

	var inputs = document.getElementsByTagName('input');

	inputs.inviteCode.addEventListener('input', teamLookUp);
	signUpButton.addEventListener('click', makeRequest);

	function teamLookUp(e){
		console.log('searching ' + e.target.value);
		//do something here that searches for a team code which will display team name and logo
	}


	function checkPassword(){
		if(inputs.password.value === inputs.confirmPassword.value){
			return true;
		} else{
			inputs.password.style.border = "2px solid red";
			inputs.confirmPassword.style.border = "2px solid red";
		}
	}

	function checkEmptyInput(arr){
		console.log('checking for empty inputs');
		var isFilled = true;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].value === ""){
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}
		return isFilled;
	}
	function submitInfo(users, teams){
		if(checkEmptyInput(inputs) && checkPassword()){
			var inviteCode = inputs.inviteCode.value;
			var email = inputs.email.value;
			var username = inputs.username.value;
			var password = inputs.password.value;

			//grab the team name from the team invite code
			var teamName;
			for(team in teams){
				var currTeamInv = teams[team].inviteCode;
				if(currTeamInv === inviteCode){
					teamName = team;
				}
			}


			if(!users[username]){
				users[username] = username;
				users[username] = {
					"password": password,
					"team": teamName,
					"userType": "fan",
				};

				// going into local
				localStorage.setItem('userType', 'fan');
				localStorage.setItem('currentTeam', teamName);

				// going to be a post request 
				localStorage.setItem('users', JSON.stringify(users));
				
				window.location.href = "./homepage.html";
			} else {
				console.error('this user already exists');
			}
		} 
	}

	// get the list of users 
	function makeRequest(e){
		e.preventDefault();
		loadJSON(function(response) {
		    jsonresponse = JSON.parse(response);
		    submitInfo(jsonresponse.users, jsonresponse.teams);
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

});