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
  }
}, 1000);

// set questions and options
let question = document.getElementById("question");
let choice = document.querySelectorAll(".option-text");
console.log(choice);
let currentQuestion = {}; //to put the selected question object from the array here
let score = 0;
let questionCounter = 0;
let bunus = 10;
let fine = -10;
let maxNumQuestions = 3;
let validationMsg = "";

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

  choice.forEach((element) => {
    let correctAnswer = currentQuestion.answer;

    element.addEventListener("click", function (event) {
      console.log(event);
      let chosenOption = element.dataset.number;
      questionCounter++;

      let msgPosition = document.querySelector(".container"); //but it still doesn't work
      validationMsg = currentQuestion.validation;

      let myH4 = document.createElement("h4");

      if (correctAnswer == chosenOption) {
        validationMsg = "Correct! 👍";
        myH4.textContent = validationMsg;
        myH4.style.color = "green";
        msgPosition.appendChild(myH4);
        setTimeout(() => {
          validationMsg = "";
          msgPosition.removeChild(myH4);
          myH4.remove();
          console.log(myH4);
        }, 2000);
      } else {
        validationMsg = "Wrong! 👎";
        myH4.textContent = validationMsg;
        myH4.style.color = "red";
        msgPosition.appendChild(myH4);
        setTimeout(() => {
          validationMsg = "";
          msgPosition.removeChild(myH4);
          myH4.remove();
          console.log(myH4);
        }, 2000);
      }
      if (questionCounter <= maxNumQuestions) {
        setTimeout(getNewQuestion, 2000);
        //checks if the enough number of questions are shown, if not, runs the function again
      }
    }); // add or subtract score
  });
}

takeQuiz();
