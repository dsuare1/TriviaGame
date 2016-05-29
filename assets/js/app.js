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

var numQuestions = 15,
    activeQuestion,
    answerChoices,
    numCorrect = 0,
    numIncorrect = 0,
    numUnanswered = 0;


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
    // reset: function() {
    //     timer.time = 30;
    //     $("#timer").html("00:30");
    // },

    start: function() {
        counter = setInterval(timer.count, 1000);
    },

    count: function() {
        timer.time--;
        var converted = timer.timeConverter(timer.time);
        $('#timer').html(converted);
        // if (timer.time === 0) {
        //  $("#timerMsg").html("<p>You ran out of time!<br>Ger ready for the next question...</p>");
        //  $("#timer").empty();
        //  $("#question-div").empty();
        //  $("#possible-answers-div").empty();
        //  setTimeout(displayQsandAs, 2000);
        //  timer.reset();
        //  setTimeout(timer.start);
        // }
    },

    stop: function() {
        clearInterval(counter);
    },

    // zero: function() {
    //     if (timer.time <= 0) {
    //         timer.reset;
    //         alert("You ran out of time!");
    //     }
    // },

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
// DISPLAY QUESTION LOGIC W/ INTERVALS AND TIMEOUTS
//////////////////////////////////////////////////////////////
function displayQs() {
    activeQuestion = questionsAndAnswers[Math.floor(Math.random() * questionsAndAnswers.length)];
    $("#question-div").html("<p>" + activeQuestion.q + "</p>");
}

function displayAs() {
    answerChoices = [activeQuestion.correct, activeQuestion.incorrect[0], activeQuestion.incorrect[1], activeQuestion.incorrect[2]];

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

    for (var i = 0; i < answerChoices.length; i++) {
        $("#answers-list").append("<li class='possible-answer text-center' id='answer" + i + "'>" + answerChoices[i] + "</li>");
        if (i >= answerChoices.length) {
            return;
        } else {
            checkAnswer();
        }
    }
};

//////////////////////////////////////////////////////////////
// START BUTTON
//////////////////////////////////////////////////////////////

// window.onload = function() {

    $("#start").on("click", function() {

        numQuestions--;
        console.log(numQuestions);

        timer.start();

        displayQs();

        displayAs();

        // console.log(timer);

        checkAnswer();

    });

// };


function checkAnswer() {
    $(".possible-answer").on("click", function() {
        var userSelect = this.innerHTML;
        if (userSelect === activeQuestion.correct) {
            numCorrect += 1;
            $("#timerMsg").html("Correct! Get ready for the next question...");
            timer.stop();
            $("#timer").empty();
            $("#answers-list").empty();
            $("#question-div").empty();
            setTimeout(displayQs, 2000);
            setTimeout(displayAs, 2000);
            setTimeout(timer.reset, 2000);
            setTimeout(timer.start, 2001);
            console.log(numCorrect);
        } else {
            alert("You clicked the incorrect answer");
            numIncorrect += 1;
            console.log(numIncorrect);
        }
    });
}
