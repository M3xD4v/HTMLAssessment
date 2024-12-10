const canvas = document.getElementById('grain-canvas');
const ctx = canvas.getContext('2d');


const offscreenCanvas = document.createElement('canvas');
const offCtx = offscreenCanvas.getContext('2d');


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    offscreenCanvas.width = Math.floor(window.innerWidth / 1);
    offscreenCanvas.height = Math.floor(window.innerHeight / 1);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let time = 0;

const noiseTexture = createNoiseTexture(offscreenCanvas.width, offscreenCanvas.height);

function createNoiseTexture(width, height) {
    const imageData = new ImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() > 0.5 ? 255 : 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
    }

    return imageData;
}

function updateNoiseTexture(imageData) {
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.1) {
            const value = Math.random() > 0.5 ? 255 : 0;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
        }
    }
}

var ix = 0;
var direction = 1;

function drawSunshine() {
    const centerX = 0;
    const centerY = canvas.height / 2;
    const numRays = 4;
    const numRays2 = 4;
    const rayWidth = Math.PI / 3;
    const rayLength = canvas.width;
    const brightness = 0.1
    const blur = 100;
    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    ctx.globalCompositeOperation = 'lighter';
    ix += 8 * direction;
    if (ix >= 2500 || ix <= 0) {
        direction *= -1;
    }
    for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX + ix, centerY + ix, rayLength, angle, angle + rayWidth);
        ctx.closePath();

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, rayLength);
        gradient.addColorStop(0, `rgba(33, 73, 233, ${brightness})`);
        gradient.addColorStop(1, 'rgba(33, 73, 233, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();
    }

    for (let i = 0; i < numRays2; i++) {
        const angle = (i / numRays2) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(canvas.width, centerY - 500);
        ctx.arc(canvas.width, centerY - ix, rayLength, angle, angle + rayWidth);
        ctx.closePath();

        const gradient = ctx.createRadialGradient(canvas.width, centerY, 0, canvas.width, centerY, rayLength);
        gradient.addColorStop(0, `rgba(33, 73, 233, ${brightness})`);
        gradient.addColorStop(1, 'rgba(33, 73, 233, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();
    }

    ctx.restore();
}


function applyGrainEffect() {
    const width = offscreenCanvas.width;
    const height = offscreenCanvas.height;
    const imageData = offCtx.createImageData(width, height);
    const data = imageData.data;

    const pulse = Math.sin(time) * 0.5 + 0.5;
    const centerX = width / 2;
    const centerY = height / 2;

    updateNoiseTexture(noiseTexture);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;

            const noiseIndex = index;
            const value = noiseTexture.data[noiseIndex];
            const opacity = 10 + (pulse * 15);

            data[index] = value;
            data[index + 1] = value;
            data[index + 2] = value;
            data[index + 3] = opacity * 0.5;
        }
    }

    offCtx.putImageData(imageData, 0, 0);
}


function draw() {
    time += 0.05;

    
    applyGrainEffect();

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);

    
    drawSunshine();

    requestAnimationFrame(draw);
}

draw();
