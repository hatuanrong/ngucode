class Brick{
	constructor(i,j,width,height){
		this.x = j * 31;
		this.y = i * 31;
		this.width = width;
		this.height = height;
		this.sprite = new Image();
		this.sprite.src = "images/wall_brick.png";
	}
	draw(context){
		context.drawImage(this.sprite,this.x,this.y,this.width,this.height);
	}
}

class Steel{
	constructor(i,j,width,height){
		this.x = j * 31;
		this.y = i * 31;
		this.width = width;
		this.height = height;
		this.sprite = new Image();
		this.sprite.src = "images/wall_steel.png";
	}
	draw(context){
		context.drawImage(this.sprite,this.x,this.y,this.width,this.height);
	}
}
class Water{
	constructor(i,j,width,height){
		this.x = j * 31;
		this.y = i * 31;
		this.width = width;
		this.height = height;
		this.sprite = new Animation(this.x,this.y,"water_",2,50);
	}
	draw(context){
		this.sprite.draw(context);
	}
	update(){
		this.sprite.update();
	}
}
class Forest{
	constructor(i,j,width,height){
		this.x = j * 31;
		this.y = i * 31;
		this.width = width;
		this.height = height;
		this.sprite = new Image();
		this.sprite.src = "images/trees.png";
	}
	draw(context){
		context.drawImage(this.sprite,this.x,this.y,this.width,this.height);
	}
}


