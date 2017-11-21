
window.addEventListener("DOMContentLoaded", function(event) {
	const signUpButton = document.getElementById('signUp-button');

  var inputs = document.getElementsByTagName('input');

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
			var location = inputs.location.value;
			var date = inputs.date.value;
			var time = inputs.time.value;
		    var opponent = inputs.opponent.value;
		    window.location.href = "./schedule.html";		
		}
	}
	signUpButton.addEventListener('click', submitInfo);

});