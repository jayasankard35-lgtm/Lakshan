// Navigation Logic
function navigateTo(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Global State
let isMusicPlaying = false;
const bgMusic = new Audio(); // Placeholder for music
bgMusic.loop = true;

// Play Section Data
const playElements = [
    { icon: '🐶', sound: 'Woof Woof!', name: 'Dog' },
    { icon: '🐱', sound: 'Meow!', name: 'Cat' },
    { icon: '🦁', sound: 'Roar!', name: 'Lion' },
    { icon: '🐮', sound: 'Moo!', name: 'Cow' },
    { icon: '🐷', sound: 'Oink!', name: 'Pig' },
    { icon: '🐵', sound: 'Ooh Ooh Aah Aah!', name: 'Monkey' },
    { icon: '🚗', sound: 'Vroom Vroom!', name: 'Car' },
    { icon: '✈️', sound: 'Whoosh!', name: 'Plane' },
    { icon: '🚀', sound: 'Blast off!', name: 'Rocket' },
    { icon: '🎈', sound: 'Pop!', name: 'Balloon' },
    { icon: '☀️', sound: 'Good morning!', name: 'Sun' },
    { icon: '⭐', sound: 'Twinkle twinkle!', name: 'Star' }
];

// Initialize Play Grid
function initPlayGrid() {
    const grid = document.getElementById('play-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    playElements.forEach(item => {
        const div = document.createElement('div');
        div.className = 'play-card';
        div.innerHTML = item.icon;
        div.onclick = () => playInteraction(item);
        grid.appendChild(div);
    });
}

function playInteraction(item) {
    // Simple Speech Synthesis for sounds if audio files aren't provided
    const utterance = new SpeechSynthesisUtterance(item.sound);
    utterance.rate = 1.2;
    utterance.pitch = 1.5;
    window.speechSynthesis.speak(utterance);
    
    // Add temporary animation class if needed
    console.log(`Interacted with ${item.name}`);
}

// Learn Section Logic
const learnData = {
    abc: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({ val: l, sound: l })),
    123: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => ({ val: n, sound: n.toString() })),
    animals: playElements.slice(0, 6).map(a => ({ val: a.icon, sound: a.name }))
};

function showLearnCategory(cat) {
    const content = document.getElementById('learn-content');
    if (!content) return;
    
    content.innerHTML = '';
    const items = learnData[cat];
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'play-card';
        div.innerHTML = item.val;
        div.onclick = () => {
            const utter = new SpeechSynthesisUtterance(item.sound);
            window.speechSynthesis.speak(utter);
        };
        content.appendChild(div);
    });
}

// Sleep Mode Logic
const sleepToggle = document.getElementById('sleep-toggle');
const sleepOverlay = document.getElementById('sleep-overlay');

if (sleepToggle) {
    sleepToggle.onclick = () => {
        sleepOverlay.classList.toggle('active');
        if (sleepOverlay.classList.contains('active')) {
            startLullaby();
        } else {
            stopLullaby();
        }
    };
}

function startLullaby() {
    console.log("Playing soft lullaby...");
    // Fallback if no music: quiet speech
    const utter = new SpeechSynthesisUtterance("Goodnight Lakshan");
    utter.rate = 0.5;
    window.speechSynthesis.speak(utter);
}

function stopLullaby() {
    window.speechSynthesis.cancel();
}

// Rhymes Section Logic
const rhymesData = [
    {
        title: 'Twinkle Twinkle',
        icon: '⭐',
        lyrics: [
            { text: "Twinkle twinkle little star", time: 3000 },
            { text: "How I wonder what you are", time: 7000 },
            { text: "Up above the world so high", time: 11000 },
            { text: "Like a diamond in the sky", time: 15000 }
        ],
        anim: 'star'
    },
    {
        title: 'Machli Jal Ki Rani Hai',
        icon: '🐟',
        lyrics: [
            { text: "Machli jal ki rani hai", time: 3000 },
            { text: "Jeevan uska pani hai", time: 7000 },
            { text: "Haath lagao toh darr jayegi", time: 11000 },
            { text: "Bahar nikalo toh marr jayegi", time: 15000 }
        ],
        anim: 'fish'
    },
    {
        title: 'Nani Teri Morni',
        icon: '🦚',
        lyrics: [
            { text: "Nani teri morni ko chor le gaye", time: 4000 },
            { text: "Baaki jo bacha tha kale chor le gaye", time: 8000 },
            { text: "Khaake peeke mote hoke chor baithe rail mein", time: 12000 },
            { text: "Choron wala dabba katke pahuncha seedha jail mein", time: 16000 }
        ],
        anim: 'morni'
    },
    {
        title: 'Chanda Mama Door Ke',
        icon: '🌙',
        lyrics: [
            { text: "Chanda mama door ke", time: 3000 },
            { text: "Puye pakaye burr ke", time: 7000 },
            { text: "Aap khaye thali mein", time: 11000 },
            { text: "Munne ko de pyali mein", time: 15000 }
        ],
        anim: 'moon'
    },
    {
        title: 'Lakdi Ki Kaathi',
        icon: '🐎',
        lyrics: [
            { text: "Lakdi ki kaathi", time: 3000 },
            { text: "Kaathi pe ghoda", time: 7000 },
            { text: "Ghode ki dum pe jo maara hathoda", time: 11000 },
            { text: "Dauda dauda dauda ghoda dum utha ke dauda", time: 15000 }
        ],
        anim: 'horse'
    }
];

let currentRhyme = null;
let rhymeInterval = null;
let rhymeStartTime = 0;
let isRhymePaused = false;

function initRhymes() {
    console.log("Initializing Rhymes...");
    const list = document.getElementById('rhymes-list');
    if (!list) {
        console.error("Rhymes list container not found!");
        return;
    }
    list.innerHTML = '';
    rhymesData.forEach(r => {
        const div = document.createElement('div');
        div.className = 'play-card';
        div.style.backgroundColor = 'var(--sunny-yellow)';
        div.innerHTML = `<div style="font-size: 3.5rem">${r.icon}</div><div style="font-size: 1.2rem; margin-top: 10px; font-weight: bold;">${r.title}</div>`;
        div.onclick = (e) => {
            e.stopPropagation();
            console.log("Card clicked:", r.title);
            startRhyme(r);
        };
        list.appendChild(div);
    });
}

function startRhyme(rhyme) {
    currentRhyme = rhyme;
    const player = document.getElementById('rhyme-player');
    const display = document.getElementById('lyrics-display');
    const stage = document.getElementById('rhyme-anim');
    
    player.classList.remove('hidden');
    display.innerHTML = '';
    stage.innerHTML = '';
    
    updateRhymeAnimation(rhyme.anim);
    
    isRhymePaused = false;
    document.getElementById('play-pause-btn').innerHTML = '⏸️';
    
    // Combine all lyrics into one string for better singing flow
    const fullText = rhyme.lyrics.map(l => l.text).join(". ");
    const utter = new SpeechSynthesisUtterance(fullText);
    utter.rate = 0.65; // Slightly slower for better clarity
    utter.pitch = 1.3;  // Higher pitch for child-friendly voice
    
    // Track when each word/part is spoken to highlight lyrics
    let currentLineIndex = -1;
    utter.onboundary = (event) => {
        const charIdx = event.charIndex;
        let runningTotal = 0;
        
        for (let i = 0; i < rhyme.lyrics.length; i++) {
            const lineLen = rhyme.lyrics[i].text.length;
            if (charIdx >= runningTotal && charIdx < runningTotal + lineLen + 2) {
                if (currentLineIndex !== i) {
                    currentLineIndex = i;
                    display.innerHTML = `<div class="lyrics-line active">${rhyme.lyrics[i].text}</div>`;
                }
                break;
            }
            runningTotal += lineLen + 2; // +2 for ". "
        }
    };

    utter.onstart = () => { console.log("Started singing..."); };
    utter.onend = () => { if (!isRhymePaused) setTimeout(stopRhyme, 1500); };
    utter.onerror = (e) => { console.error("Speech error:", e); stopRhyme(); };

    window.speechSynthesis.cancel();
    // Small delay to ensure cancel finishes
    setTimeout(() => {
        window.speechSynthesis.speak(utter);
    }, 100);
}

function updateRhymeAnimation(type) {
    const stage = document.getElementById('rhyme-anim');
    if (!stage) return;
    stage.className = 'animation-stage ' + type;
    if (type === 'star') {
        stage.innerHTML = '<div class="anim-star" style="top:20%; left:30%">⭐</div><div class="anim-star" style="top:50%; left:70%">⭐</div>';
    } else if (type === 'fish') {
        stage.innerHTML = '<div class="anim-fish">🐟</div>';
    } else if (type === 'moon') {
        stage.innerHTML = '<div class="anim-moon">🌙</div>';
    } else if (type === 'horse') {
        stage.innerHTML = '<div style="font-size: 8rem; animation: bounce 1s infinite">🐎</div>';
    } else if (type === 'morni') {
        stage.innerHTML = '<div style="font-size: 8rem; animation: pulse 2s infinite">🦚</div>';
    } else {
        stage.innerHTML = `<div style="font-size: 8rem">${currentRhyme.icon}</div>`;
    }
}

function stopRhyme() {
    window.speechSynthesis.cancel();
    document.getElementById('rhyme-player').classList.add('hidden');
    isRhymePaused = false;
}

function toggleRhyme() {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            isRhymePaused = false;
            document.getElementById('play-pause-btn').innerHTML = '⏸️';
        } else {
            window.speechSynthesis.pause();
            isRhymePaused = true;
            document.getElementById('play-pause-btn').innerHTML = '▶️';
        }
    } else {
        // If it ended, restart
        startRhyme(currentRhyme);
    }
}

function restartRhyme() {
    stopRhyme();
    startRhyme(currentRhyme);
}

// Memory Milestones ... (keep existing)
const memoryMilestones = [
    { title: 'First Smile', date: 'Oct 2024', img: 'placeholder' },
    { title: 'First Steps', date: 'Mar 2025', img: 'placeholder' },
    { title: 'First Birthday', date: 'Apr 2025', img: 'placeholder' }
];

function initMemories() {
    const timeline = document.getElementById('memories-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    memoryMilestones.forEach(m => {
        const div = document.createElement('div');
        div.className = 'memory-item';
        div.innerHTML = `
            <h3>${m.title}</h3>
            <p>${m.date}</p>
            <div class="memory-img">📷</div>
        `;
        timeline.appendChild(div);
    });
}

// Surprise Trigger (Triple click on a corner or specific area)
let surpriseClicks = 0;
const trigger = document.getElementById('surprise-trigger');
if (trigger) {
    trigger.onclick = () => {
        surpriseClicks++;
        if (surpriseClicks >= 3) {
            showSurprise();
            surpriseClicks = 0;
        }
    };
}

function showSurprise() {
    const overlay = document.createElement('div');
    overlay.className = 'surprise-overlay';
    overlay.innerHTML = `
        <div class="heart">❤️</div>
        <h2 style="color: #ff5252">For Amma</h2>
        <div class="surprise-text" id="typing-text"></div>
        <button class="close-surprise" onclick="this.parentElement.remove()">Close</button>
    `;
    document.body.appendChild(overlay);

    const message = "Dear Amma, you are the most amazing person in Lakshan's world. Thank you for all the love, the sleepless nights, and the endless smiles. You are a superhero! ❤️";
    let i = 0;
    function typeEffect() {
        if (i < message.length) {
            document.getElementById('typing-text').innerHTML += message.charAt(i);
            i++;
            setTimeout(typeEffect, 50);
        }
    }
    typeEffect();
}

function createStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        container.appendChild(star);
    }
}

// Initialize
window.onload = () => {
    initPlayGrid();
    showLearnCategory('abc'); // Default learn view
    initRhymes();
    initMemories();
    createStars();
};
