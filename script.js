// --- CONFIG ---
const KEY_GOAL = 'bunny_goal';
const KEY_STREAK = 'bunny_streak';

// Phrases
const TEXTS = {
    start: [
        "I'm listening...", "Hop to it.", "Don't make me wait.", "My ears are up.", 
        "Are you gonna do it?", "I'm watching you."
    ],
    low: [
        "That's it?", "I've seen better hops.", "Barely trying.", "One day? Cute.", 
        "My grandma hops faster.", "You call that a streak?", "Yawn."
    ],
    mid: [
        "Not bad, human.", "I'm twitching with approval.", "Keep going.", 
        "Okay, I'm listening.", "Don't drop the carrot now.", "Acceptable effort.",
        "You might actually make it."
    ],
    high: [
        "A M A Z I N G.", "I am your biggest fan.", "Bunny approved!", 
        "Pure dedication.", "You are glowing.", "I bow to your skills.",
        "Legendary status."
    ],
    broken: [
        "MY HEART IS BROKEN.", "Back to the burrow.", "Why did you stop?", 
        "I am disappointed.", "You abandoned me.", "Back to zero. Sad.",
        "My ears are drooping."
    ]
};

// DOM Elements
const setupLayer = document.getElementById('setup-layer');
const activeLayer = document.getElementById('active-layer');
const goalInput = document.getElementById('goal-input');
const displayGoal = document.getElementById('display-goal');
const streakEl = document.getElementById('streak-num');
const textEl = document.getElementById('roast-text');
const bunny = document.getElementById('bunny-face');

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
    streak++;
    localStorage.setItem(KEY_STREAK, streak);

    // Random Celebration Animation
    const animations = ['anim-flip', 'anim-pop', 'anim-wiggle'];
    const randAnim = animations[Math.floor(Math.random() * animations.length)];
    
    // Reset anims
    bunny.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
    void bunny.offsetWidth; // Trigger reflow
    bunny.classList.add(randAnim);

    updateUI(true);
}

function breakStreak() {
    streak = 0;
    localStorage.setItem(KEY_STREAK, streak);
    
    // Angry Shake
    bunny.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
    void bunny.offsetWidth;
    bunny.classList.add('anim-shake');
    
    updateUI(false, true); // Trigger angry text
}

function updateUI(isCheckIn, isBroken = false) {
    streakEl.innerText = streak;

    // Determine Mood & Text
    let mood = "mood-bored";
    let texts = TEXTS.start;

    if (isBroken) {
        mood = "mood-angry";
        texts = TEXTS.broken;
    } else if (streak >= 15) {
        mood = "mood-love";
        texts = TEXTS.high;
    } else if (streak >= 10) {
        mood = "mood-shocked";
        texts = TEXTS.high;
    } else if (streak >= 5) {
        mood = "mood-happy";
        texts = TEXTS.mid;
    } else if (streak >= 1) {
        mood = "mood-sus";
        texts = TEXTS.low;
    } else {
        mood = "mood-bored";
        texts = TEXTS.start;
    }

    bunny.className = "head " + mood;
    // Re-add anim if needed, but className overwrite might strip it. 
    // Usually we just let the animation play out from the click function.

    // Set Text
    if (isCheckIn || isBroken || streak > 0) {
        const rand = Math.floor(Math.random() * texts.length);
        textEl.innerText = texts[rand];
    } else {
         textEl.innerText = TEXTS.start[0];
    }
}

function resetAll() {
    if(confirm("Reset entire widget?")) {
        localStorage.clear();
        location.reload();
    }
}
