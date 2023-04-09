// set timer
let timer = document.querySelector("#timer");
let counDownSecond = 15;
let timeLeft = counDownSecond;
let timeCounter = setInterval(function () {
  timer.textContent = timeLeft + " Seconds left.";
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timeCounter);
    timer.textContent = "Time's Up!";
    showDoneBtn();
  }
}, 1000);

// set questions and options
let question = document.getElementById("question");
let choice = document.querySelectorAll(".option-text");
console.log(choice);
let currentQuestion = {}; //to put the selected question object from the array here
let score = 0;
let questionCounter = 0;
let bonus = 10;
let fine = -5;
let maxNumQuestions = 3;

let availableQuestions = []; //this array takes all the question objects from questionDepot array and keeps them, but eliminates the ones that are asked already
let questionDepot = [
  {
    question: "What is the sigil of House Stark?",
    option1: "Lion",
    option2: "Dragon",
    option3: "Wolf",
    option4: "Bird",
    answer: 3,
    validation: "",
  },
  {
    question: "Who pushed Bran out of the window?",
    option1: "Jon Snow",
    option2: "Jamie Lannister",
    option3: "Daenerys Targaryen",
    option4: "Jorah Mormont",
    answer: 2,
  },
  {
    question: "What is the name of Jon’s direwolf?",
    option1: "Rhaegal",
    option2: "Summer",
    option3: "Nymeria",
    option4: "Ghost",
    answer: 4,
  },
];

function takeQuiz() {
  availableQuestions = [...questionDepot]; //... called spread array makes a copy of question depot to available questions and any changes on available array will not affect question depot
  getNewQuestion();
}

function getNewQuestion() {
  let questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex]; //uses the random number (index) generated in the previous step to get the object form question depot
  question.textContent = currentQuestion.question;
  for (let i = 0; i < choice.length; i++) {
    choice[i].textContent = currentQuestion["option" + (i + 1)];
  }
  availableQuestions.splice(questionIndex, 1); //to remove the asked question from the question list so it doesn't ask repeated questions
}

function checkAnswer(element) {
  let chosenOption = element.dataset.number;
  let correctAnswer = currentQuestion.answer;

  let msgPosition = document.querySelector(".container"); //but it still doesn't work
  questionCounter++;
  if (correctAnswer == chosenOption) {
    let myH4 = document.createElement("h4");

    myH4.textContent = "Correct! 👍";
    myH4.style.color = "green";
    msgPosition.appendChild(myH4);
    score += bonus;
    setTimeout(() => {
      msgPosition.removeChild(myH4);
      if (questionCounter < maxNumQuestions) {
        getNewQuestion();
        //checks if the enough number of questions are shown, if not, runs the function again
      } else if (questionCounter >= maxNumQuestions || timeLeft < 0) {
        localStorage.setItem("highScore", score);
        showDoneBtn();
      }
    }, 2000);
  } else {
    let myH4 = document.createElement("h4");
    myH4.textContent = "Wrong! 👎";
    myH4.style.color = "red";
    score += fine;
    msgPosition.appendChild(myH4);
    setTimeout(() => {
      msgPosition.removeChild(myH4);
      if (questionCounter < maxNumQuestions) {
        getNewQuestion();
        //checks if the enough number of questions are shown, if not, runs the function again
      } else if (questionCounter >= maxNumQuestions || timeLeft < 0) {
        localStorage.setItem("highScore", score);
        showDoneBtn();
      }
    }, 2000);
  }
}

function showDoneBtn() {
  let showBtn = document.querySelector(".done-link");
  showBtn.style.visibility = "visible";
}

takeQuiz();
