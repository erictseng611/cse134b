window.addEventListener("DOMContentLoaded", function(event) {
	const logInButton = document.getElementById('logIn-button');
	const newUserButton = document.getElementById('newUser-button');
	const form = document.querySelector('.login-form');
	const logInInput = document.getElementById('logIn-input');
	const passwordInput = document.getElementById('password-input')

	logInButton.addEventListener('click', authenticateUser);
	newUserButton.addEventListener('click', createNewUser);


	/*fake authenticate users. 
	Username: cse134b 
	Password: cse134b
	*/
	function authenticateUser(e){
		e.preventDefault();
		if(logInInput.value === "cse134b" && passwordInput.value ==="cse134b"){
			console.log('yay, it logged in');
			window.location.href = './html/homepage.html';
		} else{
			logInInput.style.border = "2px solid red";
			passwordInput.style.border = "2px solid red";
			console.log('user/pw authentication failed');
		}
	};

	function createNewUser(){
		window.location.href = "./html/createAcc.html";
	};

});