const quizData = {
    "GK": [
        { q: "Capital of India?", o: ["Delhi", "Mumbai", "Chennai", "Kolkata"], a: "Delhi" },
        { q: "Largest ocean?", o: ["Atlantic", "Indian", "Pacific", "Arctic"], a: "Pacific" },
        { q: "National animal of India?", o: ["Lion", "Tiger", "Elephant", "Leopard"], a: "Tiger" },
        { q: "Who wrote National Anthem of India?", o: ["Tagore", "Gandhi", "Nehru", "Patel"], a: "Tagore" }
    ],
    "Science": [
        { q: "H2O is?", o: ["Oxygen", "Hydrogen", "Water", "Salt"], a: "Water" },
        { q: "Earth revolves around?", o: ["Moon", "Sun", "Mars", "Venus"], a: "Sun" },
        { q: "Gas used for breathing?", o: ["CO2", "Oxygen", "Nitrogen", "Helium"], a: "Oxygen" },
        { q: "Force that pulls objects to Earth?", o: ["Magnetism", "Gravity", "Friction", "Energy"], a: "Gravity" }
    ],
    "Maths": [
        { q: "5 × 6 = ?", o: ["30", "25", "20", "35"], a: "30" },
        { q: "Square root of 81?", o: ["7", "8", "9", "6"], a: "9" },
        { q: "10 + 15 = ?", o: ["20", "25", "30", "35"], a: "25" },
        { q: "Perimeter of square with side 4?", o: ["8", "12", "16", "20"], a: "16" }
    ],
    "Social Studies": [
        { q: "Who was first PM of India?", o: ["Nehru", "Gandhi", "Patel", "Modi"], a: "Nehru" },
        { q: "Democracy means?", o: ["Rule by king", "Rule by people", "Rule by army", "Rule by law"], a: "Rule by people" },
        { q: "Freedom year of India?", o: ["1945", "1947", "1950", "1930"], a: "1947" },
        { q: "Largest desert?", o: ["Sahara", "Thar", "Gobi", "Kalahari"], a: "Sahara" }
    ],
    "Computers": [
        { q: "Brain of computer?", o: ["CPU", "RAM", "Mouse", "Keyboard"], a: "CPU" },
        { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text", "None"], a: "Hyper Text Markup Language" },
        { q: "Input device?", o: ["Monitor", "Printer", "Keyboard", "Speaker"], a: "Keyboard" },
        { q: "Storage device?", o: ["Hard Disk", "Mouse", "Scanner", "Keyboard"], a: "Hard Disk" }
    ],
    "English": [
        { q: "Opposite of Happy?", o: ["Sad", "Joy", "Angry", "Smile"], a: "Sad" },
        { q: "Plural of Child?", o: ["Childs", "Children", "Childes", "Child"], a: "Children" },
        { q: "Verb in sentence: She runs fast", o: ["She", "runs", "fast", "None"], a: "runs" },
        { q: "Synonym of Big?", o: ["Small", "Large", "Tiny", "Short"], a: "Large" }
    ],
    "Sports": [
        { q: "Cricket bat made of?", o: ["Willow", "Bamboo", "Oak", "Pine"], a: "Willow" },
        { q: "Olympics held every?", o: ["2 years", "3 years", "4 years", "5 years"], a: "4 years" },
        { q: "Players in football team?", o: ["9", "10", "11", "12"], a: "11" },
        { q: "Tennis court surface?", o: ["Grass", "Sand", "Water", "Mud"], a: "Grass" }
    ],
    "Geography": [
        { q: "Largest continent?", o: ["Asia", "Africa", "Europe", "Antarctica"], a: "Asia" },
        { q: "Mount Everest in?", o: ["India", "Nepal", "China", "Bhutan"], a: "Nepal" },
        { q: "Longest river?", o: ["Nile", "Amazon", "Ganga", "Yangtze"], a: "Nile" },
        { q: "Capital of Japan?", o: ["Tokyo", "Beijing", "Seoul", "Bangkok"], a: "Tokyo" }
    ]
};

const categoryScreen = document.getElementById("category-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const categoriesDiv = document.getElementById("categories");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const categoryTitle = document.getElementById("category-title");
const scoreText = document.getElementById("score-text");

let currentCategory = "";
let questions = [];
let index = 0;
let score = 0;

Object.keys(quizData).forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => startQuiz(cat);
    categoriesDiv.appendChild(btn);
});

function startQuiz(cat) {
    currentCategory = cat;
    questions = quizData[cat];
    index = 0;
    score = 0;
    categoryTitle.textContent = cat;
    categoryScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
}
let answered = false;
function loadQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    const q = questions[index];
    questionEl.textContent = q.q;
    progressEl.textContent = `Q ${index + 1}/${questions.length}`;
    optionsEl.innerHTML = "";

    q.o.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(btn, opt);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(button, selected) {
    if (answered) return;   
    answered = true;
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questions[index].a) {
            btn.style.background = "#4CAF50";
            btn.style.color = "white";
        }
    });
    if (selected === questions[index].a) {
        score++;
    } else {
        button.style.background = "#f44336"; // wrong (red)
        button.style.color = "white";
    }
    nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${questions.length} in ${currentCategory}`;
}
