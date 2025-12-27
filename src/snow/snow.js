const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let density = 'Med'; // Default density
let speed = 'Slow';   // Default speed

// Configuration map
const config = {
    density: {
        Low: 50,
        Med: 150,
        High: 300
    },
    speed: {
        Slow: 1,
        Fast: 3
    }
};

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

class Snowflake {
    constructor() {
        this.reset();
        // Start at random y to fill screen initially
        this.y = Math.random() * height;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = (Math.random() * 1 + 0.5) * config.speed[speed];
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around
        if (this.y > height) {
            this.reset();
        }
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const count = config.density[density];
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Snowflake());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// IPC Handlers
window.electronAPI.onUpdateSettings((settings) => {
    if (settings.density) { // Only re-init if density changes to avoid resetting positions unnecessarily
        density = settings.density;
        initParticles();
    }
    if (settings.speed) {
        speed = settings.speed;
        // Update speed for existing particles dynamically
        particles.forEach(p => {
            // Re-calculate speedY based on new multiplier, keeping randomness
            p.speedY = (Math.random() * 1 + 0.5) * config.speed[speed];
        });
    }
});

window.addEventListener('resize', resize);
resize();
animate();
