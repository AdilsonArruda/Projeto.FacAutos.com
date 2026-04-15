// ============================================================
// Super Brawl Arena — Mobile Fighting Game
// ============================================================

(function () {
  'use strict';

  // ---------- Characters ----------
  const CHARACTERS = [
    {
      id: 'mario',
      name: 'Mário',
      emoji: '\u{1F344}',
      color: '#e74c3c',
      atk: 7,
      def: 6,
      spd: 5,
      special: 'Bola de Fogo',
      specialColor: '#f39c12',
    },
    {
      id: 'luigi',
      name: 'Luigi',
      emoji: '\u{1F49A}',
      color: '#27ae60',
      atk: 6,
      def: 5,
      spd: 7,
      special: 'Salto Trovão',
      specialColor: '#2ecc71',
    },
    {
      id: 'sonic',
      name: 'Sonic',
      emoji: '\u{1F4A8}',
      color: '#2980b9',
      atk: 8,
      def: 4,
      spd: 10,
      special: 'Spin Dash',
      specialColor: '#3498db',
    },
    {
      id: 'tails',
      name: 'Tails',
      emoji: '\u{1F9CA}',
      color: '#f1c40f',
      atk: 5,
      def: 5,
      spd: 8,
      special: 'Tornado',
      specialColor: '#f39c12',
    },
    {
      id: 'pernalonga',
      name: 'Pernalonga',
      emoji: '\u{1F955}',
      color: '#95a5a6',
      atk: 6,
      def: 7,
      spd: 6,
      special: 'Cenoura Bomba',
      specialColor: '#e67e22',
    },
    {
      id: 'patolino',
      name: 'Patolino',
      emoji: '\u{1F986}',
      color: '#000',
      atk: 7,
      def: 5,
      spd: 7,
      special: 'Grito Sônico',
      specialColor: '#9b59b6',
    },
  ];

  // ---------- Game State ----------
  let selectedChar = null;
  let opponentChar = null;
  let player1 = null;
  let player2 = null;
  let round = 1;
  let gameLoop = null;
  let canvas, ctx;
  let canvasW, canvasH;
  let keysDown = {};
  let touchActions = {};

  // ---------- DOM Elements ----------
  const $ = (id) => document.getElementById(id);
  const screens = {
    title: $('title-screen'),
    select: $('select-screen'),
    fight: $('fight-screen'),
    result: $('result-screen'),
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  // ---------- Title Screen ----------
  $('btn-start').addEventListener('click', () => showScreen('select'));

  // ---------- Character Select ----------
  function buildCharGrid() {
    const grid = $('char-grid');
    grid.innerHTML = '';
    CHARACTERS.forEach((c) => {
      const card = document.createElement('div');
      card.className = 'char-card';
      card.dataset.id = c.id;
      card.innerHTML =
        '<span class="char-avatar">' +
        c.emoji +
        '</span><span class="char-label">' +
        c.name +
        '</span>';
      card.addEventListener('click', () => selectCharacter(c, card));
      grid.appendChild(card);
    });
  }

  function selectCharacter(c, card) {
    document
      .querySelectorAll('.char-card')
      .forEach((el) => el.classList.remove('selected'));
    card.classList.add('selected');
    selectedChar = c;
    $('char-name').textContent = c.name;
    $('stat-atk').style.width = c.atk * 10 + '%';
    $('stat-def').style.width = c.def * 10 + '%';
    $('stat-spd').style.width = c.spd * 10 + '%';
    $('btn-fight').disabled = false;
  }

  $('btn-fight').addEventListener('click', () => {
    if (!selectedChar) return;
    // Pick random opponent different from player
    let pool = CHARACTERS.filter((c) => c.id !== selectedChar.id);
    opponentChar = pool[Math.floor(Math.random() * pool.length)];
    startFight();
  });

  $('btn-back-title').addEventListener('click', () => showScreen('title'));

  // ---------- Fighter Class ----------
  function createFighter(charData, x, facing) {
    return {
      char: charData,
      x: x,
      y: 0,
      vx: 0,
      vy: 0,
      facing: facing, // 1 = right, -1 = left
      health: 100,
      energy: 0,
      state: 'idle', // idle, walk, punch, kick, special, block, hit, ko
      stateTimer: 0,
      animFrame: 0,
      width: 50,
      height: 80,
      grounded: true,
      blocking: false,
      hitCooldown: 0,
      comboCount: 0,
      lastHitTime: 0,
    };
  }

  // ---------- Fight Logic ----------
  function startFight() {
    round = 1;
    showScreen('fight');
    initCanvas();
    initFighters();
    showOverlayText('ROUND 1', () => {
      showOverlayText('LUTA!', () => {
        startGameLoop();
      });
    });
  }

  function initCanvas() {
    canvas = $('arena');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    const container = canvas.parentElement;
    const hud = container.querySelector('.hud');
    const controls = container.querySelector('.controls');
    const hudH = hud ? hud.offsetHeight : 50;
    const ctrlH = controls ? controls.offsetHeight : 100;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight - hudH - ctrlH;
    canvasW = canvas.width;
    canvasH = canvas.height;
  }

  function initFighters() {
    const groundY = 0; // will be calculated relative to canvas
    player1 = createFighter(selectedChar, canvasW * 0.25, 1);
    player2 = createFighter(opponentChar, canvasW * 0.75, -1);
    player1.y = canvasH - player1.height - 20;
    player2.y = canvasH - player2.height - 20;
    player1.groundY = player1.y;
    player2.groundY = player2.y;

    // HUD
    $('hud-p1-name').textContent = selectedChar.name;
    $('hud-p2-name').textContent = opponentChar.name;
    updateHUD();
  }

  function updateHUD() {
    $('hud-p1-health').style.width = Math.max(0, player1.health) + '%';
    $('hud-p2-health').style.width = Math.max(0, player2.health) + '%';
    $('hud-p1-energy').style.width = Math.min(100, player1.energy) + '%';
    $('hud-p2-energy').style.width = Math.min(100, player2.energy) + '%';
    $('round-display').textContent = 'Round ' + round;

    // Color health bars
    var p1h = Math.max(0, player1.health);
    var p2h = Math.max(0, player2.health);
    $('hud-p1-health').style.background =
      p1h > 50
        ? 'linear-gradient(90deg, #2ecc71, #27ae60)'
        : p1h > 25
          ? 'linear-gradient(90deg, #f1c40f, #f39c12)'
          : 'linear-gradient(90deg, #e74c3c, #c0392b)';
    $('hud-p2-health').style.background =
      p2h > 50
        ? 'linear-gradient(90deg, #2ecc71, #27ae60)'
        : p2h > 25
          ? 'linear-gradient(90deg, #f1c40f, #f39c12)'
          : 'linear-gradient(90deg, #e74c3c, #c0392b)';
  }

  // ---------- Overlay Text ----------
  function showOverlayText(text, callback) {
    const overlay = $('fight-overlay');
    overlay.textContent = text;
    overlay.className = 'fight-overlay show';
    setTimeout(() => {
      overlay.className = 'fight-overlay';
      if (callback) callback();
    }, 800);
  }

  // ---------- Game Loop ----------
  var lastTime = 0;
  var particles = [];
  var projectiles = [];

  function startGameLoop() {
    lastTime = performance.now();
    particles = [];
    projectiles = [];
    if (gameLoop) cancelAnimationFrame(gameLoop);
    gameLoop = requestAnimationFrame(tick);
  }

  function stopGameLoop() {
    if (gameLoop) {
      cancelAnimationFrame(gameLoop);
      gameLoop = null;
    }
  }

  function tick(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    updatePlayer(player1, dt);
    updateAI(player2, dt);
    updateFighter(player1, dt);
    updateFighter(player2, dt);
    checkAttacks(player1, player2);
    checkAttacks(player2, player1);
    updateProjectiles(dt);
    updateParticles(dt);
    updateHUD();
    draw();

    // Check KO
    if (player1.health <= 0 || player2.health <= 0) {
      stopGameLoop();
      var winner = player1.health > 0 ? player1 : player2;
      var loser = player1.health > 0 ? player2 : player1;
      loser.state = 'ko';
      draw();
      showOverlayText('K.O.!', () => {
        endRound(winner, loser);
      });
      return;
    }

    gameLoop = requestAnimationFrame(tick);
  }

  function endRound(winner, loser) {
    if (round < 3 && winner === player1) {
      round++;
      // Reset for next round
      player1.health = 100;
      player2.health = 100;
      player1.energy = 0;
      player2.energy = 0;
      player1.state = 'idle';
      player2.state = 'idle';
      player1.x = canvasW * 0.25;
      player2.x = canvasW * 0.75;
      particles = [];
      projectiles = [];
      showOverlayText('ROUND ' + round, () => {
        showOverlayText('LUTA!', () => {
          startGameLoop();
        });
      });
    } else {
      // Game over
      showScreen('result');
      if (winner === player1) {
        $('result-title').textContent = 'VITÓRIA!';
        $('result-title').style.color = '#ffd200';
        $('result-subtitle').textContent =
          selectedChar.name + ' venceu ' + opponentChar.name + '!';
      } else {
        $('result-title').textContent = 'DERROTA';
        $('result-title').style.color = '#e74c3c';
        $('result-subtitle').textContent =
          opponentChar.name + ' venceu a luta.';
      }
    }
  }

  // ---------- Player Input ----------
  function updatePlayer(f, dt) {
    if (f.state === 'hit' || f.state === 'ko') return;

    var moveSpeed = 200 + f.char.spd * 15;
    f.vx = 0;

    if (touchActions['left'] || keysDown['ArrowLeft'] || keysDown['a']) {
      f.vx = -moveSpeed;
      if (f.state === 'idle') f.state = 'walk';
    } else if (
      touchActions['right'] ||
      keysDown['ArrowRight'] ||
      keysDown['d']
    ) {
      f.vx = moveSpeed;
      if (f.state === 'idle') f.state = 'walk';
    } else if (f.state === 'walk') {
      f.state = 'idle';
    }

    if (touchActions['block'] || keysDown['s']) {
      f.blocking = true;
      f.state = 'block';
      f.vx = 0;
    } else {
      f.blocking = false;
      if (f.state === 'block') f.state = 'idle';
    }

    if (touchActions['punch'] || keysDown['j']) {
      if (f.state === 'idle' || f.state === 'walk') {
        f.state = 'punch';
        f.stateTimer = 0.25;
        touchActions['punch'] = false;
        keysDown['j'] = false;
      }
    }

    if (touchActions['kick'] || keysDown['k']) {
      if (f.state === 'idle' || f.state === 'walk') {
        f.state = 'kick';
        f.stateTimer = 0.3;
        touchActions['kick'] = false;
        keysDown['k'] = false;
      }
    }

    if (touchActions['special'] || keysDown['l']) {
      if (
        (f.state === 'idle' || f.state === 'walk') &&
        f.energy >= 100
      ) {
        f.state = 'special';
        f.stateTimer = 0.5;
        f.energy = 0;
        // Create projectile
        spawnProjectile(f);
        touchActions['special'] = false;
        keysDown['l'] = false;
      }
    }
  }

  // ---------- AI ----------
  var aiTimer = 0;
  var aiAction = 'idle';

  function updateAI(f, dt) {
    if (f.state === 'hit' || f.state === 'ko') return;

    aiTimer -= dt;
    var dist = Math.abs(f.x - player1.x);
    var moveSpeed = 150 + f.char.spd * 10;

    if (aiTimer <= 0) {
      aiTimer = 0.3 + Math.random() * 0.5;

      if (dist < 70) {
        // Close range: attack or block
        var r = Math.random();
        if (r < 0.3) aiAction = 'punch';
        else if (r < 0.55) aiAction = 'kick';
        else if (r < 0.7 && f.energy >= 100) aiAction = 'special';
        else if (r < 0.85) aiAction = 'block';
        else aiAction = 'retreat';
      } else if (dist < 200) {
        // Medium range
        var r2 = Math.random();
        if (r2 < 0.5) aiAction = 'approach';
        else if (r2 < 0.7 && f.energy >= 100) aiAction = 'special';
        else aiAction = 'idle';
      } else {
        // Far: approach
        aiAction = Math.random() < 0.8 ? 'approach' : 'idle';
      }
    }

    f.vx = 0;
    f.blocking = false;

    if (aiAction === 'approach') {
      f.vx = player1.x < f.x ? -moveSpeed : moveSpeed;
      if (f.state !== 'punch' && f.state !== 'kick' && f.state !== 'special')
        f.state = 'walk';
    } else if (aiAction === 'retreat') {
      f.vx = player1.x < f.x ? moveSpeed : -moveSpeed;
      if (f.state !== 'punch' && f.state !== 'kick' && f.state !== 'special')
        f.state = 'walk';
    } else if (aiAction === 'punch') {
      if (f.state === 'idle' || f.state === 'walk') {
        f.state = 'punch';
        f.stateTimer = 0.25;
      }
      aiAction = 'idle';
    } else if (aiAction === 'kick') {
      if (f.state === 'idle' || f.state === 'walk') {
        f.state = 'kick';
        f.stateTimer = 0.3;
      }
      aiAction = 'idle';
    } else if (aiAction === 'special') {
      if (
        (f.state === 'idle' || f.state === 'walk') &&
        f.energy >= 100
      ) {
        f.state = 'special';
        f.stateTimer = 0.5;
        f.energy = 0;
        spawnProjectile(f);
      }
      aiAction = 'idle';
    } else if (aiAction === 'block') {
      f.blocking = true;
      f.state = 'block';
    } else {
      if (
        f.state !== 'punch' &&
        f.state !== 'kick' &&
        f.state !== 'special' &&
        f.state !== 'hit'
      )
        f.state = 'idle';
    }
  }

  // ---------- Fighter Update ----------
  function updateFighter(f, dt) {
    // State timers
    if (f.stateTimer > 0) {
      f.stateTimer -= dt;
      if (f.stateTimer <= 0) {
        if (f.state === 'hit') {
          f.state = 'idle';
        } else if (f.state === 'punch' || f.state === 'kick' || f.state === 'special') {
          f.state = 'idle';
        }
      }
    }

    // Movement
    if (f.state !== 'hit' && f.state !== 'ko') {
      f.x += f.vx * dt;
    }

    // Knockback in hit state
    if (f.state === 'hit') {
      f.x += f.vx * dt;
      f.vx *= 0.9;
    }

    // Bounds
    f.x = Math.max(f.width / 2, Math.min(canvasW - f.width / 2, f.x));

    // Facing direction
    if (f === player1) {
      f.facing = player2.x > f.x ? 1 : -1;
    } else {
      f.facing = player1.x > f.x ? 1 : -1;
    }

    // Hit cooldown
    if (f.hitCooldown > 0) f.hitCooldown -= dt;

    // Energy regen
    if (f.state !== 'ko') {
      f.energy = Math.min(100, f.energy + 5 * dt);
    }

    // Animation
    f.animFrame += dt * 8;
  }

  // ---------- Attacks ----------
  function checkAttacks(attacker, defender) {
    if (attacker.hitCooldown > 0) return;
    if (
      attacker.state !== 'punch' &&
      attacker.state !== 'kick'
    )
      return;
    if (attacker.stateTimer > 0.15) return; // Only hit at end of animation

    var dist = Math.abs(attacker.x - defender.x);
    var range = attacker.state === 'kick' ? 75 : 60;

    if (dist < range && defender.state !== 'ko') {
      attacker.hitCooldown = 0.3;
      var baseDamage = attacker.state === 'punch' ? 8 : 12;
      var damage =
        baseDamage + attacker.char.atk - Math.floor(defender.char.def / 2);

      if (defender.blocking) {
        damage = Math.floor(damage * 0.2);
        spawnParticles(defender.x, defender.y + 20, '#4ecdc4', 3);
      } else {
        defender.state = 'hit';
        defender.stateTimer = 0.3;
        defender.vx = (defender.x - attacker.x > 0 ? 1 : -1) * 300;
        spawnParticles(
          (attacker.x + defender.x) / 2,
          defender.y + 20,
          '#ff6b6b',
          6
        );
      }

      defender.health -= damage;
      attacker.energy = Math.min(100, attacker.energy + 15);

      // Combo tracking
      var now = performance.now();
      if (now - attacker.lastHitTime < 800) {
        attacker.comboCount++;
        if (attacker.comboCount >= 3) {
          showOverlayText('COMBO x' + attacker.comboCount + '!');
        }
      } else {
        attacker.comboCount = 1;
      }
      attacker.lastHitTime = now;
    }
  }

  // ---------- Projectiles ----------
  function spawnProjectile(fighter) {
    projectiles.push({
      x: fighter.x + fighter.facing * 30,
      y: fighter.y + 30,
      vx: fighter.facing * 400,
      owner: fighter,
      color: fighter.char.specialColor,
      radius: 12,
      life: 2,
      damage: 20 + fighter.char.atk,
    });
    spawnParticles(
      fighter.x + fighter.facing * 20,
      fighter.y + 30,
      fighter.char.specialColor,
      10
    );
  }

  function updateProjectiles(dt) {
    for (var i = projectiles.length - 1; i >= 0; i--) {
      var p = projectiles[i];
      p.x += p.vx * dt;
      p.life -= dt;

      // Check hit
      var target = p.owner === player1 ? player2 : player1;
      var dist = Math.abs(p.x - target.x);
      if (dist < 40 && Math.abs(p.y - (target.y + 30)) < 50) {
        if (target.blocking) {
          target.health -= Math.floor(p.damage * 0.15);
          spawnParticles(target.x, target.y + 20, '#4ecdc4', 5);
        } else {
          target.health -= p.damage;
          target.state = 'hit';
          target.stateTimer = 0.4;
          target.vx = (p.vx > 0 ? 1 : -1) * 250;
          spawnParticles(target.x, target.y + 20, p.color, 12);
          showOverlayText(p.owner.char.special + '!');
        }
        p.owner.energy = Math.min(100, p.owner.energy + 10);
        projectiles.splice(i, 1);
        continue;
      }

      if (p.life <= 0 || p.x < -20 || p.x > canvasW + 20) {
        projectiles.splice(i, 1);
      }
    }
  }

  // ---------- Particles ----------
  function spawnParticles(x, y, color, count) {
    for (var i = 0; i < count; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 300,
        vy: (Math.random() - 0.5) * 300,
        color: color,
        life: 0.4 + Math.random() * 0.3,
        size: 2 + Math.random() * 4,
      });
    }
  }

  function updateParticles(dt) {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      p.size *= 0.97;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  // ---------- Drawing ----------
  function draw() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawBackground();
    drawFighter(player1, true);
    drawFighter(player2, false);
    drawProjectiles();
    drawParticles();
  }

  function drawBackground() {
    // Sky gradient
    var grad = ctx.createLinearGradient(0, 0, 0, canvasH);
    grad.addColorStop(0, '#0f3460');
    grad.addColorStop(0.6, '#16213e');
    grad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Ground
    ctx.fillStyle = '#2d2d44';
    ctx.fillRect(0, canvasH - 20, canvasW, 20);

    // Ground line
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvasH - 20);
    ctx.lineTo(canvasW, canvasH - 20);
    ctx.stroke();

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (var i = 0; i < 20; i++) {
      var sx = ((i * 137.5) % canvasW);
      var sy = ((i * 73.3) % (canvasH * 0.5));
      ctx.beginPath();
      ctx.arc(sx, sy, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFighter(f, isPlayer) {
    ctx.save();
    ctx.translate(f.x, f.y);

    var bodyColor = f.char.color;
    var shake = 0;
    if (f.state === 'hit') {
      shake = Math.sin(f.animFrame * 30) * 3;
      bodyColor = '#fff';
    }

    ctx.translate(shake, 0);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, f.height, 25, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    var bobY = f.state === 'idle' ? Math.sin(f.animFrame * 2) * 2 : 0;
    var walkBob = f.state === 'walk' ? Math.sin(f.animFrame * 4) * 3 : 0;

    // Legs
    ctx.fillStyle = darken(bodyColor, 0.3);
    var legSpread = f.state === 'walk' ? Math.sin(f.animFrame * 4) * 8 : 4;
    ctx.fillRect(-12 - legSpread, 55 + bobY + walkBob, 10, 25);
    ctx.fillRect(2 + legSpread, 55 + bobY - walkBob, 10, 25);

    // Torso
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.roundRect(-18, 20 + bobY, 36, 38, 6);
    ctx.fill();

    // Head
    ctx.fillStyle = '#ffd5a0';
    ctx.beginPath();
    ctx.arc(0, 12 + bobY, 16, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#333';
    var eyeX = f.facing * 4;
    ctx.beginPath();
    ctx.arc(eyeX - 5, 10 + bobY, 2.5, 0, Math.PI * 2);
    ctx.arc(eyeX + 5, 10 + bobY, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Expression based on state
    if (f.state === 'ko') {
      // X eyes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(eyeX - 7, 7 + bobY);
      ctx.lineTo(eyeX - 3, 13 + bobY);
      ctx.moveTo(eyeX - 3, 7 + bobY);
      ctx.lineTo(eyeX - 7, 13 + bobY);
      ctx.moveTo(eyeX + 3, 7 + bobY);
      ctx.lineTo(eyeX + 7, 13 + bobY);
      ctx.moveTo(eyeX + 7, 7 + bobY);
      ctx.lineTo(eyeX + 3, 13 + bobY);
      ctx.stroke();
    } else if (f.state === 'hit') {
      // Pain mouth
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(0, 20 + bobY, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Smile
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 14 + bobY, 6, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }

    // Arms / attack poses
    ctx.fillStyle = '#ffd5a0';
    if (f.state === 'punch') {
      // Extended punch arm
      ctx.fillRect(f.facing * 18, 28 + bobY, f.facing * 35, 10);
      // Fist
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.arc(f.facing * 50, 33 + bobY, 7, 0, Math.PI * 2);
      ctx.fill();
      // Other arm
      ctx.fillStyle = '#ffd5a0';
      ctx.fillRect(-f.facing * 18, 30 + bobY, -f.facing * 12, 8);
    } else if (f.state === 'kick') {
      // Kick leg extended
      ctx.fillStyle = darken(bodyColor, 0.3);
      ctx.fillRect(f.facing * 10, 55 + bobY, f.facing * 40, 10);
      // Foot
      ctx.fillStyle = darken(bodyColor, 0.5);
      ctx.beginPath();
      ctx.arc(f.facing * 48, 60 + bobY, 7, 0, Math.PI * 2);
      ctx.fill();
      // Arms
      ctx.fillStyle = '#ffd5a0';
      ctx.fillRect(-15, 28 + bobY, 10, 20);
      ctx.fillRect(5, 28 + bobY, 10, 20);
    } else if (f.state === 'block') {
      // Arms crossed in front
      ctx.fillStyle = '#ffd5a0';
      ctx.fillRect(-8, 22 + bobY, 16, 12);
      ctx.fillRect(-10, 28 + bobY, 20, 10);
      // Shield glow
      ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(f.facing * 15, 35 + bobY, 25, -0.8, 0.8);
      ctx.stroke();
    } else if (f.state === 'special') {
      // Power-up pose
      ctx.fillStyle = '#ffd5a0';
      ctx.fillRect(-22, 20 + bobY, 10, 10);
      ctx.fillRect(12, 20 + bobY, 10, 10);
      // Glow
      ctx.fillStyle = f.char.specialColor + '44';
      ctx.beginPath();
      ctx.arc(0, 35 + bobY, 35, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Normal arms
      ctx.fillStyle = '#ffd5a0';
      ctx.fillRect(-22, 28 + bobY, 10, 18);
      ctx.fillRect(12, 28 + bobY, 10, 18);
    }

    // Character identifier (emoji above head)
    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.fillText(f.char.emoji, 0, -6 + bobY);

    // Name tag
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = isPlayer ? '#4ecdc4' : '#ff6b6b';
    ctx.textAlign = 'center';
    ctx.fillText(f.char.name, 0, -14 + bobY);

    ctx.restore();
  }

  function drawProjectiles() {
    projectiles.forEach(function (p) {
      ctx.save();
      ctx.translate(p.x, p.y);

      // Glow
      ctx.fillStyle = p.color + '44';
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Bright center
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  function drawParticles() {
    particles.forEach(function (p) {
      ctx.globalAlpha = Math.max(0, p.life / 0.7);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function darken(hex, amount) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    r = Math.floor(r * (1 - amount));
    g = Math.floor(g * (1 - amount));
    b = Math.floor(b * (1 - amount));
    return (
      '#' +
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')
    );
  }

  // ---------- Controls ----------
  // Touch controls
  document.querySelectorAll('.ctrl-btn').forEach(function (btn) {
    var action = btn.dataset.action;

    btn.addEventListener(
      'touchstart',
      function (e) {
        e.preventDefault();
        touchActions[action] = true;
      },
      { passive: false }
    );

    btn.addEventListener(
      'touchend',
      function (e) {
        e.preventDefault();
        if (action === 'left' || action === 'right' || action === 'block') {
          touchActions[action] = false;
        }
      },
      { passive: false }
    );

    btn.addEventListener('mousedown', function (e) {
      e.preventDefault();
      touchActions[action] = true;
    });

    btn.addEventListener('mouseup', function (e) {
      e.preventDefault();
      if (action === 'left' || action === 'right' || action === 'block') {
        touchActions[action] = false;
      }
    });

    btn.addEventListener('mouseleave', function (e) {
      if (action === 'left' || action === 'right' || action === 'block') {
        touchActions[action] = false;
      }
    });
  });

  // Keyboard controls
  document.addEventListener('keydown', function (e) {
    keysDown[e.key] = true;
  });

  document.addEventListener('keyup', function (e) {
    keysDown[e.key] = false;
  });

  // ---------- Result Screen ----------
  $('btn-rematch').addEventListener('click', function () {
    startFight();
  });

  $('btn-back-select').addEventListener('click', function () {
    stopGameLoop();
    selectedChar = null;
    opponentChar = null;
    $('btn-fight').disabled = true;
    document
      .querySelectorAll('.char-card')
      .forEach(function (el) {
        el.classList.remove('selected');
      });
    $('char-name').textContent = '---';
    $('stat-atk').style.width = '0';
    $('stat-def').style.width = '0';
    $('stat-spd').style.width = '0';
    showScreen('select');
  });

  // ---------- Canvas roundRect polyfill ----------
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x,
      y,
      w,
      h,
      r
    ) {
      if (typeof r === 'number') r = [r, r, r, r];
      this.beginPath();
      this.moveTo(x + r[0], y);
      this.lineTo(x + w - r[1], y);
      this.quadraticCurveTo(x + w, y, x + w, y + r[1]);
      this.lineTo(x + w, y + h - r[2]);
      this.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
      this.lineTo(x + r[3], y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - r[3]);
      this.lineTo(x, y + r[0]);
      this.quadraticCurveTo(x, y, x + r[0], y);
      this.closePath();
      return this;
    };
  }

  // ---------- Init ----------
  buildCharGrid();
})();
