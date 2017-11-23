window.addEventListener("DOMContentLoaded", function(event) {
	const uploadLogo = document.getElementById('uploadLogo');
	const signUpButton = document.getElementById('signUp-button');
	var curFile;

	var inputs = document.getElementsByTagName('input');

	const teamLogoContainer = document.querySelector('.team-logo');
	uploadLogo.addEventListener('change', previewLogo);
	signUpButton.addEventListener('click', makeRequest);




	function previewLogo(){
		curFile = uploadLogo.files;
		var logo = document.createElement('img');
		logo.width = '400';
		console.log(uploadLogo.files[0]	);
		logo.src =  window.URL.createObjectURL(curFile[0]);
		teamLogoContainer.appendChild(logo);
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
				console.log('something is empty');
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}

		return isFilled;
	}

	function submitInfo(users, teams){
		if(checkEmptyInput(inputs) && checkPassword()){
			var teamName = inputs.teamName.value;
			var email = inputs.email.value;
			var username = inputs.username.value;
			var password = inputs.password.value;
			var logo = curFile[0];
			// do something here to create a new team and then redirect the team to their new
			// populated home page

			if(!users[username]){
				console.error('this user already exists');
				users[username] = username;
				users[username] = {
					"password": password,
					"team": teamName,
					"userType": "coach",
				};

				teams[teamName] = {
					"schedule": {},
					"roster": [],
					"logo": logo,
					"inviteCode": `${teamName}123`
				}

				// going into local
				localStorage.setItem('userType', 'coach');
				localStorage.setItem('currentTeam', teamName);

				// going to be a post request 
				localStorage.setItem('users', JSON.stringify(users));
				localStorage.setItem('teams', JSON.stringify(teams));
				
				window.location.href = "./homepage.html";
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