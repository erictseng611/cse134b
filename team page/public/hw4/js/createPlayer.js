window.addEventListener("DOMContentLoaded", function() {
	const signUpButton = document.getElementById('signUp-button');

	var inputs = document.getElementsByTagName('input');

	signUpButton.addEventListener('click', makeRequest);


	function checkPassword() {
		if (inputs.password.value === inputs.confirmPassword.value) {
			return true;
		} else {
			inputs.password.style.border = "2px solid red";
			inputs.confirmPassword.style.border = "2px solid red";
		}
	}

	function checkEmptyInput(arr) {
		//console.log('checking for empty inputs');
		var isFilled = true;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].value === "") {
				//console.log('something is empty', arr[i]);
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}

		return isFilled;
	}

	function submitInfo(users, teams) {
		if (checkEmptyInput(inputs) && checkPassword()) {
			var inviteCode = inputs.inviteCode.value;
			//var email = inputs.email.value;
			var username = inputs.username.value;
			var password = inputs.password.value;

			//grab the team name from the team invite code
			var teamName;
			for (var team in teams) {
				var currTeamInv = teams[team].inviteCode;
				if (currTeamInv === inviteCode) {
					teamName = team;
				}
			}

			//if user does not exists already
			if (!users[username]) {
				users[username] = username;
				users[username] = {
					"password": password,
					"team": teamName,
					"userType": "player",
				};

				// going into local
				localStorage.setItem('userType', 'player');
				localStorage.setItem('currentTeam', teamName);

				// going to be a post request 
				localStorage.setItem('users', JSON.stringify(users));

				window.location.href = "./homepage.html";
			} else {
				//console.error('this user already exists');
			}
		}
	}

	// get the list of users 
	function makeRequest(e) {
		e.preventDefault();
		loadJSON(function(response) {
			var jsonresponse = JSON.parse(response);
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