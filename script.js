const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const questionIndex = document.getElementById("question-index");
const answerButtonsElement = document.getElementById(
  "answer-buttons-container"
);
const showAnswerButton = document.getElementById("show-answer-button");

let currentQuestionIndex = 0;
let correctAnswers

startButton.addEventListener("click", () => {
  startGame();
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");

  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionIndex.innerText = `Question ${currentQuestionIndex + 1}`;

  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      correctAnswers++
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart the Quiz";
    startButton.style.backgroundColor = "red";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false },
      { text: "Quebec", correct: false },
    ],
  },
  {
    question: "What is the capital of New Zealand?",
    answers: [
      { text: "Wellington", correct: true },
      { text: "Christchurch", correct: false },
      { text: "Auckland", correct: false },
      { text: "Hamilton", correct: false },
    ],
  },

  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Seoul", correct: false },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: "Brasília", correct: true },
      { text: "Buenos Aires", correct: false },
      { text: "Rio de Janeiro", correct: false },
      { text: "Lima", correct: false },
    ],
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Canberra", correct: true },
      { text: "Melbourne", correct: false },
      { text: "Wellington", correct: false },
    ],
  },
  {
    question: "What is the capital of South Africa?",
    answers: [
      { text: "Nairobi", correct: false },
      { text: "Pretoria", correct: false },
      { text: "Johannesburg", correct: false },
      { text: "Cape Town", correct: true },
    ],
  },
];
