let questions =[
  {
    question: "In what galaxy is our solar system located?",
    answers: [
      {text: "Black eye Galaxy", correct: false},
      {text: "Cartwheel Galaxy", correct: false},
      {text: "The Milky Way", correct: true},
      {text: "Andromeda Galaxy", correct: false},
    ]
  },
  {
    question: "The sun rises in the…?",
    answers: [
      {text: "West", correct: false},
      {text: "East", correct: true},
      {text: "North", correct: false},
      {text: "South", correct: false},
    ]
  },
  {
    question: "How many years are in a millennia?",
    answers: [
      {text: "1000", correct: true},
      {text: "100", correct: false},
      {text: "10000", correct: false},
      {text: "10", correct: false},
    ]
  },
  {
    question: "Who is known as the 'Father of Modern Physics'?",
    answers: [
      {text: "Benjamin Franklin", correct: false},
      {text: "Albert Einstein", correct: true},
      {text: "Edwin Hubble", correct: false},
      {text: "Charles Darwin", correct: false},
    ]
  },
  {
    question: "What is the world's smallest continent?",
    answers: [
      {text: "Asia", correct: false},
      {text: "South America", correct: false},
      {text: "Europe", correct: false},
      {text: "Australia", correct: true},
    ]
  },
  {
    question: "In what year did the Titanic sink?",
    answers: [
      {text: "1912", correct: true},
      {text: "1947", correct: false},
      {text: "1890", correct: false},
      {text: "1998", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score =0;
  nextButton.innerHTML= "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add(".btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });

}

function resetState(){
  nextButton.style.display ="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;

  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
     button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore(){
  resetState();
  questionElement.innerHTML =`You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Quiz Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})
startQuiz();