window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#signOut-button').addEventListener('click', signOut);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('../sw.js').then(function(registration) {
                console.log('service worker reg was sucessful', registration.scope);
            })
        }, function(err) {
            console.log('service worker failed');
        });
    }

    var teamName;

    // set the returned data into the tags

    // var logoSrc = JSON.parse(localStorage.getItem('logo'));
    // var teamName = JSON.parse(localStorage.getItem('team'));
    // if (!logoSrc) {
    //     var team = firebase.database().ref('teams/' + 'Tritons');
    //     team.on('value', function(snapshot) {
    //         document.querySelector('#logo').src = snapshot.val().logo;
    //         document.querySelector('#team_name').innerText = snapshot.val().name;
    //         localStorage.setItem('logo', JSON.stringify(snapshot.val().logo));
    //         localStorage.setItem('team', JSON.stringify(snapshot.val().name));
    //     });
    // }
    // else{
    //     document.querySelector('#logo').src = logoSrc;
    //     document.querySelector('#team_name').innerText = teamName;

    // }

    function signOut() {
        localStorage.clear();
        firebase.auth().signOut();
        window.location.href = "../index.html";
    }
});