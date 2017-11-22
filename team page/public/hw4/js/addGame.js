
window.addEventListener("DOMContentLoaded", function(event) {
	var userType = localStorage.getItem('userType');
	const signUpButton = document.getElementById('signUp-button');
	var schedule = JSON.parse(localStorage.getItem('schedule'));
	var inputs = document.getElementsByTagName('input');

	signUpButton.addEventListener('click', submitInfo);


	function checkEmptyInput(arr){
		console.log('checking for empty inputs');
		var isFilled = true;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].value === ""){
				console.log('something is empty');
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}
		return isFilled;
	}

	function submitInfo(e){
		if(userType === 'coach'){
			e.preventDefault();
			if(checkEmptyInput(inputs)){
				var location = inputs.location.value;
				var date = inputs.date.value.replace(/(^|-)0+/g, "$1");
				var time = inputs.time.value;
			    var opponent = inputs.opponent.value;

			    var addedGame = {
			    	"team1": "Tritons",
			    	"team2": opponent,
			    	"location": location,
			    	"date": date,
			    	"time": time
			    }

			    schedule.push(addedGame);

			    //sets local browser storage for now, do a post on a rest endpoint when we get there
			    localStorage.setItem('schedule', JSON.stringify(schedule));
			    window.location.href = "./schedule.html";		
			}
		} else{
			var container = document.querySelector('#addGame_container')
			while(container.firstChild){
				container.removeChild(container.firstChild);
			}

			container.innerHTML = "<h1> You don't have permission to add a game </h1>";
		}
	}

});