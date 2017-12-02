window.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#signOut-button').addEventListener('click', signOut);

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    //console.log(user);

	    // load the team's logo and store into local storage

	  }
	});

	function signOut() {
		localStorage.clear();
		firebase.auth().signOut();
		window.location.href = "../index.html";
	}
});