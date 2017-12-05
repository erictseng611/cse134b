window.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById('signUp-button');
    var inputs = document.getElementsByTagName('input');

    signUpButton.addEventListener('click', submitInfo);

    //make sure no user is signed in at this point
    firebase.auth().signOut();

    function submitInfo(e) {
        e.preventDefault();

        // check if inputs are filled and if passwords match
        if (checkEmptyInput(inputs) && checkPassword()) {
            var inviteCode = inputs.inviteCode.value;
            var email = inputs.email.value;
            var password = inputs.password.value;
            var teams;
            var teamName;

            var teamlist = firebase.database().ref('teams/');
            teamlist.once('value')
                .then(function(snapshot) {
                    console.log(snapshot.val());
                    teams = snapshot.val();
                    for (var team in teams) {
                        var currTeamInv = teams[team].inviteCode;
                        if (currTeamInv === inviteCode) {
                            teamName = team;
                        }
                    }

                    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorCode, errorMessage);
                    });
                });


            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //SET THE ROLE TO THIS USER AS A PLAYER IN THE DATABASE
                    writeUserData(email, user.uid, teamName, 'player');

                    // going into local
                    localStorage.setItem('userType', 'player');
                    localStorage.setItem('team', teamName);

                } else {
                    console.log('not logged in')
                }
            });
        }
    }

    function writeUserData(email, uid, teamName, userType) {
        firebase.database().ref('users/' + uid).set({
                email: email,
                team: teamName,
                userType: userType
            })
            .then(function() {
                window.location.href = "./homepage.html";
            });
    }

    function checkPassword() {
        if (inputs.password.value === inputs.confirmPassword.value) {
            return true;
        } else {
            inputs.password.style.border = "2px solid red";
            inputs.confirmPassword.style.border = "2px solid red";
        }
    }

    function checkEmptyInput(arr) {
        //console.log('checking for empty inputs');
        var isFilled = true;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value === "") {
                //console.log('something is empty', arr[i]);
                isFilled = false;
                arr[i].style.border = "2px solid red";
            }
        }

        return isFilled;
    }



});