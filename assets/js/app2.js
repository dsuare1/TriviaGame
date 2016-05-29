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

var numQ = 0,
    activeQuestion,
    answerChoices,
    correctAnswer,
    numCorrect = 0,
    numIncorrect = 0,
    numUnanswered = 0;


//////////////////////////////////////////////////////////////
// ARRAY OF QUESTIONS & ANSWERS
//////////////////////////////////////////////////////////////

// var questionsAndAnswers = [

//     {
//         name: "q1",
//         q: "For how many seasons was Seinfeld on the air?",
//         choices: ["7", "8", "9", "10"],
//         correct: "9"
//     },

//     {
//         name: "q2",
//         q: "What was the cause of George's fiance Susan's death?",
//         choices: ["Cheap wedding invitations", "Heart attack", "Car accident", "Nobody knows..."],
//         correct: "Cheap wedding invitations"
//     },

//     {
//         name: "q3",
//         q: "According to legend, to what superhero is there a reference in every episode?",
//         choices: ["Batman", "The Green Lantern", "The Flash", "Superman"],
//         correct: "Superman"
//     },

//     {
//         name: "q4",
//         q: "What is Jerry's dad's name?",
//         choices: ["Jerry", "Morty", "Milton", "Leonard"],
//         correct: "Morty"
//     },

//     {
//         name: "q5",
//         q: "What is Jerry's profession?",
//         choices: ["Cab driver", "Theater ticket checker", "Comedian", "Mailman"],
//         correct: "Comedian"
//     },

//     {
//         name: "q6",
//         q: "What actor plays Tim Watley, Jerry's dentist friend?",
//         choices: ["Wayne Knight", "John O'Hurley", "Matt McCoy", "Bryan Cranston"],
//         correct: "Bryan Cranston"
//     },

//     {
//         name: "q7",
//         q: "For which Major Legue Baseball team does George work?",
//         choices: ["The Yankees", "The Mets", "The Red Sox", "The Astros"],
//         correct: "The Yankees"
//     },

//     {
//         name: "q8",
//         q: "Which character was NOT in the pilot (very first) episode?",
//         choices: ["Jerry", "George", "Kramer", "Elaine"],
//         correct: "Elaine"
//     },

//     {
//         name: "q9",
//         q: "What is Jerry's apartment number?",
//         choices: ["5C", "20", "5A", "18"],
//         correct: "5A"
//     },

//     {
//         name: "q10",
//         q: "What was the name of the holiday George's dad invented?",
//         choices: ["Constanzica", "Festivus", "Easterlings", "Hanukmas"],
//         correct: "Festivus"
//     },

//     {
//         name: "q11",
//         q: "What is Kramer's job?",
//         choices: ["Social worker", "He does not have one", "Subway operator", "Library cop"],
//         correct: "He does not have one"
//     },

//     {
//         name: "q12",
//         q: "What was Elain's restaurant idea?",
//         choices: ["Seafood place", "Soup stand", "Mexican food", "Muffin shop"],
//         correct: "Muffin shop"
//     },

//     {
//         name: "q13",
//         q: "To whom does Kramer sell his life stories?",
//         choices: ["J. Peterman", "Newman", "Todd Gack", "Elain's father"],
//         correct: "J. Peterman"
//     },

//     {
//         name: "q14",
//         q: "What was written on Kramer's vanity license plate?",
//         choices: ["THE-K-MAN", "YOYOMA", "ASSMAN", "GROOVY"],
//         correct: "ASSMAN"
//     },

//     {
//         name: "q15",
//         q: "What is Kramer's first name?",
//         choices: ["Jeff", "Quinton", "Cosmo", "Larry"],
//         correct: "Cosmo"
//     }

// ];

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
    },

    stop: function() {
        clearInterval(counter);
    },

    reset: function() {
        timer.time = 10;
        $("#timer").html("00:10");
    },

    timeConverter: function(t) {
        //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
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
    console.log(activeQuestion);
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

    console.log(answerChoices);
    correctAnswer = questionsAndAnswers[numQ].correct;
    console.log(correctAnswer);
    for (var i = 0; i < 4; i++) {
        $("#answers-list").append("<li class='possible-answer text-center' id='answer" + i + "'>" + answerChoices[i] + "</li>");
    }
    numQ++;
}


function checkAnswer() {
    if (numQ === 15) {
        $("#timer-div").empty();
        timer.stop();
        timer.reset();
        $("#answers-list").empty();
        setTimeout(clearBoard, 2000);
    } else if (userGuess === correctAnswer) {
        numCorrect++;
        console.log(numCorrect);
        $("#question-div").html("<p>Correct!</p>");
        timer.stop();
        timer.reset();
        $("#timer").html("00:00");
        $("#answers-list").empty();
        setTimeout(timer.start, 2000);
        setTimeout(displayQsandAs, 2000);
        console.log(numQ);
    } else {
        numIncorrect++;
        console.log(numIncorrect);
        $("#question-div").html("<p>Incorrect!</p>");
        timer.stop();
        timer.reset();
        $("#timer").html("00:00");
        $("#answers-list").empty();
        setTimeout(timer.start, 2000);
        setTimeout(displayQsandAs, 2000);
        console.log(numQ);
    }
}

function clearBoard() {
    $("#question-div").html("<p>You've reached the end of the game!<br><br>Scroll down for your results...</p>");
    $("#correct-answers-div").html("<p>Number of questions correctly guessed:<br><br>" + numCorrect + "</p>");
    $("#incorrect-answers-div").html("<p>Number of questions incorrectly guessed:<br><br>" + numIncorrect + "</p>");
    $("#unanswered-div").html("<p>Number of questions not answered:<br><br>" + numUnanswered + "</p>");
    // $("#reset-button").
}


//////////////////////////////////////////////////////////////
// Click Events
//////////////////////////////////////////////////////////////

$(".start").on("click", function() {
    $("#question-div").empty();
    $("#answers-list").empty();
    displayQsandAs();
    timer.start();
    // $(this).hide();
});

$("#answers-list").on("click", ".possible-answer", function() {
    userGuess = this.innerHTML;
    console.log(this);
    checkAnswer();
});


//////////////////////////////////////////////////////////////
// End of game
//////////////////////////////////////////////////////////////
