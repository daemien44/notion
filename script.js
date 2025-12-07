// --- CONFIGURATION ---
const KEY_GOAL = 'judgy_cat_goal_name';
const KEY_STREAK = 'judgy_cat_streak_count';

const TEXTS = {
    start: ["My expectations are low.", "Prove me wrong.", "Don't disappoint me."],
    low: ["Is that it?", "Do better.", "Yawn.", "One. Cute."],
    mid: ["Okay, not bad.", "I'm watching you.", "Acceptable.", "Don't stop now."],
    high: ["Actually impressive.", "You're glowing.", "I approve.", "Who are you?"],
};

// --- DOM ELEMENTS ---
const setupLayer = document.getElementById('setup-layer');
const activeLayer = document.getElementById('active-layer');
const goalInput = document.getElementById('goal-input');
const displayGoal = document.getElementById('display-goal');

const streakEl = document.getElementById('streak-num');
const textEl = document.getElementById('roast-text');
const cat = document.getElementById('cat-face');

// --- STATE ---
let goalName = localStorage.getItem(KEY_GOAL) || "";
let streak = parseInt(localStorage.getItem(KEY_STREAK) || "0");

// --- INITIALIZATION ---
if (goalName) {
    showActiveLayer();
} else {
    showSetupLayer();
}

// --- FUNCTIONS ---

function showSetupLayer() {
    setupLayer.classList.remove('hidden');
    activeLayer.classList.add('hidden');
}

function showActiveLayer() {
    setupLayer.classList.add('hidden');
    activeLayer.classList.remove('hidden');
    displayGoal.innerText = goalName;
    updateUI(false);
}

function saveGoal() {
    const val = goalInput.value.trim();
    if (!val) return alert("Enter a goal!");
    
    goalName = val;
    localStorage.setItem(KEY_GOAL, goalName);
    showActiveLayer();
}

function checkIn() {
    // 1. Increment Streak (Unlimited for Demo)
    streak++;
    localStorage.setItem(KEY_STREAK, streak);

    // 2. Animate Number
    streakEl.classList.remove('bounce');
    void streakEl.offsetWidth; // Trigger reflow
    streakEl.classList.add('bounce');

    // 3. Update Cat and Text
    updateUI(true);
}

function updateUI(isCheckIn) {
    streakEl.innerText = streak;

    // Determine Mood
    let mood = "mood-bored";
    let texts = TEXTS.start;

    if (streak === 0) {
        mood = "mood-bored";
        texts = TEXTS.start;
    } else if (streak >= 10) {
        mood = "mood-happy";
        texts = TEXTS.high;
    } else if (streak >= 3) {
        mood = "mood-sus";
        texts = TEXTS.mid;
    } else {
        mood = "mood-bored";
        texts = TEXTS.low;
    }

    cat.className = "cat-head " + mood;

    // Change text if checking in or if text is currently default
    if (isCheckIn || streak > 0) {
        const rand = Math.floor(Math.random() * texts.length);
        textEl.innerText = texts[rand];
    }
}

function resetAll() {
    if(confirm("Reset everything?")) {
        localStorage.clear();
        location.reload();
    }
}

