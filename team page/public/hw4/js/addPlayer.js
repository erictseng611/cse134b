window.addEventListener("DOMContentLoaded", function(event) {
	const uploadPhoto = document.getElementById('uploadPhoto');
	const nameInput = document.getElementById('playerName-input');
	const numberInput = document.getElementById('playerNumber-input');
	const positionInput = document.getElementById('playerPosition-input');
	const addPlayerButton = document.getElementById('addPlayer-button');

	var inputs = document.getElementsByTagName('input');

	var curFile;
	const playerContainer = document.querySelector('#player-photo');
	uploadPhoto.addEventListener('change', previewPlayer);

	function previewPlayer(){
		curFile = uploadPhoto.files;
		var photo = document.createElement('img');
		photo.width = '200';
		photo.style.textAlign = "center";
		photo.src =  window.URL.createObjectURL(curFile[0]);
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
		e.preventDefault();
		if(checkEmptyInput(inputs)){
			var name = nameInput.value;
			var number = numberInput.value;
			var position = positionInput.value;
			var photo = curFile[0];
			
			// do something here to create a new team and then redirect the team to their new
			// populated home page

			window.location.href = "./roster.html";
		} 
	}

	addPlayerButton.addEventListener('click', submitInfo);

});