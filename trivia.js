// This file contains the logic for displaying trivia questions and handling user interaction.

// Variables referencing HTML elements
const triviaContainer =  document.getElementById('trivia');
const submitButton = document.getElementById('submitBtn');
const retryButton = document.getElementById('retryBtn');
const scoreDisplay = document.getElementById('score');

// Function to display trivia questions
function displayQuestions() {
    let output = '';
    // Loop through each question
    questions.forEach((question, index) => {
        // Build HTML for each question
        output += 
        `<div class="question-container">
            <div class="question">${index + 1}. ${question.question}</div>
            ${question.options.map(option => `
                <div class="options-container">
                    <input type="radio" class="radio-input" name="question${index}" value="${option}">
                    ${option}
                </div>
            `).join('')}
            <div class="feedback hidden"></div>
        </div>`;
    });
    // Insert HTML into the trivia container
    triviaContainer.innerHTML = output;
}

// Function to submit answers
function submitAnswers() {
    // Variable to keep track of the number of correct answers
    let correctAnswers = 0;
    // Get all question containers
    const questionContainers = triviaContainer.querySelectorAll('.question-container');

    // Loop through each question container
    questionContainers.forEach(questionContainer => {
        // Get the selected option and feedback element for each question
        const selectedOption = questionContainer.querySelector('input[type=radio]:checked');
        const feedback = questionContainer.querySelector('.feedback');
        feedback.classList.remove('hidden'); // Show feedback

        // Check if an option is selected
        if (selectedOption) 
        {
            const questionIndex = parseInt(selectedOption.name.replace('question', ''));
            // Check if selected answer is correct
            if (selectedOption.value === questions[questionIndex].answer)
            {
                correctAnswers++; // Increment correct answers
                feedback.textContent = 'Correct!'; // Display correct answer feedback
                questionContainer.classList.add('question-container-correct'); // Apply correct answer styling
            }
            else
            {
                feedback.textContent = 'Incorrect!'; // Display incorrect answer feedback
                questionContainer.classList.add('question-container-incorrect'); // Apply incorrect answer styling
            }
        } 
        else 
        {
            feedback.textContent = 'You didn\'t answer this question.'; // Display no answer feedback
            questionContainer.classList.add('question-container-incorrect'); // Apply incorrect answer styling
        }
        // Disable radio inputs except the selected one
        const radioInputs = questionContainer.querySelectorAll('input[type=radio]:not(:checked)');
        radioInputs.forEach(input => {
            input.disabled = true;
        });
    });

    scoreDisplay.textContent = `Your score: ${correctAnswers}/${questions.length}`; // Display score
    scoreDisplay.classList.remove('hidden'); // Show score
    submitButton.classList.add('hidden'); // Hide submit button
    retryButton.classList.remove('hidden'); // Show retry button
}

function retryTrivia() {
    // Get all question containers
    const questionContainers = triviaContainer.querySelectorAll('.question-container');

    // Loop through each question container
    questionContainers.forEach(questionContainer => {
        // Get the feedback element for each question
        const feedback = questionContainer.querySelector('.feedback');
        feedback.classList.add('hidden'); // Hide feedback
        feedback.textContent = ''; // Clear feedback

        // Get all radio inputs for each question
        const radioInputs = questionContainer.querySelectorAll('input[type=radio]');
        radioInputs.forEach(input => {
            input.checked = false; // Clear answers
            input.disabled = false; // Enable input selection
        });

        // Reset question container styling
        if(questionContainer.classList.contains('question-container-correct'))
        {
            questionContainer.classList.remove('question-container-correct'); // Reset correct answer styling
        }
        else
        {
            questionContainer.classList.remove('question-container-incorrect'); // Reset incorrect answer styling
        }
    });

    submitButton.classList.remove('hidden'); // Show submit button
    scoreDisplay.classList.add('hidden'); // Hide score
    retryButton.classList.add('hidden'); // Hide retry button
}

// Display trivia questions when the page loads
displayQuestions();