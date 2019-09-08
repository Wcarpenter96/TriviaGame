Question1 = {
    ask: "What is my first name?",
    answers: ["Weston", "Bob", "Joe", "Chris"],
    rightAnswer: "Weston"
}
Question2 = {
    ask: "What is my middle name?",
    answers: ["Cedrick", "James", "William", "David"],
    rightAnswer: "Cedrick"
}
Question3 = {
    ask: "What is my last name?",
    answers: ["Carpenter", "Doe", "Smith", "Miller"],
    rightAnswer: "Carpenter"
}

var questions = [Question1, Question2, Question3];

var qIndex;
var numCorrect;
var numWrong;
var numNull;
var timeLeft;

$('.question').append("<button>Start</button>");

$(document).on('click', 'button', function () {

    qIndex = 0;
    numCorrect = 0;
    numWrong = 0;
    numNull = 0;

    shuffle(questions);


    const askQuestion = (i) => {
        $('.answers').empty();
        $('.image').empty();
        question = questions[i];
        $('.question').text(question.ask);
        shuffle(question.answers);
        question.answers.forEach(answer => {
            $answer = $('<div>').addClass('answer').text(answer);
            $('.answers').prepend($answer);
        });
        timeLeft = 3;
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
    $(document).on('click', '.answer', revealAnswer);

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
        $('.image').append(`<img src="https://picsum.photos/200">`);
        qIndex++;
        if (qIndex < questions.length) {
            setTimeout(function () { askQuestion(qIndex); }, 1000);
        } else {
            setTimeout(GameOver, 1000);
        }

        function GameOver() {
            $(document).off("click", ".answer");
            $('.answers').empty();
            $('.image').empty();
            $('.question').text('Good Job!');
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

