// --- CONFIGURATION ---
const KEY_GOAL = 'bunny_final_goal';
const KEY_STREAK = 'bunny_final_streak';
const KEY_DATE = 'bunny_final_date';

const TEXTS = {
    start: [
        "I'm listening...", "Hop to it.", "Don't make me wait.", 
        "My ears are up.", "I'm watching you."
    ],
    low: [
        "That's it?", "I've seen better hops.", "Barely trying.", 
        "One day? Cute.", "Yawn."
    ],
    mid: [
        "Not bad, human.", "Twitching with approval.", 
        "Okay, I'm listening.", "Don't drop the carrot.", "Acceptable."
    ],
    high: [
        "A M A Z I N G.", "I am your biggest fan.", "Bunny approved!", 
        "Pure dedication.", "Legendary status."
    ],
    broken: [
        "MY HEART IS BROKEN.", "Back to the burrow.", "Why did you stop?", 
        "Disappointed.", "Back to zero. Sad."
    ]
};

// DOM
const setupLayer = document.getElementById('setup-layer');
const activeLayer = document.getElementById('active-layer');
const goalInput = document.getElementById('goal-input');
const displayGoal = document.getElementById('display-goal');
const streakEl = document.getElementById('streak-num');
const textEl = document.getElementById('roast-text');
const bunny = document.getElementById('bunny-face');
const checkInBtn = document.getElementById('checkin-btn');

// STATE
let goalName = localStorage.getItem(KEY_GOAL) || "";
let streak = parseInt(localStorage.getItem(KEY_STREAK) || "0");

// INIT
init();

function init() {
    // 1. Check Date Logic (Real Persistence)
    const lastDate = localStorage.getItem(KEY_DATE);
    if (lastDate) {
        const today = new Date().setHours(0,0,0,0);
        const last = new Date(lastDate).setHours(0,0,0,0);
        const diff = (today - last) / (1000 * 60 * 60 * 24);

        if (diff === 0) {
            // Already done today
            checkInBtn.disabled = true;
            checkInBtn.innerText = "DONE FOR TODAY";
        } else if (diff > 1) {
            // Missed a day
            streak = 0;
            localStorage.setItem(KEY_STREAK, 0);
            updateUI(false, true); // Trigger angry state on load
        }
    }

    if (goalName) showActiveLayer(); else showSetupLayer();
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
    if (streak > 0 && !checkInBtn.disabled) updateUI(false); 
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
    const now = new Date();
    localStorage.setItem(KEY_STREAK, streak);
    localStorage.setItem(KEY_DATE, now.toISOString());

    // Disable button for today
    checkInBtn.disabled = true;
    checkInBtn.innerText = "DONE FOR TODAY";

    // Random Animation
    const animations = ['anim-flip', 'anim-pop', 'anim-wiggle'];
    const randAnim = animations[Math.floor(Math.random() * animations.length)];
    
    bunny.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
    void bunny.offsetWidth; 
    bunny.classList.add(randAnim);

    // Bounce Counter
    streakEl.classList.remove('bounce');
    void streakEl.offsetWidth;
    streakEl.classList.add('bounce');

    updateUI(true);
}

function breakStreak() {
    if(confirm("Are you sure? This will reset your streak to 0.")) {
        streak = 0;
        localStorage.setItem(KEY_STREAK, streak);
        
        // Reset button state so they can start over
        checkInBtn.disabled = false;
        checkInBtn.innerText = "I DID IT!";
        
        // Angry Shake
        bunny.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
        void bunny.offsetWidth;
        bunny.classList.add('anim-shake');
        
        updateUI(false, true);
    }
}

function updateUI(isCheckIn, isBroken = false) {
    streakEl.innerText = streak;

    let mood = "mood-bored";
    let texts = TEXTS.start;

    if (isBroken) {
        mood = "mood-angry";
        texts = TEXTS.broken;
    } else if (streak >= 10) {
        mood = "mood-happy"; // or love
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
