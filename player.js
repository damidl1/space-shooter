class Player extends GameObject{

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 10;
        this.controller = {};
        this.projectiles = [];
        this.cooldown = 30;
    }

    draw(ctx){
        super.draw(ctx);
        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            projectile.draw(ctx);
            projectile.move();
            
        }
    }

    control(){
        document.onkeydown = (keyevent => {
            
            this.controller[keyevent.key] = true;
      });

      document.onkeyup = (keyevent => {
        
        this.controller[keyevent.key] = false;
      });
      console.log(this.controller);

      for (const key in this.controller) {  // for in unico for che vede un oggetto come fosse un array
            if (key.includes('Left') && this.controller[key]) {
                this.x = this.x - this.speed;
            }
            if (key.includes('Right') && this.controller[key]) {
                this.x = this.x + this.speed;
            }
            if (key.includes('Up') && this.controller[key]) {
                this.y = this.y - this.speed;
            }
            if (key.includes('Down') && this.controller[key]) {
                this.y = this.y + this.speed;
            }
            if (key === ' ' && this.controller[key]) {
                this.baseAttack();
            }


      }
    }

    baseAttack(){

        let projectile = new Projectile(this.x + (this.width/2) - 2.5, this.y, 5, 20);
        this.projectiles.push(projectile);
    }
}



        


      