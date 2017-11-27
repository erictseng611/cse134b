window.addEventListener("DOMContentLoaded", function() {
	const uploadPhoto = document.getElementById('uploadPhoto');
	const nameInput = document.getElementById('playerName-input');
	const numberInput = document.getElementById('playerNumber-input');
	const positionInput = document.getElementById('playerPosition-input');
	const addPlayerButton = document.getElementById('addPlayer-button');

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
		photo.style.textAlign = "center";
		photo.src =  window.URL.createObjectURL(curFile[0]);
		playerContainer.appendChild(photo);
	}

	function checkEmptyInput(arr){
		var isFilled = true;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].value === ""){
				//console.log('something is empty');
				isFilled = false;
				arr[i].style.border = "2px solid red";
			}
		}

		return isFilled;
	}

	function submitInfo(e){
		e.preventDefault();
		var userType = localStorage.getItem('userType');
		if(userType === 'coach'){
			if(checkEmptyInput(inputs)){
				var name = nameInput.value;
				var number = numberInput.value;
				var position = positionInput.value;
				
				var imgCanvas = document.createElement("canvas");
				var imgContext = imgCanvas.getContext('2d');
				imgCanvas.height = photo.width;
				imgCanvas.width = photo.width;
				imgContext.drawImage(photo, 0, 0, photo.width, photo.width);

				var addedPlayer = {
					"name": name,
					"number": number,
					"position": position,
					"img": imgCanvas.toDataURL('image/png', .5),
					"goals": 0,
					"fouls": 0,
					"yellowCards": 0,
					"redCards": 0,
					"shotsOnGoal": 0,
					"cornerKicks": 0,
					"goalKicks": 0
				}

				//console.log(addedPlayer);

				roster.push(addedPlayer);
				localStorage.setItem('roster', JSON.stringify(roster));

				window.location.href = "./roster.html";
			} 
		} else{
			var container = document.querySelector('#add-player');
			while(container.firstChild){
				container.removeChild(container.firstChild);
			}
			container.innerHTML = "<h1> You don't have permission to add a player <h1>"
			;
		}
	}

	addPlayerButton.addEventListener('click', submitInfo);

});