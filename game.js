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
  {
    question:
      "What is the name of the Night's Watch headquarters in Game of Thrones?",
    option1: "The Red Keep",
    option2: "The Wall",
    option3: "Winterfell",
    option4: "Castle Black",
    answer: 4,
  },
  {
    question: "What is Jamie Lannisters nickname",
    option1: "The Blackfish",
    option2: "The Kingslayer",
    option3: "The Hound",
    option4: "The Mountain",
    answer: 2,
  },
  {
    question: "Who said “A mind needs books like a sword needs a whetstone”?",
    option1: "Jon Snow",
    option2: "Tyrion Lannister",
    option3: "Samwell Tarly",
    option4: "Lord Varys",
    answer: 2,
  },
  {
    question: "What do we say to the Lord of Death?",
    option1: "Valar Morghulis",
    option2: "Valar Dohaeris",
    option3: "Dracarys",
    option4: "Not today",
    answer: 4,
  },
  {
    question: "What is Gendry’s weapon of choice?",
    option1: "A sword",
    option2: "A mace",
    option3: "A warhammer",
    option4: "A crossbow",
    answer: 3,
  },
  {
    question: "Where in King’s Landing are Gendry and Ser Davos Seaworth from?",
    option1: "Flea Bottom",
    option2: "The Red Keep",
    option3: "The Street of Steel",
    option4: "The Dragonpit",
    answer: 1,
  },
  {
    question:
      "Who composed the iconic music for the Game of Thrones TV series?",
    option1: "Hans Zimmer",
    option2: "John Williams",
    option3: "Ramin Djawadi",
    option4: "Howard Shore",
    answer: 3,
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
