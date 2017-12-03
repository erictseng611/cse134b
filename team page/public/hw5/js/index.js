window.addEventListener("DOMContentLoaded", function() {

    if('serviceWorker' in navigator){
        window.addEventListener('load', function(){
            navigator.serviceWorker.register('./workbox-sw.prod.v2.1.2.js').then(function(registration){
                console.log('service worker reg was sucessfull');
            })
        }, function(err){
            console.log('service worker failed');
        });
    }

    const logInButton = document.getElementById('logIn-button');
    const newUserButton = document.getElementById('newUser-button');
    const logInInput = document.getElementById('logIn-input');
    const passwordInput = document.getElementById('password-input')

    logInButton.addEventListener('click', authenticateUser);
    newUserButton.addEventListener('click', createNewUser);

    function authenticateUser(e) {
        e.preventDefault();

        //make sure no user is signed in
        firebase.auth().signOut();
        var email = logInInput.value;
        var password = passwordInput.value;

        /*
        email: etseng@ucsd.edu
        pw: cse134b
        */


        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
        });

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // if user successfully logs in redirect user to the homepage
                window.location.href = './html/homepage.html';
            }
        });


    }

    function createNewUser() {
        window.location.href = "./html/createAcc.html";
    }

});