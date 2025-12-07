// --- CONFIG ---
const KEY_GOAL = 'bunny_demo_goal';
const KEY_STREAK = 'bunny_demo_streak';

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
const rig = document.getElementById('bunny-rig');

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
    // In Demo mode, we save streak but don't care about dates
    localStorage.setItem(KEY_STREAK, streak);

    // Random Animation
    const animations = ['anim-flip', 'anim-pop', 'anim-wiggle'];
    const randAnim = animations[Math.floor(Math.random() * animations.length)];
    
    // Reset animations
    rig.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
    void rig.offsetWidth; // Force Reflow
    rig.classList.add(randAnim);

    // Bounce Counter
    streakEl.classList.remove('bounce');
    void streakEl.offsetWidth;
    streakEl.classList.add('bounce');

    updateUI(true);
}

function breakStreak() {
    streak = 0;
    localStorage.setItem(KEY_STREAK, streak);
    
    // Angry Shake
    rig.classList.remove('anim-flip', 'anim-pop', 'anim-wiggle', 'anim-shake');
    void rig.offsetWidth;
    rig.classList.add('anim-shake');
    
    updateUI(false, true);
}

function updateUI(isCheckIn, isBroken = false) {
    streakEl.innerText = streak;

    let mood = "mood-bored";
    let texts = TEXTS.start;

    if (isBroken) {
        mood = "mood-angry";
        texts = TEXTS.broken;
    } else if (streak >= 15) {
        mood = "mood-love";
        texts = TEXTS.high;
    } else if (streak >= 10) {
        mood = "mood-happy";
        texts = TEXTS.high;
    } else if (streak >= 5) {
        mood = "mood-happy";
        texts = TEXTS.mid;
    } else if (streak >= 2) {
        mood = "mood-sus";
        texts = TEXTS.low;
    } else {
        mood = "mood-bored";
        texts = TEXTS.start;
    }

    rig.className = "bunny-wrapper " + mood;

    // Preserve animation class if it's currently running (simple hack for demo)
    // In a real app we'd manage classes more strictly, but this works for the demo feel.

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

