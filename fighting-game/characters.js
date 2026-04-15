// Character definitions for Super Smash Toons
const CHARACTERS = [
    {
        id: 'mario',
        name: 'Mario',
        franchise: 'Super Mario',
        icon: '\u{1F1EE}\u{1F1F9}',
        color: '#E52521',
        secondaryColor: '#049CD8',
        speed: 4,
        jumpPower: 12,
        weight: 5,
        attacks: {
            punch: { damage: 8, range: 45, startup: 4, recovery: 8, knockback: 3 },
            kick: { damage: 12, range: 55, startup: 6, recovery: 12, knockback: 5 },
            special: { damage: 25, range: 80, startup: 10, recovery: 20, knockback: 10, name: 'Fireball' }
        },
        description: 'Equilibrado em tudo!',
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            // Mario body
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            // Hat
            ctx.fillStyle = '#E52521';
            ctx.fillRect(-15, -h/2, 30, 12);
            ctx.fillRect(-18, -h/2 + 8, 10, 6);

            // Face
            ctx.fillStyle = '#FFB84D';
            ctx.fillRect(-12, -h/2 + 12, 24, 16);

            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(-8, -h/2 + 16, 4, 4);
            ctx.fillRect(4, -h/2 + 16, 4, 4);

            // Mustache
            ctx.fillStyle = '#4A2800';
            ctx.fillRect(-10, -h/2 + 22, 20, 4);

            // Body (overalls)
            ctx.fillStyle = '#049CD8';
            ctx.fillRect(-14, -h/2 + 28, 28, 20);

            // Overalls buttons
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(-4, -h/2 + 32, 3, 3);
            ctx.fillRect(1, -h/2 + 32, 3, 3);

            // Arms
            ctx.fillStyle = '#E52521';
            if (state === 'punch') {
                ctx.fillRect(14, -h/2 + 28, 20, 8);
                // Fist
                ctx.fillStyle = '#FFB84D';
                ctx.fillRect(32, -h/2 + 26, 10, 12);
            } else if (state === 'kick') {
                // Kicking leg extends
            } else if (state === 'special') {
                ctx.fillRect(14, -h/2 + 28, 16, 8);
                // Fireball
                ctx.fillStyle = '#FF6600';
                ctx.beginPath();
                ctx.arc(36, -h/2 + 32, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(36, -h/2 + 32, 4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(14, -h/2 + 28, 10, 8);
                ctx.fillRect(-24, -h/2 + 28, 10, 8);
            }

            // Legs
            if (state === 'kick') {
                ctx.fillStyle = '#049CD8';
                ctx.fillRect(-12, -h/2 + 48, 10, 14);
                ctx.fillRect(4, -h/2 + 44, 24, 8);
                // Boot
                ctx.fillStyle = '#4A2800';
                ctx.fillRect(24, -h/2 + 42, 12, 10);
            } else {
                ctx.fillStyle = '#049CD8';
                ctx.fillRect(-12, -h/2 + 48, 10, 14);
                ctx.fillRect(4, -h/2 + 48, 10, 14);
            }

            // Boots
            if (state !== 'kick') {
                ctx.fillStyle = '#4A2800';
                ctx.fillRect(-14, -h/2 + 60, 14, 6);
                ctx.fillRect(2, -h/2 + 60, 14, 6);
            } else {
                ctx.fillRect(-14, -h/2 + 60, 14, 6);
            }

            // Block shield
            if (state === 'block') {
                ctx.fillStyle = 'rgba(0, 150, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(0, 200, 255, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    },
    {
        id: 'luigi',
        name: 'Luigi',
        franchise: 'Super Mario',
        icon: '\u{1F49A}',
        color: '#00A651',
        secondaryColor: '#049CD8',
        speed: 4.5,
        jumpPower: 14,
        weight: 4,
        attacks: {
            punch: { damage: 7, range: 45, startup: 4, recovery: 8, knockback: 3 },
            kick: { damage: 11, range: 55, startup: 5, recovery: 11, knockback: 5 },
            special: { damage: 22, range: 70, startup: 8, recovery: 18, knockback: 12, name: 'Thunder Hand' }
        },
        description: 'Pula mais alto!',
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            // Hat (taller)
            ctx.fillStyle = '#00A651';
            ctx.fillRect(-14, -h/2 - 4, 28, 16);
            ctx.fillRect(-17, -h/2 + 8, 10, 6);

            // Face
            ctx.fillStyle = '#FFB84D';
            ctx.fillRect(-11, -h/2 + 12, 22, 18);

            // Eyes
            ctx.fillStyle = '#000';
            ctx.fillRect(-7, -h/2 + 16, 4, 5);
            ctx.fillRect(3, -h/2 + 16, 4, 5);

            // Mustache
            ctx.fillStyle = '#4A2800';
            ctx.fillRect(-9, -h/2 + 24, 18, 3);

            // Body
            ctx.fillStyle = '#049CD8';
            ctx.fillRect(-12, -h/2 + 30, 24, 22);

            ctx.fillStyle = '#FFD700';
            ctx.fillRect(-3, -h/2 + 34, 3, 3);
            ctx.fillRect(1, -h/2 + 34, 3, 3);

            // Arms
            ctx.fillStyle = '#00A651';
            if (state === 'punch') {
                ctx.fillRect(12, -h/2 + 30, 22, 7);
                ctx.fillStyle = '#FFB84D';
                ctx.fillRect(32, -h/2 + 28, 10, 11);
            } else if (state === 'special') {
                ctx.fillRect(12, -h/2 + 30, 14, 7);
                // Thunder
                ctx.fillStyle = '#00FF00';
                ctx.beginPath();
                ctx.arc(34, -h/2 + 33, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#AAFFAA';
                ctx.beginPath();
                ctx.arc(34, -h/2 + 33, 5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(12, -h/2 + 30, 9, 7);
                ctx.fillRect(-21, -h/2 + 30, 9, 7);
            }

            // Legs
            if (state === 'kick') {
                ctx.fillStyle = '#049CD8';
                ctx.fillRect(-10, -h/2 + 52, 9, 16);
                ctx.fillRect(3, -h/2 + 48, 26, 7);
                ctx.fillStyle = '#4A2800';
                ctx.fillRect(25, -h/2 + 46, 12, 9);
                ctx.fillRect(-12, -h/2 + 66, 13, 6);
            } else {
                ctx.fillStyle = '#049CD8';
                ctx.fillRect(-10, -h/2 + 52, 9, 16);
                ctx.fillRect(3, -h/2 + 52, 9, 16);
                ctx.fillStyle = '#4A2800';
                ctx.fillRect(-12, -h/2 + 66, 13, 6);
                ctx.fillRect(1, -h/2 + 66, 13, 6);
            }

            if (state === 'block') {
                ctx.fillStyle = 'rgba(0, 255, 100, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(0, 255, 150, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    },
    {
        id: 'sonic',
        name: 'Sonic',
        franchise: 'Sonic',
        icon: '\u{1F4A8}',
        color: '#0066FF',
        secondaryColor: '#FFD700',
        speed: 7,
        jumpPower: 13,
        weight: 3,
        attacks: {
            punch: { damage: 6, range: 40, startup: 2, recovery: 6, knockback: 2 },
            kick: { damage: 10, range: 50, startup: 4, recovery: 10, knockback: 4 },
            special: { damage: 28, range: 90, startup: 6, recovery: 22, knockback: 12, name: 'Spin Dash' }
        },
        description: 'O mais rapido!',
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            if (state === 'special') {
                // Spin ball
                ctx.fillStyle = '#0066FF';
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.fill();
                // Spines
                for (let i = 0; i < 6; i++) {
                    let angle = (frame * 0.3) + (i * Math.PI / 3);
                    ctx.fillStyle = '#003399';
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(angle) * 18, Math.sin(angle) * 18);
                    ctx.lineTo(Math.cos(angle) * 30, Math.sin(angle) * 30);
                    ctx.lineTo(Math.cos(angle + 0.3) * 18, Math.sin(angle + 0.3) * 18);
                    ctx.fill();
                }
                // Speed lines
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.6)';
                ctx.lineWidth = 2;
                for (let i = 0; i < 3; i++) {
                    let lx = -30 - i * 12;
                    ctx.beginPath();
                    ctx.moveTo(lx, -6 + i * 6);
                    ctx.lineTo(lx - 15, -6 + i * 6);
                    ctx.stroke();
                }
            } else {
                // Spines (hair)
                ctx.fillStyle = '#003399';
                ctx.beginPath();
                ctx.moveTo(-4, -h/2);
                ctx.lineTo(-20, -h/2 - 6);
                ctx.lineTo(-8, -h/2 + 6);
                ctx.lineTo(-24, -h/2 + 2);
                ctx.lineTo(-10, -h/2 + 12);
                ctx.lineTo(-22, -h/2 + 10);
                ctx.lineTo(-6, -h/2 + 16);
                ctx.fill();

                // Head
                ctx.fillStyle = '#0066FF';
                ctx.beginPath();
                ctx.arc(0, -h/2 + 14, 16, 0, Math.PI * 2);
                ctx.fill();

                // Face
                ctx.fillStyle = '#FFB84D';
                ctx.beginPath();
                ctx.arc(6, -h/2 + 16, 10, 0, Math.PI * 2);
                ctx.fill();

                // Eye
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.ellipse(6, -h/2 + 13, 6, 7, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(8, -h/2 + 14, 3, 0, Math.PI * 2);
                ctx.fill();
                // Green iris
                ctx.fillStyle = '#00AA00';
                ctx.beginPath();
                ctx.arc(8, -h/2 + 14, 2, 0, Math.PI * 2);
                ctx.fill();

                // Nose
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(14, -h/2 + 16, 2, 0, Math.PI * 2);
                ctx.fill();

                // Body
                ctx.fillStyle = '#0066FF';
                ctx.fillRect(-10, -h/2 + 28, 20, 16);

                // Belly
                ctx.fillStyle = '#FFB84D';
                ctx.beginPath();
                ctx.ellipse(0, -h/2 + 34, 7, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Arms
                ctx.fillStyle = '#0066FF';
                if (state === 'punch') {
                    ctx.fillRect(10, -h/2 + 30, 24, 6);
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(36, -h/2 + 33, 5, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(10, -h/2 + 30, 10, 6);
                    ctx.fillRect(-20, -h/2 + 30, 10, 6);
                    // Gloves
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(20, -h/2 + 33, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(-20, -h/2 + 33, 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Legs
                ctx.fillStyle = '#0066FF';
                if (state === 'kick') {
                    ctx.fillRect(-8, -h/2 + 44, 8, 14);
                    ctx.fillRect(4, -h/2 + 40, 26, 6);
                    // Shoe
                    ctx.fillStyle = '#CC0000';
                    ctx.fillRect(26, -h/2 + 38, 14, 10);
                    ctx.fillRect(-10, -h/2 + 56, 12, 8);
                } else {
                    ctx.fillRect(-8, -h/2 + 44, 8, 14);
                    ctx.fillRect(4, -h/2 + 44, 8, 14);
                    // Shoes
                    ctx.fillStyle = '#CC0000';
                    ctx.fillRect(-10, -h/2 + 56, 12, 8);
                    ctx.fillRect(2, -h/2 + 56, 12, 8);
                }
                // Shoe stripes
                ctx.fillStyle = '#fff';
                ctx.fillRect(-6, -h/2 + 58, 4, 2);
                ctx.fillRect(6, -h/2 + 58, 4, 2);
            }

            if (state === 'block') {
                ctx.fillStyle = 'rgba(0, 100, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(0, 150, 255, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    },
    {
        id: 'tails',
        name: 'Tails',
        franchise: 'Sonic',
        icon: '\u{1F98A}',
        color: '#FFB800',
        secondaryColor: '#FF8800',
        speed: 5,
        jumpPower: 15,
        weight: 2,
        attacks: {
            punch: { damage: 6, range: 42, startup: 3, recovery: 7, knockback: 2 },
            kick: { damage: 10, range: 48, startup: 5, recovery: 10, knockback: 4 },
            special: { damage: 20, range: 70, startup: 8, recovery: 16, knockback: 8, name: 'Tail Spin' }
        },
        description: 'Voa alto com 2 caudas!',
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            // Tails (the two tails)
            ctx.fillStyle = '#FFB800';
            let tailWave = Math.sin(frame * 0.2) * 8;
            ctx.beginPath();
            ctx.moveTo(-8, -h/2 + 42);
            ctx.quadraticCurveTo(-22, -h/2 + 30 + tailWave, -18, -h/2 + 16);
            ctx.quadraticCurveTo(-14, -h/2 + 30, -8, -h/2 + 42);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(-10, -h/2 + 40);
            ctx.quadraticCurveTo(-20, -h/2 + 32 + tailWave, -17, -h/2 + 20);
            ctx.quadraticCurveTo(-14, -h/2 + 32, -10, -h/2 + 40);
            ctx.fill();

            ctx.fillStyle = '#FFB800';
            ctx.beginPath();
            ctx.moveTo(-6, -h/2 + 44);
            ctx.quadraticCurveTo(-26, -h/2 + 36 - tailWave, -22, -h/2 + 20);
            ctx.quadraticCurveTo(-18, -h/2 + 36, -6, -h/2 + 44);
            ctx.fill();

            // Head
            ctx.fillStyle = '#FFB800';
            ctx.beginPath();
            ctx.arc(0, -h/2 + 14, 14, 0, Math.PI * 2);
            ctx.fill();

            // Ears
            ctx.beginPath();
            ctx.moveTo(-8, -h/2 + 2);
            ctx.lineTo(-14, -h/2 - 8);
            ctx.lineTo(-2, -h/2 + 4);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(8, -h/2 + 2);
            ctx.lineTo(14, -h/2 - 8);
            ctx.lineTo(2, -h/2 + 4);
            ctx.fill();

            // Face
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(4, -h/2 + 16, 8, 0, Math.PI * 2);
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(4, -h/2 + 12, 5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0066FF';
            ctx.beginPath();
            ctx.arc(6, -h/2 + 12, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(6, -h/2 + 12, 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Nose
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(12, -h/2 + 15, 2, 0, Math.PI * 2);
            ctx.fill();

            // Body
            ctx.fillStyle = '#FFB800';
            ctx.fillRect(-9, -h/2 + 28, 18, 14);

            // Belly
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(0, -h/2 + 34, 6, 7, 0, 0, Math.PI * 2);
            ctx.fill();

            // Arms
            ctx.fillStyle = '#FFB800';
            if (state === 'punch') {
                ctx.fillRect(9, -h/2 + 30, 20, 5);
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(31, -h/2 + 32, 4, 0, Math.PI * 2);
                ctx.fill();
            } else if (state === 'special') {
                // Tail spin attack
                ctx.fillStyle = '#FFB800';
                for (let i = 0; i < 4; i++) {
                    let angle = (frame * 0.4) + (i * Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.cos(angle) * 35, Math.sin(angle) * 35);
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = '#FFB800';
                    ctx.stroke();
                }
            } else {
                ctx.fillRect(9, -h/2 + 30, 8, 5);
                ctx.fillRect(-17, -h/2 + 30, 8, 5);
            }

            // Legs & Shoes
            if (state === 'kick') {
                ctx.fillStyle = '#FFB800';
                ctx.fillRect(-7, -h/2 + 42, 7, 12);
                ctx.fillRect(3, -h/2 + 38, 22, 5);
                ctx.fillStyle = '#CC0000';
                ctx.fillRect(21, -h/2 + 36, 12, 9);
                ctx.fillRect(-9, -h/2 + 52, 11, 7);
            } else {
                ctx.fillStyle = '#FFB800';
                ctx.fillRect(-7, -h/2 + 42, 7, 12);
                ctx.fillRect(3, -h/2 + 42, 7, 12);
                ctx.fillStyle = '#CC0000';
                ctx.fillRect(-9, -h/2 + 52, 11, 7);
                ctx.fillRect(1, -h/2 + 52, 11, 7);
            }

            if (state === 'block') {
                ctx.fillStyle = 'rgba(255, 184, 0, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 200, 0, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    },
    {
        id: 'bugs',
        name: 'Bugs Bunny',
        franchise: 'Looney Tunes',
        icon: '\u{1F430}',
        color: '#AAAAAA',
        secondaryColor: '#FF6B00',
        speed: 5,
        jumpPower: 13,
        weight: 3,
        attacks: {
            punch: { damage: 7, range: 48, startup: 3, recovery: 7, knockback: 3 },
            kick: { damage: 11, range: 55, startup: 5, recovery: 11, knockback: 5 },
            special: { damage: 22, range: 85, startup: 8, recovery: 18, knockback: 9, name: 'Carrot Cannon' }
        },
        description: "What's up, Doc?",
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            // Ears
            ctx.fillStyle = '#BBBBBB';
            let earWave = Math.sin(frame * 0.1) * 3;
            ctx.fillRect(-6, -h/2 - 20 + earWave, 8, 24);
            ctx.fillRect(2, -h/2 - 18 - earWave, 8, 22);
            // Inner ear
            ctx.fillStyle = '#FFAAAA';
            ctx.fillRect(-4, -h/2 - 16 + earWave, 4, 18);
            ctx.fillRect(4, -h/2 - 14 - earWave, 4, 16);

            // Head
            ctx.fillStyle = '#BBBBBB';
            ctx.beginPath();
            ctx.ellipse(0, -h/2 + 14, 14, 16, 0, 0, Math.PI * 2);
            ctx.fill();

            // White cheeks
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(2, -h/2 + 18, 10, 10, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(-4, -h/2 + 10, 5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(6, -h/2 + 10, 5, 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(-3, -h/2 + 11, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(7, -h/2 + 11, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Nose
            ctx.fillStyle = '#FF6B6B';
            ctx.beginPath();
            ctx.arc(2, -h/2 + 17, 3, 0, Math.PI * 2);
            ctx.fill();

            // Teeth
            ctx.fillStyle = '#fff';
            ctx.fillRect(-2, -h/2 + 22, 4, 5);
            ctx.fillRect(2, -h/2 + 22, 4, 5);
            ctx.strokeStyle = '#aaa';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(-2, -h/2 + 22, 4, 5);
            ctx.strokeRect(2, -h/2 + 22, 4, 5);

            // Body
            ctx.fillStyle = '#BBBBBB';
            ctx.fillRect(-10, -h/2 + 30, 20, 18);

            // Belly
            ctx.fillStyle = '#ddd';
            ctx.beginPath();
            ctx.ellipse(0, -h/2 + 38, 7, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Arms
            ctx.fillStyle = '#BBBBBB';
            if (state === 'punch') {
                ctx.fillRect(10, -h/2 + 32, 22, 6);
                // Glove
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(34, -h/2 + 35, 5, 0, Math.PI * 2);
                ctx.fill();
            } else if (state === 'special') {
                ctx.fillRect(10, -h/2 + 32, 12, 6);
                // Carrot projectile
                ctx.fillStyle = '#FF6B00';
                ctx.beginPath();
                ctx.moveTo(28, -h/2 + 32);
                ctx.lineTo(44, -h/2 + 35);
                ctx.lineTo(28, -h/2 + 38);
                ctx.fill();
                // Carrot leaves
                ctx.fillStyle = '#00AA00';
                ctx.beginPath();
                ctx.moveTo(28, -h/2 + 33);
                ctx.lineTo(22, -h/2 + 28);
                ctx.lineTo(26, -h/2 + 35);
                ctx.fill();
            } else {
                ctx.fillRect(10, -h/2 + 32, 9, 6);
                ctx.fillRect(-19, -h/2 + 32, 9, 6);
            }

            // Legs
            ctx.fillStyle = '#BBBBBB';
            if (state === 'kick') {
                ctx.fillRect(-8, -h/2 + 48, 8, 14);
                ctx.fillRect(3, -h/2 + 44, 24, 6);
                // Feet
                ctx.fillStyle = '#999';
                ctx.beginPath();
                ctx.ellipse(29, -h/2 + 48, 8, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(-4, -h/2 + 64, 8, 4, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-8, -h/2 + 48, 8, 14);
                ctx.fillRect(3, -h/2 + 48, 8, 14);
                // Feet
                ctx.fillStyle = '#999';
                ctx.beginPath();
                ctx.ellipse(-4, -h/2 + 64, 8, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(7, -h/2 + 64, 8, 4, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            if (state === 'block') {
                ctx.fillStyle = 'rgba(170, 170, 170, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    },
    {
        id: 'taz',
        name: 'Taz',
        franchise: 'Looney Tunes',
        icon: '\u{1F32A}',
        color: '#8B4513',
        secondaryColor: '#FFD700',
        speed: 3.5,
        jumpPower: 10,
        weight: 7,
        attacks: {
            punch: { damage: 10, range: 50, startup: 5, recovery: 10, knockback: 5 },
            kick: { damage: 14, range: 55, startup: 7, recovery: 14, knockback: 7 },
            special: { damage: 30, range: 100, startup: 12, recovery: 24, knockback: 14, name: 'Tornado Spin' }
        },
        description: 'Forca bruta total!',
        drawCharacter: function(ctx, x, y, w, h, facing, frame, state) {
            ctx.save();
            ctx.translate(x + w/2, y + h/2);
            if (facing === -1) ctx.scale(-1, 1);

            if (state === 'special') {
                // Tornado spin
                let spinAngle = frame * 0.5;
                for (let i = 0; i < 8; i++) {
                    let a = spinAngle + (i * Math.PI / 4);
                    let r = 20 + i * 2;
                    ctx.fillStyle = i % 2 === 0 ? '#8B4513' : '#6B3410';
                    ctx.beginPath();
                    ctx.moveTo(0, -10);
                    ctx.lineTo(Math.cos(a) * r, -20 + i * 6);
                    ctx.lineTo(Math.cos(a + 0.5) * (r + 5), -15 + i * 6);
                    ctx.fill();
                }
                // Face in center
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.arc(0, -5, 16, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFB84D';
                ctx.beginPath();
                ctx.arc(2, -3, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(-2, -6, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(5, -6, 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Head
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.ellipse(0, -h/2 + 16, 16, 18, 0, 0, Math.PI * 2);
                ctx.fill();

                // Spiky hair
                for (let i = 0; i < 5; i++) {
                    ctx.fillStyle = '#6B3410';
                    ctx.beginPath();
                    ctx.moveTo(-12 + i * 6, -h/2 + 2);
                    ctx.lineTo(-9 + i * 6, -h/2 - 8);
                    ctx.lineTo(-6 + i * 6, -h/2 + 2);
                    ctx.fill();
                }

                // Face
                ctx.fillStyle = '#FFB84D';
                ctx.beginPath();
                ctx.ellipse(2, -h/2 + 20, 10, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                // Eyes (angry)
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.ellipse(-3, -h/2 + 14, 5, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(7, -h/2 + 14, 5, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(-2, -h/2 + 15, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(8, -h/2 + 15, 2.5, 0, Math.PI * 2);
                ctx.fill();

                // Big mouth
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.ellipse(2, -h/2 + 24, 8, 5, 0, 0, Math.PI);
                ctx.fill();
                // Tongue
                ctx.fillStyle = '#FF4444';
                ctx.beginPath();
                ctx.ellipse(2, -h/2 + 26, 4, 3, 0, 0, Math.PI);
                ctx.fill();

                // Body (stocky)
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(-14, -h/2 + 30, 28, 22);

                // Belly
                ctx.fillStyle = '#C4A265';
                ctx.beginPath();
                ctx.ellipse(0, -h/2 + 40, 10, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                // Arms (thick)
                ctx.fillStyle = '#8B4513';
                if (state === 'punch') {
                    ctx.fillRect(14, -h/2 + 32, 24, 10);
                    ctx.fillStyle = '#6B3410';
                    ctx.beginPath();
                    ctx.arc(40, -h/2 + 37, 7, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(14, -h/2 + 32, 12, 10);
                    ctx.fillRect(-26, -h/2 + 32, 12, 10);
                }

                // Legs (short and thick)
                if (state === 'kick') {
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(-12, -h/2 + 52, 12, 10);
                    ctx.fillRect(4, -h/2 + 48, 26, 8);
                    ctx.fillStyle = '#6B3410';
                    ctx.beginPath();
                    ctx.ellipse(32, -h/2 + 53, 8, 5, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(-6, -h/2 + 64, 9, 5, 0, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(-12, -h/2 + 52, 12, 12);
                    ctx.fillRect(4, -h/2 + 52, 12, 12);
                    ctx.fillStyle = '#6B3410';
                    ctx.beginPath();
                    ctx.ellipse(-6, -h/2 + 64, 9, 5, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.ellipse(10, -h/2 + 64, 9, 5, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            if (state === 'block') {
                ctx.fillStyle = 'rgba(139, 69, 19, 0.4)';
                ctx.beginPath();
                ctx.arc(0, 0, 32, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(200, 150, 50, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.restore();
        }
    }
];
