window.addEventListener("DOMContentLoaded", function(event) {
	document.querySelector('#signOut-button').addEventListener('click', signOut);

	function signOut(){
		localStorage.clear();
		window.location.href = "../index.html";
	}
});