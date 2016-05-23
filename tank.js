class Tank{
    constructor(x, y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.direction = 4;
        this.sprite = new Tankanimation(this.x,this.y,"tank_player1_right_c0_t1_s",2,50);
        this.spriteUp = new Tankanimation(this.x,this.y,"tank_player1_up_c0_t1_s",2,50);
        this.spriteDown = new Tankanimation(this.x,this.y,"tank_player1_down_c0_t1_s",2,50);
        this.spriteLeft = new Tankanimation(this.x,this.y,"tank_player1_left_c0_t1_s",2,50);
        this.spriteRight = new Tankanimation(this.x,this.y,"tank_player1_right_c0_t1_s",2,50);
    
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.sprite.update();
    }
    
    update1(){
        this.x += 0;
        this.y += 0;
        this.sprite.update1();
    }
    
    draw(context){
       this.sprite.draw(context);
   }
    
    move(direction){
        switch (direction){
            case 1://up
                this.speedY = -2;
                this.speedX = 0;
                this.sprite = this.spriteUp;
                this.direction = direction;
                break;
            case 2://down
                this.speedY = 2;
                this.speedX = 0;
                this.sprite = this.spriteDown;
                this.direction = direction;
                break;
            case 3://left
                this.speedX = -2;
                this.speedY = 0;
                this.sprite = this.spriteLeft;
                this.direction = direction;
                break;
            case 4://right
                this.speedX = 2;
                this.speedY = 0;
                this.sprite = this.spriteRight;
                this.direction = direction;
                break;
        }
    }
    
}