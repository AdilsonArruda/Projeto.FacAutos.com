// ==========================================
// SUPER SMASH TOONS - Game Engine
// ==========================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// ==========================================
// AUDIO ENGINE (Web Audio API)
// ==========================================
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.log('Audio not available');
        }
    }

    playTone(freq, duration, type = 'square', volume = 0.15) {
        if (!this.initialized) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.value = volume;
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }

    hit() { this.playTone(200, 0.1, 'sawtooth', 0.2); }
    punch() { this.playTone(150, 0.08, 'square', 0.15); }
    kick() { this.playTone(120, 0.12, 'sawtooth', 0.18); }
    special() {
        this.playTone(400, 0.15, 'square', 0.2);
        setTimeout(() => this.playTone(600, 0.15, 'square', 0.15), 80);
        setTimeout(() => this.playTone(800, 0.2, 'sawtooth', 0.15), 160);
    }
    block() { this.playTone(300, 0.05, 'sine', 0.1); }
    ko() {
        this.playTone(400, 0.2, 'square', 0.2);
        setTimeout(() => this.playTone(300, 0.2, 'square', 0.2), 200);
        setTimeout(() => this.playTone(200, 0.4, 'sawtooth', 0.25), 400);
    }
    fight() {
        [523, 659, 784, 1047].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.15, 'square', 0.15), i * 100);
        });
    }
    select() { this.playTone(500, 0.08, 'square', 0.1); }
    confirm() {
        this.playTone(600, 0.1, 'square', 0.12);
        setTimeout(() => this.playTone(800, 0.1, 'square', 0.12), 100);
    }
    win() {
        [523, 659, 784, 1047, 784, 1047].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.2, 'square', 0.15), i * 150);
        });
    }
}

const audio = new AudioEngine();

// ==========================================
// GAME STATE
// ==========================================
let gameState = {
    screen: 'title',
    p1Char: null,
    p2Char: null,
    p1SelectIndex: 0,
    p2SelectIndex: CHARACTERS.length - 1,
    p1Confirmed: false,
    p2Confirmed: false,
    round: 1,
    maxRounds: 3,
    p1Wins: 0,
    p2Wins: 0,
    timer: 99,
    timerInterval: null,
    fightStarted: false,
    paused: false
};

// ==========================================
// INPUT HANDLING
// ==========================================
const keys = {};
const keyPressed = {};

document.addEventListener('keydown', (e) => {
    if (!keys[e.key]) {
        keyPressed[e.key] = true;
    }
    keys[e.key] = true;
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    keyPressed[e.key] = false;
});

function consumeKeyPress(key) {
    if (keyPressed[key]) {
        keyPressed[key] = false;
        return true;
    }
    return false;
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
class Particle {
    constructor(x, y, color, vx, vy, life, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
        this.size = size || 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;
        this.life--;
    }

    draw(ctx) {
        let alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.globalAlpha = 1;
    }

    isDead() { return this.life <= 0; }
}

let particles = [];

function spawnHitParticles(x, y, color, count = 8) {
    for (let i = 0; i < count; i++) {
        let angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
        let speed = 2 + Math.random() * 3;
        particles.push(new Particle(
            x, y, color,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            15 + Math.random() * 10,
            2 + Math.random() * 3
        ));
    }
}

function spawnSpecialParticles(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = 1 + Math.random() * 5;
        particles.push(new Particle(
            x + (Math.random() - 0.5) * 20,
            y + (Math.random() - 0.5) * 20,
            color,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            20 + Math.random() * 15,
            3 + Math.random() * 4
        ));
    }
}

// ==========================================
// FLOATING DAMAGE TEXT
// ==========================================
let floatingTexts = [];

function spawnDamageText(x, y, text, color) {
    floatingTexts.push({
        x: x,
        y: y,
        text: text,
        color: color,
        life: 40,
        maxLife: 40
    });
}

// ==========================================
// FIGHTER CLASS
// ==========================================
class Fighter {
    constructor(charData, playerNum, startX) {
        this.char = charData;
        this.playerNum = playerNum;
        this.x = startX;
        this.y = 0;
        this.width = 50;
        this.height = 70;
        this.vx = 0;
        this.vy = 0;
        this.health = 100;
        this.maxHealth = 100;
        this.special = 0;
        this.maxSpecial = 100;
        this.facing = playerNum === 1 ? 1 : -1;
        this.grounded = false;
        this.state = 'idle';
        this.stateTimer = 0;
        this.attackCooldown = 0;
        this.hitStun = 0;
        this.blocking = false;
        this.frame = 0;
        this.comboCount = 0;
        this.comboTimer = 0;
        this.lastHitTime = 0;

        this.groundY = canvas.height - 80;
        this.y = this.groundY - this.height;
    }

    reset(startX) {
        this.x = startX;
        this.y = this.groundY - this.height;
        this.vx = 0;
        this.vy = 0;
        this.health = 100;
        this.special = 0;
        this.state = 'idle';
        this.stateTimer = 0;
        this.attackCooldown = 0;
        this.hitStun = 0;
        this.blocking = false;
        this.comboCount = 0;
        this.comboTimer = 0;
    }

    update(opponent) {
        this.frame++;

        // Face opponent
        if (this.hitStun <= 0 && this.state !== 'punch' && this.state !== 'kick' && this.state !== 'special') {
            this.facing = opponent.x > this.x ? 1 : -1;
        }

        // Combo timer
        if (this.comboTimer > 0) {
            this.comboTimer--;
            if (this.comboTimer <= 0) this.comboCount = 0;
        }

        // Hit stun
        if (this.hitStun > 0) {
            this.hitStun--;
            this.state = 'hurt';
        }

        // Attack state timers
        if (this.stateTimer > 0) {
            this.stateTimer--;
            if (this.stateTimer <= 0) {
                this.state = 'idle';
            }
        }

        // Attack cooldown
        if (this.attackCooldown > 0) this.attackCooldown--;

        // Apply gravity
        this.vy += 0.6;
        this.y += this.vy;
        this.x += this.vx;

        // Friction
        this.vx *= 0.85;

        // Ground collision
        if (this.y + this.height >= this.groundY) {
            this.y = this.groundY - this.height;
            this.vy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }

        // Wall bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }

    moveLeft() {
        if (this.hitStun > 0 || this.stateTimer > 0) return;
        this.vx = -this.char.speed;
    }

    moveRight() {
        if (this.hitStun > 0 || this.stateTimer > 0) return;
        this.vx = this.char.speed;
    }

    jump() {
        if (this.hitStun > 0 || this.stateTimer > 0) return;
        if (this.grounded) {
            this.vy = -this.char.jumpPower;
            this.grounded = false;
        }
    }

    startBlock() {
        if (this.hitStun > 0 || this.stateTimer > 0) return;
        this.blocking = true;
        this.state = 'block';
    }

    stopBlock() {
        this.blocking = false;
        if (this.state === 'block') this.state = 'idle';
    }

    attack(type, opponent) {
        if (this.hitStun > 0 || this.attackCooldown > 0 || this.blocking) return;

        const atk = this.char.attacks[type];
        if (!atk) return;

        if (type === 'special' && this.special < this.maxSpecial) return;

        this.state = type;
        this.stateTimer = atk.startup + atk.recovery;
        this.attackCooldown = atk.recovery + 4;

        if (type === 'special') {
            this.special = 0;
            audio.special();
        } else if (type === 'punch') {
            audio.punch();
        } else if (type === 'kick') {
            audio.kick();
        }

        // Check hit after startup frames
        setTimeout(() => {
            this.checkHit(type, opponent);
        }, atk.startup * 16);
    }

    checkHit(type, opponent) {
        const atk = this.char.attacks[type];
        if (!atk) return;

        let hitboxX = this.facing === 1
            ? this.x + this.width
            : this.x - atk.range;
        let hitboxW = atk.range;
        let hitboxY = this.y + 10;
        let hitboxH = this.height - 20;

        let oppBox = {
            x: opponent.x,
            y: opponent.y,
            w: opponent.width,
            h: opponent.height
        };

        if (hitboxX < oppBox.x + oppBox.w &&
            hitboxX + hitboxW > oppBox.x &&
            hitboxY < oppBox.y + oppBox.h &&
            hitboxY + hitboxH > oppBox.y) {

            if (opponent.blocking) {
                let dmg = Math.floor(atk.damage * 0.15);
                opponent.health -= dmg;
                opponent.hitStun = 5;
                audio.block();
                spawnHitParticles(
                    opponent.x + opponent.width / 2,
                    opponent.y + opponent.height / 2,
                    '#44AAFF', 4
                );
                spawnDamageText(
                    opponent.x + opponent.width / 2,
                    opponent.y,
                    'BLOQUEIO!',
                    '#44AAFF'
                );
                this.special = Math.min(this.maxSpecial, this.special + 3);
            } else {
                let comboDmg = atk.damage;
                this.comboCount++;
                this.comboTimer = 30;
                if (this.comboCount > 1) {
                    comboDmg = Math.floor(comboDmg * (1 + this.comboCount * 0.15));
                }
                opponent.health -= comboDmg;
                opponent.hitStun = 8 + atk.knockback;
                opponent.vx = this.facing * atk.knockback * 1.2;
                opponent.vy = -atk.knockback * 0.5;

                audio.hit();

                let particleColor = type === 'special' ? '#FFD700' : this.char.color;
                let particleCount = type === 'special' ? 15 : 8;
                spawnHitParticles(
                    opponent.x + opponent.width / 2,
                    opponent.y + opponent.height / 2,
                    particleColor,
                    particleCount
                );

                if (type === 'special') {
                    spawnSpecialParticles(
                        opponent.x + opponent.width / 2,
                        opponent.y + opponent.height / 2,
                        this.char.secondaryColor
                    );
                }

                let dmgText = comboDmg.toString();
                if (this.comboCount > 1) {
                    dmgText = this.comboCount + 'x COMBO! ' + comboDmg;
                }
                spawnDamageText(
                    opponent.x + opponent.width / 2,
                    opponent.y - 10,
                    dmgText,
                    type === 'special' ? '#FFD700' : '#FF4444'
                );

                this.special = Math.min(this.maxSpecial, this.special + (type === 'punch' ? 8 : type === 'kick' ? 12 : 0));
                opponent.special = Math.min(opponent.maxSpecial, opponent.special + 5);
            }

            if (opponent.health < 0) opponent.health = 0;
        }
    }

    draw(ctx) {
        let drawState = this.state;
        if (this.hitStun > 0) drawState = 'hurt';

        // Draw shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.groundY,
            this.width / 2,
            6,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        // Hurt flash
        if (this.hitStun > 0 && this.hitStun % 4 < 2) {
            ctx.globalAlpha = 0.6;
        }

        // Draw character using custom draw function
        this.char.drawCharacter(
            ctx,
            this.x, this.y,
            this.width, this.height,
            this.facing,
            this.frame,
            drawState
        );

        ctx.globalAlpha = 1;

        // Draw combo counter above character
        if (this.comboCount > 1 && this.comboTimer > 0) {
            ctx.font = '10px "Press Start 2P"';
            ctx.fillStyle = '#FFD700';
            ctx.textAlign = 'center';
            ctx.fillText(
                this.comboCount + ' HITS!',
                this.x + this.width / 2,
                this.y - 15
            );
        }

        // Player indicator
        ctx.font = '8px "Press Start 2P"';
        ctx.fillStyle = this.playerNum === 1 ? '#4AF' : '#F44';
        ctx.textAlign = 'center';
        ctx.fillText(
            'P' + this.playerNum,
            this.x + this.width / 2,
            this.y - 5
        );
    }
}

// ==========================================
// BACKGROUND DRAWING
// ==========================================
function drawBackground() {
    // Sky gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a3e');
    gradient.addColorStop(0.4, '#2d1b69');
    gradient.addColorStop(0.7, '#4a2c8a');
    gradient.addColorStop(1, '#1a0a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 30; i++) {
        let sx = (i * 137.5) % canvas.width;
        let sy = (i * 89.3) % (canvas.height * 0.5);
        let ss = 1 + (i % 3);
        let twinkle = Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.5;
        ctx.globalAlpha = twinkle * 0.8;
        ctx.fillRect(sx, sy, ss, ss);
    }
    ctx.globalAlpha = 1;

    // Moon
    ctx.fillStyle = '#FFE4B0';
    ctx.beginPath();
    ctx.arc(650, 60, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFD090';
    ctx.beginPath();
    ctx.arc(645, 55, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(660, 65, 3, 0, Math.PI * 2);
    ctx.fill();

    // Background buildings/platforms
    ctx.fillStyle = '#1a0e30';
    ctx.fillRect(50, canvas.height - 180, 80, 100);
    ctx.fillRect(200, canvas.height - 150, 60, 70);
    ctx.fillRect(500, canvas.height - 170, 90, 90);
    ctx.fillRect(680, canvas.height - 140, 70, 60);

    // Windows on buildings
    ctx.fillStyle = '#FFD700';
    ctx.globalAlpha = 0.4;
    for (let bx of [58, 70, 82, 94]) {
        for (let by of [canvas.height - 170, canvas.height - 150, canvas.height - 130]) {
            if (Math.random() > 0.3) {
                ctx.fillRect(bx, by, 6, 8);
            }
        }
    }
    ctx.globalAlpha = 1;

    // Ground
    ctx.fillStyle = '#2a1a4a';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

    // Ground detail
    ctx.fillStyle = '#3a2a5a';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 4);

    // Ground pattern
    ctx.fillStyle = '#221440';
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 76, 20, 76);
    }

    // Edge lines
    ctx.strokeStyle = '#5a4a7a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 80);
    ctx.lineTo(canvas.width, canvas.height - 80);
    ctx.stroke();
}

// ==========================================
// SCREEN MANAGEMENT
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    gameState.screen = screenId.replace('-screen', '');
}

// ==========================================
// CHARACTER SELECT LOGIC
// ==========================================
function initCharacterSelect() {
    const grid = document.getElementById('char-grid');
    grid.innerHTML = '';

    CHARACTERS.forEach((char, idx) => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.dataset.index = idx;
        card.innerHTML = `
            <div class="char-icon">${getCharEmoji(char.id)}</div>
            <div class="char-label">${char.name}</div>
        `;
        card.addEventListener('click', () => {
            if (!gameState.p1Confirmed) {
                gameState.p1SelectIndex = idx;
                gameState.p1Confirmed = true;
                audio.confirm();
            } else if (!gameState.p2Confirmed) {
                gameState.p2SelectIndex = idx;
                gameState.p2Confirmed = true;
                audio.confirm();
            }
            updateCharSelect();
        });
        grid.appendChild(card);
    });

    gameState.p1Confirmed = false;
    gameState.p2Confirmed = false;
    gameState.p1SelectIndex = 0;
    gameState.p2SelectIndex = CHARACTERS.length - 1;
    updateCharSelect();
}

function getCharEmoji(id) {
    const emojis = {
        mario: '\u{1F468}\u200D\u{1F527}',
        luigi: '\u{1F9D1}\u200D\u{1F527}',
        sonic: '\u{1F994}',
        tails: '\u{1F98A}',
        bugs: '\u{1F430}',
        taz: '\u{1F47F}'
    };
    return emojis[id] || '\u{2753}';
}

function updateCharSelect() {
    const cards = document.querySelectorAll('.char-card');
    cards.forEach((card, idx) => {
        card.classList.remove('p1-selected', 'p2-selected');
        if (idx === gameState.p1SelectIndex) card.classList.add('p1-selected');
        if (idx === gameState.p2SelectIndex) card.classList.add('p2-selected');
    });

    const p1Char = CHARACTERS[gameState.p1SelectIndex];
    const p2Char = CHARACTERS[gameState.p2SelectIndex];

    document.getElementById('p1-preview').textContent = getCharEmoji(p1Char.id);
    document.getElementById('p1-name').textContent = p1Char.name;
    document.getElementById('p1-name').style.color = p1Char.color;

    document.getElementById('p2-preview').textContent = getCharEmoji(p2Char.id);
    document.getElementById('p2-name').textContent = p2Char.name;
    document.getElementById('p2-name').style.color = p2Char.color;

    const fightBtn = document.getElementById('btn-fight');
    if (gameState.p1Confirmed && gameState.p2Confirmed) {
        fightBtn.style.display = 'block';
    } else {
        fightBtn.style.display = 'none';
    }
}

// ==========================================
// FIGHT SYSTEM
// ==========================================
let fighter1 = null;
let fighter2 = null;

function startFight() {
    gameState.p1Char = CHARACTERS[gameState.p1SelectIndex];
    gameState.p2Char = CHARACTERS[gameState.p2SelectIndex];
    gameState.round = 1;
    gameState.p1Wins = 0;
    gameState.p2Wins = 0;

    showScreen('fight-screen');
    startRound();
}

function startRound() {
    fighter1 = new Fighter(gameState.p1Char, 1, 100);
    fighter2 = new Fighter(gameState.p2Char, 2, canvas.width - 150);

    particles = [];
    floatingTexts = [];

    document.getElementById('p1-fight-name').textContent = gameState.p1Char.name;
    document.getElementById('p2-fight-name').textContent = gameState.p2Char.name;
    document.getElementById('round-display').textContent = 'Round ' + gameState.round;

    gameState.timer = 99;
    gameState.fightStarted = false;

    updateHealthBars();

    // Round start sequence
    showOverlay('ROUND ' + gameState.round, () => {
        setTimeout(() => {
            showOverlay('LUTAR!', () => {
                gameState.fightStarted = true;
                audio.fight();
                startTimer();
            }, 800);
        }, 200);
    }, 1000);
}

function startTimer() {
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    gameState.timerInterval = setInterval(() => {
        if (!gameState.fightStarted || gameState.paused) return;
        gameState.timer--;
        document.getElementById('timer-display').textContent = gameState.timer;
        if (gameState.timer <= 0) {
            endRound();
        }
    }, 1000);
}

function showOverlay(text, callback, duration = 1000) {
    const overlay = document.getElementById('fight-overlay');
    const textEl = document.getElementById('overlay-text');
    overlay.classList.add('active');
    textEl.textContent = text;

    setTimeout(() => {
        overlay.classList.remove('active');
        if (callback) callback();
    }, duration);
}

function endRound() {
    gameState.fightStarted = false;
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);

    let winner = null;
    if (fighter1.health <= 0) {
        winner = 2;
        gameState.p2Wins++;
    } else if (fighter2.health <= 0) {
        winner = 1;
        gameState.p1Wins++;
    } else {
        winner = fighter1.health >= fighter2.health ? 1 : 2;
        if (winner === 1) gameState.p1Wins++;
        else gameState.p2Wins++;
    }

    audio.ko();

    let winText = winner === 1 ? gameState.p1Char.name : gameState.p2Char.name;
    showOverlay('K.O.!', () => {
        setTimeout(() => {
            showOverlay(winText + ' VENCEU!', () => {
                setTimeout(() => {
                    let winsNeeded = Math.ceil(gameState.maxRounds / 2);
                    if (gameState.p1Wins >= winsNeeded || gameState.p2Wins >= winsNeeded) {
                        endMatch();
                    } else {
                        gameState.round++;
                        startRound();
                    }
                }, 300);
            }, 1500);
        }, 200);
    }, 1500);
}

function endMatch() {
    let matchWinner = gameState.p1Wins > gameState.p2Wins ? 1 : 2;
    let winChar = matchWinner === 1 ? gameState.p1Char : gameState.p2Char;

    audio.win();

    document.getElementById('winner-text').textContent =
        winChar.name + ' VENCEU A LUTA!';
    document.getElementById('winner-text').style.color = winChar.color;
    document.getElementById('winner-char').textContent = getCharEmoji(winChar.id);

    showScreen('result-screen');
}

function updateHealthBars() {
    if (!fighter1 || !fighter2) return;

    const p1Bar = document.getElementById('p1-health');
    const p2Bar = document.getElementById('p2-health');
    const p1Special = document.getElementById('p1-special');
    const p2Special = document.getElementById('p2-special');

    let p1Pct = (fighter1.health / fighter1.maxHealth) * 100;
    let p2Pct = (fighter2.health / fighter2.maxHealth) * 100;

    p1Bar.style.width = p1Pct + '%';
    p2Bar.style.width = p2Pct + '%';

    p1Bar.className = 'health-fill' + (p1Pct < 25 ? ' low' : p1Pct < 50 ? ' medium' : '');
    p2Bar.className = 'health-fill' + (p2Pct < 25 ? ' low' : p2Pct < 50 ? ' medium' : '');

    let p1SpecPct = (fighter1.special / fighter1.maxSpecial) * 100;
    let p2SpecPct = (fighter2.special / fighter2.maxSpecial) * 100;

    p1Special.style.width = p1SpecPct + '%';
    p2Special.style.width = p2SpecPct + '%';

    p1Special.className = 'special-fill' + (p1SpecPct >= 100 ? ' ready' : '');
    p2Special.className = 'special-fill' + (p2SpecPct >= 100 ? ' ready' : '');
}

// ==========================================
// INPUT PROCESSING
// ==========================================
function processInputs() {
    if (!gameState.fightStarted) return;

    // Player 1 controls (WASD + FGH)
    if (keys['a'] || keys['A']) fighter1.moveLeft();
    if (keys['d'] || keys['D']) fighter1.moveRight();
    if (consumeKeyPress('w') || consumeKeyPress('W')) fighter1.jump();
    if (keys['s'] || keys['S']) {
        fighter1.startBlock();
    } else {
        fighter1.stopBlock();
    }
    if (consumeKeyPress('f') || consumeKeyPress('F')) fighter1.attack('punch', fighter2);
    if (consumeKeyPress('g') || consumeKeyPress('G')) fighter1.attack('kick', fighter2);
    if (consumeKeyPress('h') || consumeKeyPress('H')) fighter1.attack('special', fighter2);

    // Player 2 controls (Arrows + JKL)
    if (keys['ArrowLeft']) fighter2.moveLeft();
    if (keys['ArrowRight']) fighter2.moveRight();
    if (consumeKeyPress('ArrowUp')) fighter2.jump();
    if (keys['ArrowDown']) {
        fighter2.startBlock();
    } else {
        fighter2.stopBlock();
    }
    if (consumeKeyPress('j') || consumeKeyPress('J')) fighter2.attack('punch', fighter1);
    if (consumeKeyPress('k') || consumeKeyPress('K')) fighter2.attack('kick', fighter1);
    if (consumeKeyPress('l') || consumeKeyPress('L')) fighter2.attack('special', fighter1);
}

// Character select input processing
function processSelectInputs() {
    if (gameState.screen !== 'select') return;

    // P1 navigation
    if (!gameState.p1Confirmed) {
        if (consumeKeyPress('d') || consumeKeyPress('D')) {
            gameState.p1SelectIndex = (gameState.p1SelectIndex + 1) % CHARACTERS.length;
            audio.select();
            updateCharSelect();
        }
        if (consumeKeyPress('a') || consumeKeyPress('A')) {
            gameState.p1SelectIndex = (gameState.p1SelectIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            audio.select();
            updateCharSelect();
        }
        if (consumeKeyPress('f') || consumeKeyPress('F')) {
            gameState.p1Confirmed = true;
            audio.confirm();
            updateCharSelect();
        }
    }

    // P2 navigation
    if (!gameState.p2Confirmed) {
        if (consumeKeyPress('ArrowRight')) {
            gameState.p2SelectIndex = (gameState.p2SelectIndex + 1) % CHARACTERS.length;
            audio.select();
            updateCharSelect();
        }
        if (consumeKeyPress('ArrowLeft')) {
            gameState.p2SelectIndex = (gameState.p2SelectIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            audio.select();
            updateCharSelect();
        }
        if (consumeKeyPress('j') || consumeKeyPress('J')) {
            gameState.p2Confirmed = true;
            audio.confirm();
            updateCharSelect();
        }
    }
}

// ==========================================
// MAIN GAME LOOP
// ==========================================
function gameLoop() {
    if (gameState.screen === 'fight') {
        processInputs();

        if (gameState.fightStarted) {
            fighter1.update(fighter2);
            fighter2.update(fighter1);

            // Check KO
            if (fighter1.health <= 0 || fighter2.health <= 0) {
                if (gameState.fightStarted) {
                    endRound();
                }
            }
        }

        // Draw
        drawBackground();

        // Draw fighters
        if (fighter1) fighter1.draw(ctx);
        if (fighter2) fighter2.draw(ctx);

        // Draw particles
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });
        particles = particles.filter(p => !p.isDead());

        // Draw floating damage text
        ctx.font = '10px "Press Start 2P"';
        ctx.textAlign = 'center';
        floatingTexts.forEach(ft => {
            let alpha = ft.life / ft.maxLife;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = ft.color;
            ctx.fillText(ft.text, ft.x, ft.y - (ft.maxLife - ft.life) * 0.8);
            ft.life--;
        });
        ctx.globalAlpha = 1;
        floatingTexts = floatingTexts.filter(ft => ft.life > 0);

        // Update UI
        updateHealthBars();
        document.getElementById('timer-display').textContent = gameState.timer;
    }

    // Character select input
    processSelectInputs();

    requestAnimationFrame(gameLoop);
}

// ==========================================
// BUTTON EVENT LISTENERS
// ==========================================
document.getElementById('btn-start').addEventListener('click', () => {
    audio.init();
    audio.confirm();
    initCharacterSelect();
    showScreen('select-screen');
});

document.getElementById('btn-how-to').addEventListener('click', () => {
    audio.init();
    audio.select();
    showScreen('howto-screen');
});

document.getElementById('btn-back-howto').addEventListener('click', () => {
    audio.select();
    showScreen('title-screen');
});

document.getElementById('btn-back-select').addEventListener('click', () => {
    audio.select();
    showScreen('title-screen');
});

document.getElementById('btn-fight').addEventListener('click', () => {
    audio.init();
    audio.confirm();
    startFight();
});

document.getElementById('btn-rematch').addEventListener('click', () => {
    audio.confirm();
    startFight();
});

document.getElementById('btn-menu').addEventListener('click', () => {
    audio.select();
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    showScreen('title-screen');
});

// Initialize game loop
gameLoop();
