window.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#signOut-button').addEventListener('click', signOut);

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    //console.log(user);

	    // load the team's logo and store into local storage

	  }
	});

	if('serviceWorker' in navigator){
		window.addEventListener('load', function(){
			navigator.serviceWorker.register('../sw.js').then(function(registration){
				console.log('service worker reg was sucessfull', registration.scope);
			})
		}, function(err){
			console.log('service worker failed');
		});
	}

	function signOut() {
		localStorage.clear();
		firebase.auth().signOut();
		window.location.href = "../index.html";
	}
});