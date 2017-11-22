window.addEventListener("DOMContentLoaded", function(event) {
	const logInButton = document.getElementById('logIn-button');
	const newUserButton = document.getElementById('newUser-button');
	const form = document.querySelector('.login-form');
	const logInInput = document.getElementById('logIn-input');
	const passwordInput = document.getElementById('password-input')

	logInButton.addEventListener('click', authenticateUser);
	newUserButton.addEventListener('click', createNewUser);


	/*fake authenticate users. 
	Username: coach
	Password: coach

	Username: player
	Password: player

	Username: fan
	Password: fan
	*/
	function authenticateUser(e){
		e.preventDefault();
		if(logInInput.value === 'coach' && passwordInput.value ==='coach'){
			localStorage.setItem('userType', 'coach');
			localStorage.setItem('team', 'Tritons');
			window.location.href = './html/homepage.html';
		} else if(logInInput.value === "player" && passwordInput.value ==="player"){
			localStorage.setItem('userType', 'player');
			window.location.href = './html/homepage.html';
			localStorage.setItem('team', 'Tritons');
		} else if(logInInput.value === "fan" && passwordInput.value ==="fan"){
			localStorage.setItem('userType', 'fan');
			localStorage.setItem('team', 'Tritons');
			window.location.href = './html/homepage.html';
		}  else{
			logInInput.style.border = "2px solid red";
			passwordInput.style.border = "2px solid red";
			console.log('user/pw authentication failed');
		}
	};

	function createNewUser(){
		window.location.href = "./html/createAcc.html";
	};

});