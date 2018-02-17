var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
"What does Pro. Lupin give Harry to eat after his encounter with a Dementor?",
"What is the symbol for Hufflepuff house?", 
"How many times was Nearly Headless Nick hit in the neck with a blunt axe?", 
"What secret name do Harry, Ron and Hermione use to refer to Sirius Black?", 
"How did Harry's parents die according to the Dursleys?", 
"In wizarding currency, how many Sickles are in a Galleon?", 
"How many brothers does Ron have?", 
"What creatures feed on positive human emotions?"
];

var answerArray = [
["Chocolate", "Boiled Sweets", "Sherbet", "Ice Cream"], 
["Eagle","Badger","Snake","Lion"], 
["47", "20", "45", "102"], 
["Scabbers","Griphook","Snuffles","Prongs"], 
["They were both very sick", "They were murdered", "Lost at sea", "In a car crash"], 
["17","5","13","21"], 
["4", "5", "7", "2"], 
["Grindylows","Mermaids","Boggarts","Dementor"]
];

var correctAnswers = [
"A. Chocolate", 
"B. Badger", 
"C. 45", 
"C. Snuffles", 
"D. In a car crash", 
"A. 17", 
"B. 5", 
"D. Dementor"
];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;



$(document).ready(function() {
// A function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p><a class='btn-primary' href='#' role='button'><strong>Start Exam</strong></a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".btn-primary", function(event){
	event.preventDefault(); 
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = 
		"<p class='timer-p'>Time Remaining: <span class='timer'>" 
		+ counter + 
		"</span></p>" + 
		"<p class='rightOrWrong'>You ran out of time!  The correct answer was: " 
		+ correctAnswers[questionCounter] + 
		"</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = 
		"<p class='timer-p'>Time Remaining: <span class='timer'>" 
		+ counter + 
		"</span></p>" + 
		"<p class='rightOrWrong'>Correct! The answer is: " 
		+ correctAnswers[questionCounter] + 
		"</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = 
		"<p class='timer-p'>Time Remaining: <span class='timer'>" 
		+ counter + 
		"</span></p>" + 
		"<p class='rightOrWrong'>Wrong! The correct answer is: " 
		+ correctAnswers[questionCounter] + 
		"</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = 
	"<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" 
	+ questionArray[questionCounter] + 
	"</p><p class='first-answer answer'>A. " 
	+ answerArray[questionCounter][0] + 
	"</p><p class='answer'>B. " 
	+ answerArray[questionCounter][1] + 
	"</p><p class='answer'>C. " 
	+ answerArray[questionCounter][2] + 
	"</p><p class='answer'>D. " 
	+ answerArray[questionCounter][3] + 
	
	"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = 
	"<p class='timer-p'>Time Remaining: <span class='timer'>" 
	+ counter + 
	"</span></p>" + 
	"<p class='rightOrWrong'>All done, here's how you did!" + 
	"</p>" + 
	"<p class='summary-correct'>Correct Answers: " 
	+ correctTally + 
	"</p>" + 
	"<p>Wrong Answers: " 
	+ incorrectTally + 
	"</p>" + 
	"<p>Unanswered: " 
	+ unansweredTally + 
	"</p>" + 
	"<p class='reset-button-container'><a class='reset-button' href='#' role='button'><strong>Retake the O.W.L</strong></a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

