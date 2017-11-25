window.addEventListener("DOMContentLoaded", function() {
	const logInButton = document.getElementById('logIn-button');
	const newUserButton = document.getElementById('newUser-button');
	const logInInput = document.getElementById('logIn-input');
	const passwordInput = document.getElementById('password-input')

	logInButton.addEventListener('click', makeRequest);
	newUserButton.addEventListener('click', createNewUser);

	/*fake authenticate users. 
	Username: coach
	Password: coach

	Username: player
	Password: player

	Username: fan
	Password: fan
	*/
	function authenticateUser(users) {
		var inputtedUsername = logInInput.value;
		var inputtedPassword = passwordInput.value;

		var user = users[inputtedUsername];

		if (!user) {
			//console.log('this user doesnt exist');
			logInInput.style.border = "2px solid red";
			return;
		} else if (user.password === inputtedPassword) {
			//console.log('log in successful');
			localStorage.setItem('currentTeam', user.team);
			localStorage.setItem('userType', user.userType);
			window.location.href = './html/homepage.html';
		} else {
			logInInput.style.border = "2px solid red";
			passwordInput.style.border = "2px solid red";
			//console.log('user/pw authentication failed');
		}
	}

	function createNewUser() {
		window.location.href = "./html/createAcc.html";
	}

	// get the list of users 
	function makeRequest(e) {
		e.preventDefault();
		loadJSON(function(response) {
			var jsonresponse = JSON.parse(response);
			var users = jsonresponse.users;
			authenticateUser(users);
		});
	}

	function loadJSON(callback) {

		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");

		// when using network, change the json file to a REST endpoint
		xobj.open('GET', './json/teams.json', true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		}
		xobj.send(null);
	}

});