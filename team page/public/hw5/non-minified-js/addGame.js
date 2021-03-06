window.addEventListener("DOMContentLoaded", function() {
    var userType = localStorage.getItem('userType');
    const signUpButton = document.getElementById('signUp-button');
    var inputs = document.getElementsByTagName('input');

    signUpButton.addEventListener('click', submitInfo);

    var teamName = localStorage.getItem('team');
    //remove the quotes from teamName
    teamName = teamName.replace(/\"/g, "");

    function submitInfo(e) {
        e.preventDefault();
        // temporary to allow all users to edit
        var userType = "coach";
        if (userType === 'coach' && checkEmptyInput(inputs)) {
            var location = inputs.location.value;
            var date = inputs.date.value.replace(/(^|-)0+/g, "$1");
            var time = inputs.time.value;
            var opponent = inputs.opponent.value;

            var addedGame = {
                "team1": teamName,
                "team2": opponent,
                "location": location,
                "date": date,
                "time": time,
                "team1Goals": 0,
                "team1Shots": 0,
                "team1Corners": 0,
                "team1GoalKicks": 0,
                "team1RedCards": 0,
                "team1YellowCards": 0,
                "team2Goals": 0,
                "team2Shots": 0,
                "team2Corners": 0,
                "team2GoalKicks": 0,
                "team2RedCards": 0,
                "team2YellowCards": 0,
                "events": []

            }
            var schedule = JSON.parse(localStorage.getItem('schedule'));
            // push the added game to the local storage schedule
            schedule.push(addedGame);
            //sets local browser storage for now, do a post on a rest endpoint when we get there
            localStorage.setItem('schedule', JSON.stringify(schedule));

            //update team when i get the chance
            var schedule = firebase.database().ref('teams/' + teamName + '/schedule');
            schedule.once('value')
                .then(function(snapshot) {
                    var length = snapshot.val().length;
                    firebase.database().ref('teams/' + teamName + `/schedule/${length}`).set(addedGame);
                    window.location.href = './schedule.html';
                });


        } else {
            // var container = document.querySelector('#addGame_container')
            // while (container.firstChild) {
            //     container.removeChild(container.firstChild);
            // }

            // container.innerHTML = "<h1> You don't have permission to add a game </h1>";
        }
    }

    function checkEmptyInput(arr) {
        //console.log('checking for empty inputs');
        var isFilled = true;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value === "") {
                //console.log('something is empty');
                isFilled = false;
                arr[i].style.border = "2px solid red";
            }
        }
        return isFilled;
    }

});