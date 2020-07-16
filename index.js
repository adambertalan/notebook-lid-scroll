const html = document.documentElement;
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const frameCount = 19;
const frames = [];
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `./images/${(i + '').padStart(3, '0')}.png`;
    frames.push(img);
}

let img = frames[0];
img.onload = function () {
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    img = frames[index];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex))
});