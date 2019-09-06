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

var questions = [Question1, Question2, Question3]


shuffle(questions);

questions.forEach(question => {
    console.log(question.ask);
    shuffle(question.answers);
    question.answers.forEach(answer => {
        console.log(answer);
    });
    console.log('The right answer is ' + question.rightAnswer);
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





// for (let i = 0; i < questions.length; i++) {
//     displayQuestion();  
// }
