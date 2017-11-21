window.addEventListener("DOMContentLoaded", function(event) {
	const playerNumberInput = document.getElementById('playerNumber-input');
	const eventInput = document.getElementById('event-type-selection');
	const addEventButton = document.getElementById('addEvent-button');
	console.log(playerNumberInput);
	console.log(eventInput);

	function submitEvent(e){
		e.preventDefault();
		var player = playerNumberInput.value;
		var event = eventInput.value;
		console.log(player, event);

		//do something with this data
		
	}

	addEventButton.addEventListener('click', submitEvent);
	
});
	