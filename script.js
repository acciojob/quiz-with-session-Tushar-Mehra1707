const questions = [
  {
    question: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
    answer: 2
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "What color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: 0
  },
  {
    question: "Which is a mammal?",
    options: ["Shark", "Dolphin", "Octopus", "Trout"],
    answer: 1
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2
  }
];

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuiz() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    div.appendChild(questionText);

    q.options.forEach((option, j) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = j;

      // Check saved selection
      if (progress[i] !== undefined && progress[i] == j) {
        input.checked = true;
      }

      // Save selection on change
      input.addEventListener("change", () => {
        progress[i] = j;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    container.appendChild(div);
  });
}

// Calculate score and store it
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (progress[i] != null && parseInt(progress[i]) === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  document.getElementById("score").textContent = scoreText;

  localStorage.setItem("score", score);
  sessionStorage.removeItem("progress");
});

// Display saved score if available
const savedScore = localStorhttps://www.svgrepo.com/show/345221/three-dots.svgage.getItem("score");
if (savedScore !== null) {
  document.getElementById("score").textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Initial render
renderQuiz();
