$(document).ready(function () {
	// console.log( "ready!" );

	// track which question we are on
	var questionCounter = 0;
	// initial time of 15 seconds for each question
	var time = 15;
	// will keep tally of right guesses for end game
	var correctGuesses = 0;
	//will keep tally of wrong guesses for end game
	var incorrectGuesses = 0;

	// question & answer array
	var questions = [
		{
			question: "Who is the only member of ZZ Top who does not have a beard?",
			choices: ["Black Beard", "Larry Beard", "Frank Beard", "Billy Gibbons"],
			correctAnswer: "Frank Beard",
			image: "<img src='assets/images/frankbeard.jpg' class='img-round shadow'>"
		},
		{
			question: "In the 70s who put a Message In A Bottle?",
			choices: ["Police", "U2", "The Kingsmen", "Frank Sinatra"],
			correctAnswer: "Police",
			image: "<img src='assets/images/police.jpg' class='img-square shadow'>"
		},
		{
			question: "Which group flew into the Hotel California?",
			choices: ["The B52s", "Eagles", "Earth Wind and Fire", "Jefferson Airplane"],
			correctAnswer: "Eagles",
			image: "<img src='assets/images/eagles.jpg' class='img-tiangle shadow'>"
		},
		{
			question: "What group Exited Stage Left after they stood in the Limelight?",
			choices: ["Billy Squire", "Blue Oyster Cult", "Rush", "Pink Floyd"],
			correctAnswer: "Rush",
			image: "<img src='assets/images/rush.jpg' class='img-circle shadow'>"

		}];


	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
		$("#gameScreen").append("<p><strong>" +
			questions[questionCounter].question +
			"</p><p class='choices'>" +
			questions[questionCounter].choices[0] +
			"</p><p class='choices'>" +
			questions[questionCounter].choices[1] +
			"</p><p class='choices'>" +
			questions[questionCounter].choices[2] +
			"</p><p class='choices'>" +
			questions[questionCounter].choices[3] +
			"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" +
			correctAnswer +
			"</span></p>" +
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Sorry, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The correct answer was <span class='answer'>" +
			correctAnswer +
			"</span></p>" +
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>Ah Shoot, you ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The correct answer was <span class='answer'>" +
				correctAnswer +
				"</span></p>" +
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Great Job! You are on top of it";
			var bottomText = "Rock ON!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good work! Keep them wheels turnin";
			var bottomText = "You gotta Have Faith";
		}
		else {
			var endMessage = "Your struggling";
			var bottomText = "Listen a little more";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
			correctGuesses + "</strong> right.</p>" +
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
		// console.log(questionCounter);
		// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

	function startGame() {
		$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
		$("#start").hide();


		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
		timer();
		userTimeout();
	}

	// this starts the game
	$("#start").click(nextQuestion);

	// click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function () {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});