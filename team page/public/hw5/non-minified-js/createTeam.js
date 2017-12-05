window.addEventListener("DOMContentLoaded", function() {
    const uploadLogo = document.getElementById('uploadLogo');
    const signUpButton = document.getElementById('signUp-button');
    var inputs = document.getElementsByTagName('input');


    var curFile;
    const teamLogoContainer = document.querySelector('.team-logo');

    uploadLogo.addEventListener('change', previewLogo);
    signUpButton.addEventListener('click', submitInfo);

    function previewLogo() {
        curFile = uploadLogo.files;
        var logo = document.createElement('img');
        logo.width = '400';
        //console.log(uploadLogo.files[0]);
        logo.src = window.URL.createObjectURL(curFile[0]);
        teamLogoContainer.appendChild(logo);
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
                //console.log('something is empty');
                isFilled = false;
                arr[i].style.border = "2px solid red";
            }
        }

        return isFilled;
    }

    function submitInfo(e) {
        e.preventDefault();

        //check for empty inputs and check for matching passwords
        if (checkEmptyInput(inputs) && checkPassword()) {
            var teamName = inputs.teamName.value;
            var email = inputs.email.value;
            var password = inputs.password.value;
            var logo = curFile[0];

            // create a new user
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode, errorMessage);
            });

            // if user login goes through
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {

                    // going into local
                    localStorage.setItem('userType', 'coach');
                    localStorage.setItem('team', teamName);

                    // create the new team in the database
                    // in the future: check that the existing team isn't already in use
                    writeTeamData(teamName, logo);

                    // create the new user in the database and set the role
                    writeUserData(email, user.uid, 'coach');

                } else {
                    console.log('not logged in');
                }
            });
        }
    }

    function writeTeamData(teamName, logo) {
        firebase.database().ref('teams/' + teamName).set({
            name: teamName,
            logo: logo,
            inviteCode: `${teamName}123`
        });
    }

    function writeUserData(email, uid, userType) {
        firebase.database().ref('users/' + uid).set({
            email: email,
            userType: userType
        })

        //redirect users to homepage AFTER finished writing to db
        .then(function(){
            window.location.href = "./homepage.html";
        });
    }


});