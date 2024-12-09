const questions = [
    {
        question: "¿Cuál es el planeta más cercano al Sol?",
        options: ["Venus", "Marte", "Mercurio", "Tierra"],
        answer: "Mercurio"
    },
    {
        question: "¿Qué gas es esencial para que respiremos?",
        options: ["Hidrógeno", "Oxígeno", "Nitrógeno", "Helio"],
        answer: "Oxígeno"
    },
    {
        question: "¿Cuántos continentes hay en el mundo?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

function startGame() {
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    nextButton.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetOptions();
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("btn");
            if (option === currentQuestion.answer) {
                button.dataset.correct = true;
            }
            button.addEventListener("click", selectAnswer);
            optionsElement.appendChild(button);
        });
    } else {
        endGame();
    }
}

function resetOptions() {
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
        selectedButton.style.backgroundColor = "green";
    } else {
        selectedButton.style.backgroundColor = "red";
    }
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.style.backgroundColor = "green";
        }
    });
}

function endGame() {
    questionContainer.classList.add("hide");
    nextButton.classList.add("hide");
    scoreContainer.classList.remove("hide");
    scoreElement.textContent = `Tu puntuación es: ${score}/${questions.length}`;
}
