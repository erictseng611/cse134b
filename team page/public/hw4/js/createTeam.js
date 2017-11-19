window.addEventListener("DOMContentLoaded", function(event) {
	const teamNameInput = document.getElementById('teamName-input');
	const uploadLogo = document.getElementById('uploadLogo');
	const emailInput = document.getElementById('email-input');
	const usernameInput = document.getElementById('username-input');
	const passwordInput = document.getElementById('pw-input');
	const confirmPasswordInput = document.getElementById('confirmpw-input');
	const signUpButton = document.getElementById('signUp-button');

	var inputs = document.getElementsByTagName('input');

	const teamLogoContainer = document.querySelector('.team-logo');
	uploadLogo.addEventListener('change', previewLogo);

	function previewLogo(){
		var curFile = uploadLogo.files;
		var logo = document.createElement('img');
		logo.width = '400';
		console.log(uploadLogo.files[0]	);
		logo.src =  window.URL.createObjectURL(curFile[0]);
		teamLogoContainer.appendChild(logo);
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
				console.log('something is empty');
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}

		return isFilled;
	}

	function submitInfo(e){
		e.preventDefault();
		if(checkEmptyInput(inputs) && checkPassword()){
			var teamName = teamNameInput.value;
			var email = emailInput.value;
			var username = usernameInput.value;
			var password = passwordInput.value;
			var logo = curFile[0];
			
			// do something here to create a new team and then redirect the team to their new
			// populated home page

			window.location.href = "./homepage.html";
		} 
	}

	signUpButton.addEventListener('click', submitInfo);



});