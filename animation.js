class Animation{
	constructor(x,y,name,number,speed){
	
		this.x = x;
		this.y = y;
		this.countFrame = number;
		this.sprites = new Array();
		this.index = 0;
		for(var i = 1;i <= number;i ++){
			var image = new Image();
			var dir = "images/" + name + i + ".png";
			image.src = dir;
			this.sprites.push(image); 
		}
		this.count = 0;
		this.speed = speed;
	}
	update(){
		this.count ++;
		if(this.count >= this.speed){
		this.count = 0;
		this.index ++;
		this.index %= this.countFrame;
	    }

	}
	draw(context){
		context.drawImage(this.sprites[this.index],this.x,this.y);
	}
}

class Tankanimation{
	constructor(x,y,name,number,speed){
	
		this.x = x;
		this.y = y;
		this.countFrame = number;
		this.sprites = new Array();
		this.index = 0;
		for(var i = 1;i <= number;i ++){
			var image = new Image();
			var dir = "images/" + name + i + ".png";
			image.src = dir;
			this.sprites.push(image); 
		}
		this.count = 0;
		this.speed = speed;
	}
	update(){
		this.count ++;
		if(this.count >= this.speed){
		this.count = 0;
		this.index ++;
		this.index %= this.countFrame;
	    }
	}
	update1(){
		this.x += 0;
		this.y += 0;
		this.count ++;
		if(this.count >= this.speed){
		this.count = 0;
		this.index ++;
		this.index %= this.countFrame;
	    }

	}
	draw(context){
		context.drawImage(this.sprites[this.index],player.x,player.y);
	}

}