window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#signOut-button').addEventListener('click', signOut);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('../sw.js').then(function(registration) {
                console.log('service worker reg was sucessfull', registration.scope);
            })
        }, function(err) {
            console.log('service worker failed');
        });
    }

    var teamName;

    // set the returned data into the tags
    var team = firebase.database().ref('teams/' + 'Tritons');
    team.on('value', function(snapshot) {
        document.querySelector('#logo').src = snapshot.val().logo;
        document.querySelector('#team_name').innerText = snapshot.val().name;
    });

    function signOut() {
        localStorage.clear();
        firebase.auth().signOut();
        window.location.href = "../index.html";
    }
});