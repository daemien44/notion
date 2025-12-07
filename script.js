// --- CONFIGURATION ---
const STORAGE_KEY_STREAK = 'judgy_cat_streak';
const STORAGE_KEY_DATE = 'judgy_cat_last_checkin';

// Roasts & Compliments
const TEXTS = {
    start: ["My expectations are low.", "Prove me wrong.", "Don't disappoint me.", "Here we go..."],
    streak_low: ["Is that it?", "Do better.", "Yawn.", "Barely trying."],
    streak_mid: ["Okay, not bad.", "I'm watching you.", "Don't get cocky.", "Acceptable."],
    streak_high: ["Actually impressive.", "You're glowing.", "I approve.", "Masterful."],
    broken: ["YOU ABANDONED ME.", "Back to zero.", "I knew you'd fail.", "Disappointing."]
};

// --- DOM ELEMENTS ---
const streakEl = document.getElementById('streak-num');
const textEl = document.getElementById('roast-text');
const btn = document.getElementById('checkin-btn');
const cat = document.getElementById('cat-face');

// --- INITIALIZATION ---
// 1. Load data from local storage
let currentStreak = parseInt(localStorage.getItem(STORAGE_KEY_STREAK) || '0');
let lastCheckInDate = localStorage.getItem(STORAGE_KEY_DATE);

// 2. Check logic on page load
checkStreakStatus();
updateUI(false); // false means "don't play check-in animation"

// --- MAIN FUNCTIONS ---

function checkStreakStatus() {
    if (!lastCheckInDate) return; // First time user

    const today = new Date().setHours(0,0,0,0); // Midnight today
    const last = new Date(lastCheckInDate).setHours(0,0,0,0); // Midnight of last checkin
    
    // Difference in days (milliseconds / 1000ms / 60s / 60m / 24h)
    const diffDays = (today - last) / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
        // Already checked in today
        btn.disabled = true;
        btn.innerText = "DONE FOR TODAY";
    } else if (diffDays > 1) {
        // Missed a day! Streak broken.
        currentStreak = 0;
        localStorage.setItem(STORAGE_KEY_STREAK, '0');
        // Trigger angry mood immediately
        cat.className = "cat-head mood-angry";
        textEl.innerText = TEXTS.broken[Math.floor(Math.random() * TEXTS.broken.length)];
    }
    // If diffDays === 1, standard new day, waiting for check-in.
}

// Button Click Event
btn.addEventListener('click', () => {
    // 1. Increment Streak
    currentStreak++;
    
    // 2. Save Data
    const now = new Date();
    localStorage.setItem(STORAGE_KEY_STREAK, currentStreak);
    localStorage.setItem(STORAGE_KEY_DATE, now.toISOString());

    // 3. Update UI
    btn.disabled = true;
    btn.innerText = "DONE FOR TODAY";
    
    // Play Bounce Animation
    streakEl.classList.remove('bounce');
    void streakEl.offsetWidth; // Trigger reflow
    streakEl.classList.add('bounce');

    updateUI(true); // true = just checked in
});

function updateUI(justCheckedIn) {
    streakEl.innerText = currentStreak;

    // Determine Mood & Text based on Streak
    let mood = "mood-bored";
    let textOptions = TEXTS.start;

    if (currentStreak === 0) {
        mood = "mood-bored"; // or angry if broken, handled in checkStreakStatus
        textOptions = TEXTS.start;
    } else if (currentStreak >= 10) {
        mood = "mood-happy";
        textOptions = TEXTS.streak_high;
    } else if (currentStreak >= 3) {
        mood = "mood-sus";
        textOptions = TEXTS.streak_mid;
    } else {
        mood = "mood-bored";
        textOptions = TEXTS.streak_low;
    }

    // Only update mood/text if we just checked in or if it's a standard load
    // (We don't want to overwrite the "Angry" state if the streak was just broken on load)
    if (justCheckedIn || (currentStreak > 0)) {
        cat.className = "cat-head " + mood;
        const rand = Math.floor(Math.random() * textOptions.length);
        textEl.innerText = textOptions[rand];
    }
}

