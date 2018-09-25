let quiz = {
	"name": "Superhero Quiz",
	"description": "How many heroes can you name?",
	"question": "What is the real name of ",
	/*"names":[
			{"heroName": "Superman", "trueIdentity": "Clark Kent"},
			{"heroName": "Wonder Woman", "trueIdentity": "Diana Prince"},
			{"heroName": "Batman", "trueIdentity": "Bruce Wayne"}
	],*/
	"heroNames":[
			"Superman",
			"Wonder Woman",
			"Batman"
	],
	"trueIdentities":[
			"Clark Kent", 
			"Diana Prince", 
			"Bruce Wayne"
	]
};		

//These are the hooks that connect to our DOM obejcts
var $questionSpot = document.getElementById('questionSpot');
var $feedback = document.getElementById('feedback');
var $score = document.getElementById('score');

let $form = document.forms.checkAnswer;
let $input = $form.elements.answer;

let $start = document.getElementById('start');
//Common practice is to name vars with $ that matches the DOM obejct


//Create an update function that can be used to update an element on a page
function update(el, content, klass){
	var p = el.firstChild; // Either update the first child or create on if there is not one
	if(el === $score){
		p.textContent = content;
		el.appendChild(p);
	}
	p.innerHTML = content;

	if(klass){
		p.className = klass; //If a class name is given apply it to p
	}
}

//Hide elements
function hide(el) {
	el.style.display = "none";
}

//Show elements
function show(el) {
	el.style.display = "block";
}

hide($form);
hide($questionSpot);
hide($feedback);
hide($score);

$start.addEventListener('click', function(){play(quiz)});

//Create a function for playing the game
function play(quiz) {
	show($form);
	show($questionSpot);
	show($feedback);
	show($score);

	hide($start);

	var score = 0;

	var i = 0;
	//This line will update the score while playing
	update($score, score);

	/*
	for(var i = 0, question, answer; i < quiz.heroNames.length; i++) {
		question = quiz.heroNames[i];
		answer = ask(question);
		check(answer);
	}
	*/

	function chooseQuestion() {
		question = quiz.heroNames[i];
		console.log(quiz.heroNames[i]);
		answer = ask(question);
	}

	chooseQuestion();

	$form.addEventListener("submit", function(event){
		event.preventDefault();
		console.log($input.value)
		check($input.value);
	});

	function ask(question) {
		update($questionSpot, quiz.question + question + "?");	//This will show the question on the page
		//return prompt("What is the real name of " + quiz.heroNames[i] + "?"); // We still need the prompt to enter answers util we start using forms
		$input.value = "";
		$input.focus();
	}

	function check(answer) {
		if(answer === quiz.trueIdentities[i]){
			update($feedback, "Correct!", "right");
			score++;
			update($score, score);
		} else {
			update($feedback, "Wrong!", "wrong");
		}
		i++;
		if(i === quiz.heroNames.length) {

		} else {
			chooseQuestion();
		}
	}

	function gameOver() {
		update($question, "Game over, you scored " + score + " points!");
	}
}