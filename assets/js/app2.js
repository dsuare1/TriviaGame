//////////////////////////////////////////////////////////////
// DISPLAY JQUERY
//////////////////////////////////////////////////////////////

// give all sections + content 100% width + height of screen
$(".header").css("min-height", $(window).height());

$("section").css("min-height", $(window).height());

$(".game-content-row").css("min-height", $(window).height());


//////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
//////////////////////////////////////////////////////////////

var gameStarted = false,
    numQ = 0,
    activeQuestion,
    answerChoices,
    correctAnswer,
    numCorrect = 0,
    numIncorrect = 0,
    numUnanswered = 0,
    themeMp3 = new Audio("assets/audio/theme.mp3"),
    cutMp3 = new Audio("assets/audio/cut.mp3");


//////////////////////////////////////////////////////////////
// ARRAY OF QUESTIONS & ANSWERS
//////////////////////////////////////////////////////////////

var questionsAndAnswers = [

    {
        name: "q1",
        q: "For how many seasons was Seinfeld on the air?",
        correct: "9",
        incorrect: ["7", "8", "10"]
    },

    {
        name: "q2",
        q: "What was the cause of George's fiance Susan's death?",
        correct: "Cheap wedding invitations",
        incorrect: ["Heart attack", "Car accident", "Nobody knows..."]
    },

    {
        name: "q3",
        q: "According to legend, to what superhero is there a reference in every episode?",
        correct: "Superman",
        incorrect: ["Batman", "The Green Lantern", "The Flash"]
    },

    {
        name: "q4",
        q: "What is Jerry's dad's name?",
        correct: "Morty",
        incorrect: ["Jerry", "Milton", "Leonard"]
    },

    {
        name: "q5",
        q: "What is Jerry's profession?",
        correct: "Comedian",
        incorrect: ["Writer", "Theater Ticket Checker", "Mailman"]
    },

    {
        name: "q6",
        q: "What actor plays 'Tim Watley', Jerry's dentist friend?",
        correct: "Bryan Cranston",
        incorrect: ["Wayne Knight", "John O'Hurley", "Matt McCoy"]
    },

    {
        name: "q7",
        q: "For which Major Legue Baseball team does George work?",
        correct: "The Yankees",
        incorrect: ["The Mets", "The Red Sox", "The Astros"]
    },

    {
        name: "q8",
        q: "Which character was NOT in the pilot (very first) episode?",
        correct: "Elaine",
        incorrect: ["Jerry", "George", "Kramer"]
    },

    {
        name: "q9",
        q: "What is Jerry's apartment number?",
        correct: "5A",
        incorrect: ["5C", "20", "18"]
    },

    {
        name: "q10",
        q: "What was the name of the holiday George's dad invented?",
        correct: "Festivus",
        incorrect: ["Constanzica", "Easterlings", "Hanukmas"]
    },

    {
        name: "q11",
        q: "What is Kramer's job?",
        correct: "He does not have one",
        incorrect: ["Social worker", "Subway operator", "Library cop"]
    },

    {
        name: "q12",
        q: "What was Elain's restaurant idea?",
        correct: "Muffin shop",
        incorrect: ["Seafood place", "Soup stand", "Mexican food"]
    },

    {
        name: "q13",
        q: "To whom does Kramer sell his life stories?",
        correct: "J. Peterman",
        incorrect: ["Newman", "Todd Gack", "Elain's father"]
    },

    {
        name: "q14",
        q: "What was written on Kramer's vanity license plate?",
        correct: "ASSMAN",
        incorrect: ["THE-K-MAN", "YOYOMA", "GROOVY"]
    },

    {
        name: "q15",
        q: "What is Kramer's first name?",
        correct: "Cosmo",
        incorrect: ["Jeff", "Quinton", "Larry"]
    }

];


//////////////////////////////////////////////////////////////
// 30 SECOND TIMER FUNCTION
//////////////////////////////////////////////////////////////
var timer = {
    time: 10,

    start: function() {
        counter = setInterval(timer.count, 1000);
    },

    count: function() {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $('#timer').html(converted);

        if (timer.time === 0 && numQ === 15) {
            numUnanswered++;
            $("#timerMsg").empty();
            $("#question-div").html("<p>You ran out of time!</p>");
            setTimeout($("#timerMsg").empty, 2000);
            timer.stop();
            timer.reset();
            $("#answers-list").empty();
            setTimeout(clearBoard, 2000);
        }

        if (timer.time === 0) {
            numUnanswered++;
            $("#question-div").html("<p>You ran out of time!</p>");
            timer.stop();
            timer.reset();
            $("#timer").html("00:10");
            $("#answers-list").empty();
            setTimeout(timer.start, 2000);
            setTimeout(displayQsandAs, 2000);
        }
    },

    stop: function() {
        clearInterval(counter);
    },

    reset: function() {
        timer.time = 10;
        $("#timer").html("00:10");
    },

    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
}

//////////////////////////////////////////////////////////////
// Function Utilities
//////////////////////////////////////////////////////////////

function displayQsandAs() {
    activeQuestion = questionsAndAnswers[numQ].q;
    $("#question-div").html("<p>" + activeQuestion + "</p>");

    answerChoices = [questionsAndAnswers[numQ].correct, questionsAndAnswers[numQ].incorrect[0], questionsAndAnswers[numQ].incorrect[1], questionsAndAnswers[numQ].incorrect[2]];

    // shuffle answers
    var curIndex = answerChoices.length,
        tempVal, randIndex;

    // while there remain elements to shuffle...
    while (0 !== curIndex) {

        // choose a remaining element and decrement the tracker
        randIndex = Math.floor(Math.random() * curIndex);
        curIndex -= 1;

        // swap that with the current element
        tempVal = answerChoices[curIndex];
        answerChoices[curIndex] = answerChoices[randIndex];
        answerChoices[randIndex] = tempVal;

    }

    correctAnswer = questionsAndAnswers[numQ].correct;

    for (var i = 0; i < 4; i++) {
        $("#answers-list").append("<li class='possible-answer text-center' id='answer" + i + "'>" + answerChoices[i] + "</li>");
    }
    numQ++;
}


function checkAnswer() {
    if (numQ === 15) {
        if (userGuess === correctAnswer) {
            themeMp3.play();
            numCorrect++;
            $("#question-div").html("<p>Correct!</p>");
        } else {
            themeMp3.play();
            numIncorrect++;
            $("#question-div").html("<p>Incorrect!</p>");
        }
        $("#timerMsg").empty();
        timer.stop();
        timer.reset();
        $("#answers-list").empty();
        clearBoard();
    } else if (userGuess === correctAnswer) {
        numCorrect++;
        $("#question-div").html("<p>Correct!</p>");
        timer.stop();
        timer.reset();
        $("#timer").html("00:10");
        $("#answers-list").empty();
        setTimeout(timer.start, 2000);
        setTimeout(displayQsandAs, 2000);
    } else {
        numIncorrect++;
        $("#question-div").html("<p>Incorrect!<br><br>The correct answer was:<br><strong>" + questionsAndAnswers[numQ - 1].correct + "<strong></p>");
        timer.stop();
        timer.reset();
        $("#timer").html("00:10");
        $("#answers-list").empty();
        setTimeout(timer.start, 3500);
        setTimeout(displayQsandAs, 3500);
    }
}

function clearBoard() {
    $("#question-div").html("<p>You've reached the end of the game!<br><br>Scroll down for your results...</p>");
    $("#timer").empty();
    $("#correct-answers-div").html("<p>Number of questions correctly guessed:<br><br>" + numCorrect + "</p>");
    $("#incorrect-answers-div").html("<p>Number of questions incorrectly guessed:<br><br>" + numIncorrect + "</p>");
    $("#unanswered-div").html("<p>Number of questions not answered:<br><br>" + numUnanswered + "</p>");
    numQ = 0;
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    gameStarted = false;
}

// if (timer.time === 0) { // does not work
//     numUnanswered++;
//     $("#question-div").html("<p>You ran out of time!</p>");
//     timer.stop();
//     timer.reset();
//     $("#timer").html("00:10");
//     $("#answers-list").empty();
//     setTimeout(timer.start, 2000);
//     setTimeout(displayQsandAs, 2000);
// }

//////////////////////////////////////////////////////////////
// Click Events
//////////////////////////////////////////////////////////////

$(document).ready(function() {
    themeMp3.play();
});

$(".start").on("click", function() {
    themeMp3.pause();
    cutMp3.play();
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    $("#question-div").empty();
    $("#answers-list").empty();
    displayQsandAs();
    timer.start();
});

$("#answers-list").on("click", ".possible-answer", function() {
    userGuess = this.innerHTML;
    checkAnswer();
});


//////////////////////////////////////////////////////////////
// End of game
//////////////////////////////////////////////////////////////

$(".reset").on("click", function() {
    cutMp3.play();
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    $("#correct-answers-div").empty();
    $("#incorrect-answers-div").empty();
    $("#unanswered-div").empty();
    $("#timerMsg").html("Time remaining for current question:");
    displayQsandAs();
    timer.start();
});
