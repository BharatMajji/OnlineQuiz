const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "12", "3"],
        answer: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
        answer: 1
    }
];

let availableQuestions = [...questions]; // Clone the questions array
let currentQuestion = {};
let score = 0; // Initialize score

function loadQuestion() {
    document.getElementById("nextBtn").disabled = true;

    if (availableQuestions.length === 0) {
        document.getElementById("question").style.display = "none";
        document.getElementById("options").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("result").innerText = `🎉 Quiz Completed! Final Score: ${score} 🎉`;
        document.getElementById("result").style.display = "block";
        return;
    }

    // Pick a random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    availableQuestions.splice(randomIndex, 1); // Remove selected question

    document.getElementById("question").innerText = currentQuestion.question;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option");
        btn.onclick = () => checkAnswer(btn, index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, index) {
    const buttons = document.querySelectorAll(".option");
    buttons.forEach(btn => btn.disabled = true); // Disable all buttons after selection

    if (index === currentQuestion.answer) {
        selectedBtn.classList.add("correct");
        score++; // Increase score for correct answer
    } else {
        selectedBtn.classList.add("wrong");
        buttons[currentQuestion.answer].classList.add("correct"); // Show correct answer
    }
    
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`; // Update score display
    document.getElementById("nextBtn").disabled = false; // Enable next button
}

window.onload = loadQuestion;
