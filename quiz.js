const quizContainer =  document.getElementById('quiz');
const submitButton = document.getElementById('submitBtn');
const scoreDisplay = document.getElementById('score');
let score = 0;

function displayQuiz()
{
    let output = '';
    questions.forEach((question, index) => {
        output += 
        `<div>
            <p>${index + 1}. ${question.question}</p>
            ${question.options.map(option => `
                <label>
                    <input type="radio" name="question${index}" value="${option}">
                ${option}
                </label>
            `).join('')}
            <p class="feedback" style="display: none;"></p>
        </div>`;
    });
    quizContainer.innerHTML = output;
}

function submitQuiz()
{
    let correctAnswers = 0;
    const answerContainers = quizContainer.querySelectorAll('div');

    answerContainers.forEach(answerContainer => {
        const selectedOption = answerContainer.querySelector('input[type=radio]:checked');
        const feedback = answerContainer.querySelector('.feedback');
        feedback.style.display = 'block';
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
        // Disable submit button
        submitButton.disabled = true;
    });
    score = correctAnswers;
    console.log(score);
    scoreDisplay.textContent = `Your score: ${score}/${questions.length}`;
    scoreDisplay.style.display = 'block';
}

displayQuiz();