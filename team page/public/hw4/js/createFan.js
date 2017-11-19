window.addEventListener("DOMContentLoaded", function(event) {
	const teamCodeInput = document.getElementById('teamCode-input');
	const emailInput = document.getElementById('email-input');
	const usernameInput = document.getElementById('username-input');
	const passwordInput = document.getElementById('pw-input');
	const confirmPasswordInput = document.getElementById('confirmpw-input');
	const signUpButton = document.getElementById('signUp-button');

	var inputs = document.getElementsByTagName('input');

	teamCodeInput.addEventListener('input', teamLookUp);

	function teamLookUp(e){
		console.log('searching ' + e.target.value);
		//do something here that searches for a team code which will display team name and logo
	}


	function checkPassword(){
		if(passwordInput.value === confirmPasswordInput.value){
			return true;
		} else{
			passwordInput.style.border = "2px solid red";
			confirmPasswordInput.style.border = "2px solid red";
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

	function submitInfo(e){
		e.preventDefault();
		if(checkEmptyInput(inputs) && checkPassword()){
			var email = emailInput.value;
			var username = usernameInput.value;
			var password = passwordInput.value;
			
			// do something here to create a new fan and then redirect the team to their new
			// populated home page

			window.location.href = "./homepage.html";
		} 
	}

	signUpButton.addEventListener('click', submitInfo);



});