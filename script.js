// --- CONFIG ---
const KEY_GOAL = 'blob_goal';
const KEY_STREAK = 'blob_streak';

const PHRASES = {
    start: ["I am formless.", "Give me shape.", "Feed me streaks.", "Waiting..."],
    low: ["I'm getting blue.", "Okay, not bad.", "More please.", "I feel a tingle."],
    mid: ["I AM PINK NOW.", "Look at me glow.", "We are unstoppable.", "So squishy!"],
    high: ["GOLDEN GOD.", "ASCENDED.", "PURE ENERGY.", "BOW BEFORE ME."],
    broken: ["I melted.", "Back to puddle.", "Whyyyy.", "Sad blob sounds."]
};

// DOM
const setupLayer = document.getElementById('setup-layer');
const activeLayer = document.getElementById('active-layer');
const goalInput = document.getElementById('goal-input');
const displayGoal = document.getElementById('display-goal');
const streakEl = document.getElementById('streak-num');
const textEl = document.getElementById('blob-text');
const blob = document.getElementById('the-blob');
const wrapper = document.querySelector('.blob-wrapper');

// STATE
let goalName = localStorage.getItem(KEY_GOAL) || "";
let streak = parseInt(localStorage.getItem(KEY_STREAK) || "0");

// INIT
if (goalName) showActiveLayer(); else showSetupLayer();

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
    if (!val) return;
    goalName = val;
    localStorage.setItem(KEY_GOAL, goalName);
    showActiveLayer();
}

function checkIn() {
    streak++; // Demo mode: No date check, infinite clicking
    localStorage.setItem(KEY_STREAK, streak);

    // Animation
    wrapper.classList.remove('anim-bounce', 'anim-shake');
    void wrapper.offsetWidth; // Reflow
    wrapper.classList.add('anim-bounce');

    updateUI(true);
}

function breakStreak() {
    streak = 0;
    localStorage.setItem(KEY_STREAK, streak);
    
    // Animation
    wrapper.classList.remove('anim-bounce', 'anim-shake');
    void wrapper.offsetWidth;
    wrapper.classList.add('anim-shake');
    
    updateUI(false, true); // Trigger sad state
}

function updateUI(isCheckIn, isBroken = false) {
    streakEl.innerText = streak;

    // Mood Logic
    let moodClass = "mood-neutral";
    let texts = PHRASES.start;

    if (isBroken) {
        moodClass = "mood-sad";
        texts = PHRASES.broken;
    } else if (streak >= 15) {
        moodClass = "mood-gold";
        texts = PHRASES.high;
    } else if (streak >= 5) {
        moodClass = "mood-happy"; // Pink
        texts = PHRASES.mid;
    } else if (streak >= 1) {
        moodClass = "mood-sus"; // Blue
        texts = PHRASES.low;
    } else {
        moodClass = "mood-neutral";
        texts = PHRASES.start;
    }

    // Apply Mood
    blob.className = "blob " + moodClass;

    // Update Text
    if (isCheckIn || isBroken || streak > 0) {
        const rand = Math.floor(Math.random() * texts.length);
        textEl.innerText = texts[rand];
    } else {
         textEl.innerText = PHRASES.start[0];
    }
}

function resetAll() {
    if(confirm("Delete goal and reset?")) {
        localStorage.clear();
        location.reload();
    }
}
