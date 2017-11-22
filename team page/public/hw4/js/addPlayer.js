window.addEventListener("DOMContentLoaded", function(event) {
	const uploadPhoto = document.getElementById('uploadPhoto');
	const nameInput = document.getElementById('playerName-input');
	const numberInput = document.getElementById('playerNumber-input');
	const positionInput = document.getElementById('playerPosition-input');
	const addPlayerButton = document.getElementById('addPlayer-button');

	var userType = localStorage.getItem('userType');

	var inputs = document.getElementsByTagName('input');

	var curFile;
	var photo;
	const playerContainer = document.querySelector('#player-photo');
	uploadPhoto.addEventListener('change', previewPlayer);


	// retrieve from local storage from now, update when using REST
	var roster = JSON.parse(localStorage.getItem('roster'));

	function previewPlayer(){
		curFile = uploadPhoto.files;
		photo = document.createElement('img');
		photo.width = '200';
		photo.style.textAlign = "center";
		// photo.src =  window.URL.createObjectURL(curFile[0]);
		photo.src = '../images/soccerplayer.png';
		playerContainer.appendChild(photo);
	}

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
				var name = nameInput.value;
				var number = numberInput.value;
				var position = positionInput.value;
				//photo = 
				
				// do something here to create a new team and then redirect the team to their new
				// populated home page

				var addedPlayer = {
					"name": name,
					"number": number,
					"position": position,
					"img": '../images/soccerplayer.png'
				}

				console.log(addedPlayer);

				roster.push(addedPlayer);
				localStorage.setItem('roster', JSON.stringify(roster));

				window.location.href = "./roster.html";
			} 
		} else{
			var container = document.querySelector('#add-player');
			while(container.firstChild){
				container.removeChild(container.firstChild);
			}
			container.innerHTML = "<h1> You don't have permission to add a player <h1>";
		}
	}

	addPlayerButton.addEventListener('click', submitInfo);

});