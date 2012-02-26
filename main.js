// create namespace objects
if (typeof board == 'undefined') { board = {}; }
if (typeof player == 'undefined') { player = {}; }
if (typeof host == 'undefined') { host = {}; }
if (typeof printer == 'undefined') { printer = {}; }
if (typeof game == 'undefined') { game = {}; }
if (typeof cnst == 'undefined') { cnst = {}; }

/*
Note to Team: When coding and testing, make extensive use of console.log for debugging purposes.
Javascript can be a messy language and outputs to the console (hidden from browser view)
will make everyone's life easier.  Press Ctrl+Shift+J to display console in Chrome.
*******
The following function runs whenever the HTML document has fully loaded.
It is a JQuery function with an inline function call.  We use this
to call our initGame function, which initializes state variables.
*/  
$(document).ready( function(){	

	if( gapi.hangout.isApiReady() ) {
		initGame();
	} else {
		gapi.hangout.onApiReady.add(initGame);
	}
	console.log("You loaded the function");
	//board.setUpJQuery();
	// $("#answer").click( function() {
		// console.log("You clicked an answer...");
		// game.setState( cnst.SELECT );
	// });
});

function buzzOn(id){
	if(gapi.hangout.data.getValue("Buzzer") == "false" || game.isHost()){
		console.log("Bad Buzz - Ignoring");
	}
	else{
		console.log("Correct buzz from player: " + id);
		gapi.hangout.data.setValue("Buzzer", "false");
	}
};


//set up initial variables on game load 
function initGame() {
	console.log("Init func is being run.......");
	console.log("cnst.start is initially " + cnst.START );
	game.setState( cnst.START );
	board.setBoard();
	
	gapi.hangout.data.setValue("Buzzer", "false");
	
	//TODO: this was a proof of concept event handler for a state changed event
	//needs to be implemented below as a true function.  This is our main
	//loop, since it is run each time the game state changes, and must control the game flow.
	gapi.hangout.data.onStateChanged.add( function(event) {
		gameLoop();
	});
	
	
	//myHost = new Host();
}


function gameLoop() {
	var currentState = game.getState();
	console.log("RUNNING gameLoop.  State is currently " + currentState );
	printer.display(currentState);
	//console.log("score init: "  + gapi.hangout.data.getValue("Player1Score") );
	//console.log(myHost.id + " " + myHost.name );
}


