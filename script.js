const questions = [
    {
        question: "What is the capital of France?",
        answers: 
        [{text: "Paris", correct: true}, 
        {text: "London", correct: false}, 
        {text: "Berlin", correct: false}, 
        {text: "Madrid", correct: false}],
    },
    {
        question: "What is 2 + 2?",
        answers: 
        [{text: "3", correct: false}, 
        {text: "4", correct: true}, 
        {text: "5", correct: false}, 
        {text: "6", correct: false}],
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: 
        [{text: "Earth", correct: false}, 
        {text: "Mars", correct: false}, 
        {text: "Jupiter", correct: true}, 
        {text: "Saturn", correct: false}],
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: 
        [{text: "Harper Lee", correct: true}, 
        {text: "Mark Twain", correct: false}, 
        {text: "Ernest Hemingway", correct: false}, 
        {text: "F. Scott Fitzgerald", correct: false}],
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
/*     const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        button.addEventListener('click', () => selectAnswer(answer));
    });  
    
    I have lost track here so i made them comment to check them later*/
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();