class Building extends GameObject{

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.healthPoints = 5;
        this.speed = 0;
        this.isBuilding = true;
        this.isAlive = true;
        
    }

    draw(ctx){
        ctx.fillStyle = 'blue'; 
        super.draw(ctx);
   
        
    }

    death(){
        if (this.healthPoints <= 0) {
           this.isAlive = false; 
        }
    }
    
}