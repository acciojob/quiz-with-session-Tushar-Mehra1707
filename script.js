const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis"
    ],
    answer: 0
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "none of the above"],
    answer: 1
  }
];

const questionsContainer = document.getElementById('questions');
const submitBtn = document.getElementById('submit');
const scoreDiv = document.getElementById('score');

// Load saved progress
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let submitted = false;

// Render questions and restore progress
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = `${qIndex + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = oIndex;

      if (savedProgress[qIndex] == oIndex) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        savedProgress[qIndex] = parseInt(oIndex);
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });
}

// Submit quiz and calculate score
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
  submitted = true;
});

// Show previous score if exists
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDiv.textContent = `Your score is ${lastScore} out of ${questions.length}.`;
}

renderQuestions();
