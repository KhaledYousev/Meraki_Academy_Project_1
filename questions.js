let questions = [
  {
    question: "What is the /Mafjoo3a/ element in HTML Display?",
    choice1: "Block Element",
    choice2: "Array ELement",
    choice3: "Inline ELement",
    choice4: "<Tags> ELement",
    answer: 1,
  },
  {
    question: "What date Cohort 2 had been started?",
    choice1: "26/4/2021",
    choice2: "27/4/2021",
    choice3: "28/04/2021",
    choice4: "29/04/2021",
    answer: 3,
  },
  {
    question: "How do you write 'MoMo' in an alert box?",
    choice1: "msgBox('MoMo');",
    choice2: "alertBox('MoMo');",
    choice3: "alert('MOMO');",
    choice4: "nono of the above",
    answer: 4,
  },
  {
    question: "What is Meraki meaning?",
    choice1: "Doing something with soul",
    choice2: "Being correct",
    choice3: "Love",
    choice4: "Nono of the above",
    answer: 1,
  },
  {
    question: "What is A value? A=5+55+5+'55'",
    choice1: "555555",
    choice2: "120",
    choice3: "6555",
    choice4: "nono of the above",
    answer: 3,
  },
  {
    question: "How many legs does a lobester have?",
    choice1: "Ten",
    choice2: "Six",
    choice3: "Eight",
    choice4: "Sixteen",
    answer: 1,
  },
  {
    question: "Hippopotomonstrosesquippedaliophobia is the fear of____",
    choice1: "Unusual Names",
    choice2: "Fluffy Clouds",
    choice3: "Large Hippos",
    choice4: "Long Word",
    answer: 4,
  },
  {
    question: "Can you cough or sneeze in your deep sleep?",
    choice1: "Yes",
    choice2: "No",
    choice3: "COVID-19",
    choice4: "None of the above",
    answer: 2,
  },
  {
    question: "Which came first?",
    choice1: "iPhone",
    choice2: "Facebook",
    choice3: "Netflix",
    choice4: "Samsung (Android)",
    answer: 2,
  },
  {
    question: "What is the second largest country(in size) in the world?",
    choice1: "USA",
    choice2: "China",
    choice3: "Canada",
    choice4: "Russia",
    answer: 3,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

startquestions = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startquestions();
