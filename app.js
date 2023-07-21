let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;

const player = new Player((canvasWidth/2), (canvasHeight/2), 50, 50);

function animation() {
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    animate = requestAnimationFrame(animation);
    // canvasWidth = window.innerWidth;
    // canvasHeight = window.innerHeight;    
    // canvas.width = canvasWidth;
    // canvas.height = canvasHeight;
    
    if (player) {
        player.draw(ctx);
        player.control();
    }
}

animation();