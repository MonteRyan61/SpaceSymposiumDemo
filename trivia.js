const triviaContainer =  document.getElementById('trivia');
const submitButton = document.getElementById('submitBtn');
const retryButton = document.getElementById('retryBtn');
const scoreDisplay = document.getElementById('score');
let score = 0;

function displayQuestions()
{
    let output = '';
    questions.forEach((question, index) => {
        output += 
        `<div class="question-container">
            <div class="question">${index + 1}. ${question.question}</div>
            ${question.options.map(option => `
                <div class="options-container">
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </div>
            `).join('')}
            <div class="feedback hidden"></div>
        </div>`;
    });
    triviaContainer.innerHTML = output;
}

function submitAnswers()
{
    let correctAnswers = 0;
    const answerContainers = triviaContainer.querySelectorAll('.question-container');

    answerContainers.forEach(answerContainer => {
        const selectedOption = answerContainer.querySelector('input[type=radio]:checked');
        const feedback = answerContainer.querySelector('.feedback');
        feedback.classList.remove('hidden');
        if(selectedOption)
        {
            const questionIndex = parseInt(selectedOption.name.replace('question', ''))
            if(selectedOption.value === questions[questionIndex].answer)
            {
                correctAnswers++;
                feedback.textContent = 'Correct!';
                feedback.classList.add('correct-answer');
            }
            else
            {
                feedback.textContent = 'Incorrect!';
                feedback.classList.add('incorrect-answer');
            }
        }
        else
        {
            feedback.textContent = 'You didn\'t answer this question.';
            feedback.classList.add('unanswered');
        }
        // Disable radio inputs except the selected one
        const radioInputs = answerContainer.querySelectorAll('input[type=radio]:not(:checked)');
        radioInputs.forEach(input => {
            input.disabled = true;
        });
    });

    score = correctAnswers;
    console.log(score);
    scoreDisplay.textContent = `Your score: ${score}/${questions.length}`;
    scoreDisplay.classList.remove('hidden'); // Show score
    submitButton.classList.add('hidden'); // Hide the submit button after submission
    retryButton.classList.remove('hidden'); // Show the retry button after submission
}

function retryTrivia()
{
    const answerContainers = triviaContainer.querySelectorAll('.question-container');
    answerContainers.forEach(answerContainer => {
        const feedback = answerContainer.querySelector('.feedback');
        feedback.classList.add('hidden'); // Hide the feedback
        feedback.textContent = ''; // Clear the feeback

        const radioInputs = answerContainer.querySelectorAll('input[type=radio]');
        radioInputs.forEach(input=>{
                input.checked = false; // Clear answers
                input.disabled = false; // Enable input selection
            });
    });
    

    submitButton.classList.remove('hidden'); // Show the submit button
    scoreDisplay.classList.add('hidden'); // Hide the previous score
    retryButton.classList.add('hidden'); // Hide the retry button

}

displayQuestions();