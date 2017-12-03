window.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById('signUp-button');

    var inputs = document.getElementsByTagName('input');
    signUpButton.addEventListener('click', submitInfo);

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
                isFilled = false;
                arr[i].style.border = "2px solid red";
            }
        }
        return isFilled;
    }

    function submitInfo(e) {
        e.preventDefault();

        if (checkEmptyInput(inputs) && checkPassword()) {
            //var inviteCode = inputs.inviteCode.value;
            var email = inputs.email.value;
            var password = inputs.password.value;

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode, errorMessage);
            });

            //grab the team name from the team invite code
            // var teamName;
            // for (var team in teams) {
            //  var currTeamInv = teams[team].inviteCode;
            //  if (currTeamInv === inviteCode) {
            //      teamName = team;
            //  }
            // }

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //SET THE ROLE TO THIS USER IS A FAN IN THE DATABASE
                    writeUserData(email, user.uid, 'fan');

                    // going into local
                    localStorage.setItem('userType', 'fan');
                    window.location.href = './homepage.html';
                    //localStorage.setItem('currentTeam', teamName);

                } else {

                }
            });

        }
    }

    function writeUserData(email, uid, userType) {
        firebase.database().ref('users/' + uid).set({
                email: email,
                userType: userType
            })
            .then(function() {
                window.location.href = "./homepage.html";
            });
    }
});