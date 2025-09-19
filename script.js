const quiz = [
    {
        question: "What is The Name of Your Trainer?",
        options: ["Sir Asad", "Sir Arham", "Sir Ghous", "Non of Above"],
        correctAnswer: "Sir Arham"
    },
    {
        question: "Which one is The Greater Than?",
        options: [2, 15, 25, 100],
        correctAnswer: 100
    },
    {
        question: "What is your nationality?",
        options: ["Pakistani", "Afghani", "Indian", "Bangladeshi"],
        correctAnswer: "Pakistani"
    },
    {
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Islamabad", "Lahore", "Quetta"],
        correctAnswer: "Islamabad"
    },
    {
        question: "Which is the national language of Pakistan?",
        options: ["Sindhi", "Punjabi", "Urdu", "Pashto"],
        correctAnswer: "Urdu"
    },
    {
        question: "Which continent is Pakistan in?",
        options: ["Asia", "Africa", "Europe", "Australia"],
        correctAnswer: "Asia"
    },
    {
        question: "HTML Stands For?",
        options: ["Hyper Test Makeup Language", "Hyper Text Markeup Language", "Hype Text Marke Up Language"],
        correctAnswer: "Hyper Text Markeup Language"
    },
    {
        question: "Which year did Pakistan get independence?",
        options: [1940, 1945, 1947, 1950],
        correctAnswer: 1947
    },
    {
        question: "Who is the founder of Pakistan?",
        options: ["Allama Iqbal", "Liaquat Ali Khan", "Quaid-e-Azam", "Ayub Khan"],
        correctAnswer: "Quaid-e-Azam"
    },
    {
        question: "Which ocean is near Pakistan?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correctAnswer: "Indian"
    }
];

var currentQuestion = 0;
var score = 0;
var correctCount = 0;
var wrongCount = 0;
var scoreElement = document.getElementById("score");

var totalTime = 60;
var timerInterval;
var answered = false; 

function startTimer() {
    timerInterval = setInterval(() => {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        document.getElementById("timer").innerText = ` Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        totalTime--;

        if (totalTime < 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

function renderQuestions() {
    var questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz[currentQuestion].question;

    document.getElementById("questionNumber").innerHTML = ` ${currentQuestion + 1} of ${quiz.length}`;

    var quizOptions = document.getElementById("quizOption");
    quizOptions.innerHTML = '';
    answered = false; 

    for (var i = 0; i < quiz[currentQuestion].options.length; i++) {
        quizOptions.innerHTML += `<li onclick="checkCorrect(event)">${quiz[currentQuestion].options[i]}</li>`;
    }

    if (currentQuestion === quiz.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("finishBtn").style.display = "inline-block";
    } else {
        document.getElementById("nextBtn").style.display = "inline-block";
        document.getElementById("finishBtn").style.display = "none";
    }
}

function goToNext() {
    if (!answered) {
        alert(" Please select an option before going to the next question.");
        return;
    }
    currentQuestion++;
    renderQuestions();
}

function finishQuiz() {
    if (!answered) {
        alert(" Please select an option before finishing the quiz.");
        return;
    }
    showResult();
}

function checkCorrect(event) {
    if (quiz[currentQuestion].correctAnswer == event.target.innerHTML) {
        event.target.style.backgroundColor = "green";
        event.target.style.color = "white";
        score += 10;
        correctCount++;
    } else {
        event.target.style.backgroundColor = "red"; 
        event.target.style.color = "white";
        wrongCount++;
    }
    scoreElement.innerHTML = score;

    var options = document.querySelectorAll("#quizOption li");
    options.forEach(opt => opt.style.pointerEvents = "none");

    answered = true; 
}

function showResult() {
    clearInterval(timerInterval);
    document.getElementById("result").innerHTML = `
         Quiz Finished! <br>
         Total Score: <b>${score}</b> / ${quiz.length * 10} <br>
         Total Questions: <b>${quiz.length}</b> <br>
         Correct Answers: <b>${correctCount}</b> <br>
         Wrong Answers: <b>${wrongCount}</b>`;
    document.getElementById("restartBtn").style.display = "block";
    document.getElementById("question").style.display = "none";
    document.getElementById("quizOption").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("finishBtn").style.display = "none";
    document.getElementById("image").style.display = "inline-block";
    document.getElementById("scores").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("questionNumber").style.display = "none";
}

function restartQuizz() {
    window.location.reload();
}

renderQuestions();
startTimer();