// Variables
var qIndex;
var numCorrect;
var numWrong;
var numNull;
var timeLeft;

// Arbitrarily ordered questions with their respective keys
Question1 = {
    ask: "How far are you allowed to kick underwater off of each wall in a race?",
    answers: ["15yd", "15m", "10yd", "10m"],
    rightAnswer: "15m",
    image:`<img src="./assets/images/swim1.gif">`
}
Question2 = {
    ask: "What is the oldest stroke?",
    answers: ["Breastroke", "Backstroke", "Butterfly", "Freestyle"],
    rightAnswer: "Breastroke",
    image:`<img src="./assets/images/swim2.gif">`
}
Question3 = {
    ask: "What year did swimming become an Olympic sport?",
    answers: ["1908", "1896", "1924", "1912"],
    rightAnswer: "1908",
    image:`<img src="./assets/images/swim3.gif">`
}
Question4 = {
    ask: "Which team won the 2019 Men's NCAA Division I Swimming Championships?",
    answers: ["Cal", "Texas", "Indiana", "NC State"],
    rightAnswer: "Cal",
    image:`<img src="./assets/images/swim4.gif">`
}
Question5 = {
    ask: "Which female swimmer has the most gold medals?",
    answers: ["Jenny Thompson", "Dara Torres", "Natalie Coughlin", "Tracy Caulkins"],
    rightAnswer: "Jenny Thompson",
    image:`<img src="./assets/images/swim5.jpg">`
}
Question6 = {
    ask: "Who invented swim fins?",
    answers: ["Benjamin Franklin", "C.P. Troppman", "David Armbruster", "Michael Phelps"],
    rightAnswer: "Benjamin Franklin",
    image:`<img src="./assets/images/swim6.gif">`
}
Question7 = {
    ask: "How long is a standard Olympic-size pool?",
    answers: ["50m", "50yd", "25yd", "25m"],
    rightAnswer: "50m",
    image:`<img src="./assets/images/swim7.gif">`
}
Question8 = {
    ask: "What is the fastest 50 yard freestyle time?",
    answers: ["17.63 seconds", "18.11 seconds", "20.91 seconds","21.04 seconds"],
    rightAnswer: "17.63 seconds",
    image:`<img src="./assets/images/swim8.gif">`
}
var questions = [Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8];

// Setup
$('.question').append("<button>Start</button>");

// When User Clicks Start Button
$(document).on('click', 'button', function () {
    
    // RESET
    qIndex = 0;
    numCorrect = 0;
    numWrong = 0;
    numNull = 0;

    // Shuffle function at end of script
    shuffle(questions);

    // Asks the user the question, displays possible answers and begins timer countdown
    const askQuestion = (i) => {
        $('.answers').empty();
        $('.image').empty();
        question = questions[i];
        $('.question').text(question.ask);
        shuffle(question.answers);
        question.answers.forEach(answer => {
            $answer = $('<h3>').addClass('answer m-1').text(answer);
            $('.answers').prepend($answer);
        });
        // Timer
        timeLeft = 10;
        $('.timer').text(`Time Remaining: ${timeLeft} Seconds`);
        intervalId = setInterval(function () {
            timeLeft--;
            $('.timer').text(`Time Remaining: ${timeLeft} Seconds`);
            if(timeLeft === 0){
                revealAnswer();
            }
        }, 1000);
    }

    askQuestion(qIndex);

    // When the user selects their answer
    $(document).on('click', '.answer', revealAnswer);
    
    //Stops timer, checks user's answer, and displays correct answer with .gif
    function revealAnswer() {
        clearInterval(intervalId);
        $('.answers').text(`The answer was ${question.rightAnswer}`);
        if ($(this).text() === question.rightAnswer) {
            $('.question').text('Correct!');
            numCorrect++;
        } else if (timeLeft === 0) {
            $('.question').text("Time's Up!");
            numNull++;
        } else {
            $('.question').text('Wrong!');
            numWrong++;
        }
        $('.answer').remove();
        $('.image').append(question.image);
        qIndex++;
        // Returns to askQuestion or proceeds to gameOver
        if (qIndex < questions.length) {
            setTimeout(function () { askQuestion(qIndex); }, 4000);
        } else {
            setTimeout(gameOver, 4000);
        }
        // Displays game results, generates play again button (triggers initial on "click" event)
        function gameOver() {
            $(document).off("click", ".answer");
            $('.answers').empty();
            $('.image').empty();
            if(numCorrect === questions.length){
                $('.question').text('Perfect Score!');
            }else if(numCorrect > questions.length / 2){
                $('.question').text('Good Job!');
            }else{
                $('.question').text('Better Luck Next Time...');
            }
            $('.answers').append("<div> Correct Answers: " + numCorrect + "</div>");
            $('.answers').append("<div> Wrong Answers: " + numWrong + "</div>");
            $('.answers').append("<div> Unanswered: " + numNull + "</div>");
            $('.answers').append("<button>Play Again</button>");
        }
    }
    
});

// Fisher-Yates Shuffle
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

