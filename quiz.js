const quizContainer =  document.getElementById("quiz");

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
        <div>`;
    });
    quizContainer.innerHTML = output;
}

function submitQuiz()
{
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name=question${index}]:checked`);
        if(selectedOption.value === question.answer)
        {
            score++;
        }
    });
    alert(`Your score: ${score}/${questions.length}`);
}

displayQuiz();