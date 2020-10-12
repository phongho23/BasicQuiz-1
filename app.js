/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */


/**
 * Example store structure
 */

 // stores the 10 questions for the phobia quiz  

const store = {
  questions: [
    {
      question: 'What is Ataxophobia?',  //question 1
      answers: [
        'Fear of ice cream',
        'Fear of taxes or fees',
        'Fear of disorder or untidiness',
        'Fear of stuffed animals'
      ],
      correctAnswer: 'Fear of disorder or untidiness'
    },
    {
      question: 'What is Aphenphosmphobia?',  //question 2
      answers: [
        'Fear of being touched',
        'Fear of biology studies',
        'Fear of hyphens in writing',
        'Fear of the year 2012'
      ],
      correctAnswer: 'Fear of being touched'
    },
    {
      question: 'What is Pteromerhanophobia?',  //question 3
      answers: [
        'Fear of soundbars',
        'Fear of sterling silver',
        'Fear of scarlett red',
        'Fear of flying'
      ],
      correctAnswer: 'Fear of flying'
    },
    {
      question: 'What is Globophobia?',  //question 4
      answers: [
        'Fear of shoes',
        'Fear of globes',
        'Fear of balloons',
        'Fear of clowns'
      ],
      correctAnswer: 'Fear of balloons'
    },
    {
      question: 'What is Cherophobia?',  //question 5
      answers: [
        'Fear of cherries',
        'Fear of alpacas',
        'Fear of happiness',
        'Fear of NYC'
      ],
      correctAnswer: 'Fear of happiness'
    },
    {
      question: 'What is Bathmophobia?',  //question 6
      answers: [
        'Fear of demons',
        'Fear of baths',
        'Fear of stairs or steep slopes',
        'Fear of fans'
      ],
      correctAnswer: 'Fear of stairs or steep slopes'
    },
    {
      question: 'What is Nosocomephobia?',  //question 7
      answers: [
        'Fear of dirty floors',
        'Fear of hospitals',
        'Fear of monkeys',
        'Fear of long cords'
      ],
      correctAnswer: 'Fear of hospitals'
    },
    {
      question: 'What is Venustraphobia?',  //question 8
      answers: [
        'Fear of beautiful women',
        'Fear of straps',
        'Fear of Venus Fly Traps',
        'Fear of the planet Venus'
      ],
      correctAnswer: 'Fear of beautiful women'
    },
    {
      question: 'What is Octophobia?',  //question 9
      answers: [
        'Fear of octopus',
        'Fear of long stretches of road',
        'Fear of massages',
        'Fear of the figure 8'
      ],
      correctAnswer: 'Fear of the figure 8'
    },
    {
      question: 'What is Porphyrophobia?',  //question 10
      answers: [
        'Fear of the color purple',
        'Fear of cashews',
        'Fear of birthday cards',
        'Fear of being alone'
      ],
      correctAnswer: 'Fear of the color purple'
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

//Generates HTML code for the start screen for fill in

//HTML code that will be inserted for the start page
function generateStartHtml() {
  return `
    <div class="startScreen">
      <p>How much do you know about phobias and what they are?</p>
      <p>Take this question today and find out!</p>
      <button type="button" id="start">Start Quiz!!!</button>
    </div>
  `;
}

//Generates the HTML for the section of the app 
//which will display the question number and the score

function generateNumScoreHtml() {
  return `
    <ul class="question-score-field">
      <li id="number">
        Question Number: ${store.currentQuestion + 1}/${store.questions.length}
      </li>
      <li id="score">
        Quiz Score: ${store.score}/${store.questions.length}
      </li>
    </ul>
  `;
}

// generates the html values to the user ask the current question

// fieldset is used to group related elements in a form.  
function generateQuestionHtml() {
  let currentQuestion = store.questions[store.currentQuestion];
  return `
    <form id="questionsgenerated" class="questionsgenerated">
      <fieldset>
        <div class="question">
          <legend>${currentQuestion.question}</legend>  
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submitAnsButton" tabindex="5">Submit Answer</button>
        <button type="button" id="nextQuestionButton" tabindex="6"> Next Question </button>
      </fieldset>
    </form >
  `;
}

//brings up the list of answers to choose from

function generateAnswersHtml() {
  let answersHtml = '';  
  let i = 0;
  const finalAnswers = store.questions[store.currentQuestion].answers

  finalAnswers.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}

//html for results screen

function generateResults() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div>
            <div>
              <legend>You got ${store.score} out of ${store.questions.length} questions correct.</legend>
            </div>
          </div>
          <div>
            <div>
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}

//response regarding answer choice (correct or wrong)

function generateFeedbackHTML(answerStatus) {
  let html = '';
  let correctAnswer = store.questions[store.currentQuestion].correctAnswer;

  if (answerStatus === 'correct') {
    html = `
    <div class="correctAns">That is correct!  Look at you!</div>
    `;
  }
  else if (answerStatus === 'not correct') {
    html = `
      <div class="wrongAns">Your response is incorrect. The correct answer is ${correctAnswer}.  Now you know!</div>
    `;
  }
  return html;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';

  if (store.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  }

  else if (store.currentQuestion >= 0 && store.currentQuestion < store.questions.length) {
    html = generateNumScoreHtml();
    html += generateQuestionHtml();
    $('main').html(html);
  }

  else {
    $('main').html(generateResults());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// function for start button click
function handleStartClick() {
  $('main').on('click', '#start', function (event) {
    store.quizStarted = true;
    render();
  });
}

// function for next question button click
function handleNextQuestionClick() {
  $('body').on('click', '#nextQuestionButton', (event) => {
    render();
  });
}

// function for the submit function of the form
function handleQuestionFormSubmission() {
  $('body').on('submit', '#questionsgenerated', function (event) {
    event.preventDefault();
    const currentQuestion = store.questions[store.currentQuestion];

    //value of the selected option that user checked in form
    let selectedOption = $('input[name=options]:checked').val();

    //identifying option containers
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      store.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('not correct'));
    }
    store.currentQuestion++;
    // hide the submit button
    $('#submitAnsButton').hide();
    // disable rest of input items
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#nextQuestionButton').show();

  });
}

// handles the restart button
function handleRestartButtonClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

//resets everything once quiz restarted
function restartQuiz() {
  store.quizStarted = false;
  store.currentQuestion = 0;
  store.score = 0;
}


//phobia quiz app jquery initializing function items
function phobiaQuizApp() {
  render();
  handleStartClick();
  handleNextQuestionClick();
  handleQuestionFormSubmission();
  handleRestartButtonClick();
}

//call function to begin  
$(phobiaQuizApp);