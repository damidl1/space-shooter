class BaseEnemy extends GameObject{

    constructor(x, y, width, height, moveLeft, moveRight){
        super(x, y, width, height);
        this.speed = 3;
        this.isAlive = true;
        this.healthPoints = 1;
        this.score = 100;
        this.state = Math.random() < 0.5 ? moveLeft : moveRight;
        this.moveLeft = this.x + this.speed;
        this.moveRight =  - this.x + this.speed;
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        super.draw(ctx);
        // this.death();
    }

    move(canvasHeight){
        this.x = this.x + this.speed;
        this.y = this.y + this.speed;
        this.outOfGame(canvasHeight);
        this.enemyStates();
    }

    outOfGame(canvasHeight){
        if (this.y >= canvasHeight) {
            this.isAlive = false;
        }
    }

    death(){
        if (this.healthPoints <= 0) {
            this.isAlive = false;
        }
    }


    enemyStates() {
    
    // let state = 'moveEnemy'; 
    let moveDown = this.y + this.speed;
    // let moveLeft = this.x + this.speed;
    // let moveRight = - this.x + this.speed;
    
    switch (state) {
        case "moveRight":
            if (this.x >= canvasWidth -50) {
                moveDown;
            }
            break;
            case "moveLeft":
                if (this.x <= 50) {
                    moveDown;
                }
                break;
                
        default:
            break;
    }
 }
}