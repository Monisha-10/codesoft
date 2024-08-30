let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Load quizzes from localStorage or initialize empty array
    quizData = JSON.parse(localStorage.getItem('quizzes')) || [];
    
    const quizListElement = document.getElementById('quiz-list');
    if (quizListElement) {
        // Display quizzes on the Take Quiz page
        quizData.forEach((quiz, index) => {
            const li = document.createElement('li');
            li.textContent = `Quiz ${index + 1}`;
            li.onclick = () => startQuiz(index);
            quizListElement.appendChild(li);
        });
    }
    
    const createQuizForm = document.getElementById('create-quiz-form');
    if (createQuizForm) {
        // Save quiz data on form submission
        createQuizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            saveQuiz();
        });
    }
});

function addQuestion() {
    const container = document.getElementById('quiz-questions-container');
    const questionCount = container.children.length + 1;
    
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('quiz-question');
    questionDiv.innerHTML = `
        <label for="question-${questionCount}">Question ${questionCount}:</label>
        <input type="text" id="question-${questionCount}" name="question-${questionCount}" required>

        <label for="option-${questionCount}-1">Option 1:</label>
        <input type="text" id="option-${questionCount}-1" name="option-${questionCount}-1" required>

        <label for="option-${questionCount}-2">Option 2:</label>
        <input type="text" id="option-${questionCount}-2" name="option-${questionCount}-2" required>

        <label for="option-${questionCount}-3">Option 3:</label>
        <input type="text" id="option-${questionCount}-3" name="option-${questionCount}-3" required>

        <label for="option-${questionCount}-4">Option 4:</label>
        <input type="text" id="option-${questionCount}-4" name="option-${questionCount}-4" required>

        <label for="correct-answer-${questionCount}">Correct Answer:</label>
        <select id="correct-answer-${questionCount}" name="correct-answer-${questionCount}" required>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </select>
    `;
    container.appendChild(questionDiv);
}

function saveQuiz() {
    const form = document.getElementById('create-quiz-form');
    const formData = new FormData(form);
    
    const quiz = [];
    for (let i = 1; i <= formData.entries().next().value[0].split('-')[1]; i++) {
        const question = formData.get(`question-${i}`);
        const options = [
            formData.get(`option-${i}-1`),
            formData.get(`option-${i}-2`),
            formData.get(`option-${i}-3`),
            formData.get(`option-${i}-4`)
        ];
        const correctAnswer = formData.get(`correct-answer-${i}`);
        
        quiz.push({
            question,
            options,
            correctAnswer: parseInt(correctAnswer, 10)
        });
    }
    
    quizData.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizData));
    alert('Quiz saved successfully!');
    form.reset();
}

function startQuiz(quizIndex) {
    currentQuestionIndex = 0;
    score = 0;
    
    const quiz = quizData[quizIndex];
    showQuestion(quiz[currentQuestionIndex]);
}

function showQuestion(question) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <label><input type="radio" name="quiz-option" value="${index + 1}">${option}</label>
                `).join('')}
            </div>
        </div>
        <button onclick="submitAnswer(${currentQuestionIndex})">Next</button>
    `;
}

function submitAnswer(quizIndex) {
    const quiz = quizData[quizIndex];
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    
    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.value, 10);
        const correctAnswer = quiz[currentQuestionIndex].correctAnswer;
        
        if (selectedAnswer === correctAnswer) {
            score++;
        }
        
        currentQuestionIndex++;
        if (currentQuestionIndex < quiz.length) {
            showQuestion(quiz[currentQuestionIndex]);
        } else {
            showResults();
        }
    } else {
        alert('Please select an answer!');
    }
}

function showResults() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${score} / ${quizData[currentQuestionIndex].length}`;
    
    const correctAnswersList = document.getElementById('correct-answers-list');
    correctAnswersList.innerHTML = '';
    quizData[currentQuestionIndex].forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = `Question ${index + 1}: Correct answer is Option ${question.correctAnswer}`;
        correctAnswersList.appendChild(li);
    });
}
