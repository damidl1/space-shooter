class Player extends GameObject{

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];
        this.cooldown = 15;
        this.healthPoints = 3;
        this.score = 0;
        this.isPlayer = true;
    }

    draw(ctx){
        ctx.fillStyle = 'green';
        super.draw(ctx);
        this.cooldown --;
        this.projectiles = this.projectiles.filter(p => p.isAlive);
        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            projectile.draw(ctx);
            projectile.move();
            
        }

       
    }

    control(canvasWidth, canvasHeight){
        document.onkeydown = (keyevent => {
            
            this.controller[keyevent.key] = true;
      });

      document.onkeyup = (keyevent => {
        
        this.controller[keyevent.key] = false;
      });
    //   console.log(this.controller);

       
            if (this.controller["ArrowLeft"]) {
                this.x = this.x > 0 ? this.x - this.speed : 0;
               
            }
            if (this.controller["ArrowRight"]) {
                this.x = (this.x + this.width) < canvasWidth ? this.x + this.speed : canvasWidth - this.width; 
                
            }
            // if (this.controller["ArrowUp"]) {
            //     this.y = this.y > 0 ? this.y - this.speed : 0;
            //     if (this.y <= 0) {
            //         this.y = 0;
            //     }
            // }
            // if (this.controller["ArrowDown"]) {
            //     this.y = (this.y + this.height) < canvasHeight ? this.y + this.speed : canvasHeight - this.height;
                
            // }
            if (this.controller[" "]) {
                this.baseAttack();
            }
      
    }

    baseAttack(){
            
        if (this.cooldown <= 0) {
            let projectile = new Projectile(this.x + (this.width/2) - 2.5, this.y, 5, 20);
            this.projectiles.push(projectile); 
            this.cooldown = 15;
        }
      
    }

    death(){
        if (this.healthPoints <= 0) {
            
        }
    }
    
}



        


      