var context;
var map;
var arrBrick = [];
var arrSteel = [];
var player;
var countBullet = 0;
var bullet = [];
var arrWater = [];
var arrForest = [];
var socket;
var enemyTanks = [];

window.onload = function(){
    var canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    gameStart();
    this.interval = setInterval(gameLoop,10);
map=[   [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],];
        
        for(var i = 0;i < 16;i ++){
            for(var j = 0;j < 26;j ++){
                if(map[i][j] == 1){
                    var brick = new Brick(i,j,31,31);
                    arrBrick.push(brick);
                }
                if(map[i][j] == 2){
                    var steel = new Steel(i,j,31,31);
                    arrSteel.push(steel);
                }
                
                if(map[i][j] == 3){
                    var water = new Water(i,j,31,31);
                    arrWater.push(water);
                }
                if(map[i][j] == 4){
                    var forest = new Forest(i,j,31,31);
                    arrForest.push(forest);
                }
                
            }
        }
        initSocketClient();

}

function initSocketClient(){
    socket = io.connect();
    socket.emit('player_created',{ x : player.x , y : player.y});
    socket.on('player_id',function (data){
        console.log(data.id);
    });
    socket.on('new_player_connected',function(data){
        var newtank = new Tank(data.x ,data.y ,30,30);
        enemyTanks.push(newtank);
        console.log("deo hieu"+newtank.x);

    });
}
var gameLoop = function(){
    gameUpdate();
    gameDrawer(context);
}
function gameStart(){
    player = new Tank(100,100,31,31);


    for(var i = 1; i<=1000; i++){
        bullet[i] = new Bullet(0,0,1,5,5);
    }
    
}

function checkhit(obj1,obj2){
    var res = true;
    
     if((obj1.x >= obj2.x - 31 && obj1.x < obj2.x && obj1.y >= obj2.y - 29 && obj1.y <= obj2.y + 29 && obj1.direction == 4)|| 
        (obj1.x <= obj2.x + 31 && obj1.x > obj2.x && obj1.y >= obj2.y - 29 && obj1.y <= obj2.y + 29 && obj1.direction == 3) || 
        (obj1.y <= obj2.y + 31 && obj1.y > obj2.y && obj1.x >= obj2.x - 29 && obj1.x <= obj2.x + 29 && obj1.direction == 1) ||
        (obj1.y >= obj2.y - 31 && obj1.y < obj2.y && obj1.x >= obj2.x - 29 && obj1.x <= obj2.x + 29 && obj1.direction == 2) )
     {
        res = false;
     }
     else {
        res = true;
     }
     return res;
}

function checkbullet(obj1,obj2){
    var res = true;
     if(obj1.x >= obj2.x - 14 && obj1.x <= obj2.x + 17 && obj1.y >= obj2.y - 14 && obj1.y <= obj2.y + 17)
     {
        res = false;
     }
     else {
        res = true;
     }
     return res;
}

function gameUpdate(){
    var d = 0;
    for(var i = 0 ;i < enemyTanks.length; i ++){
        enemyTanks[i].update();
    }
    for(var i =0;i < arrWater.length;i++){
        arrWater[i].update();
    }
    for(var i = 0;i < arrBrick.length;i ++){
    if( checkhit(player,arrBrick[i]) == false){
    player.update1();
    }
    if(checkhit(player,arrBrick[i]) == true ){
        d ++;
    }
    }
    

    var c = 0;
    
    for(var j = 0;j < arrWater.length;j ++){
    if( checkhit(player,arrWater[j]) == false){
    
    }
    if(checkhit(player,arrWater[j]) == true){
        c ++;
    }
    }
    
     var e = 0;
    
    for(var j = 0;j < arrSteel.length;j ++){
    if( checkhit(player,arrSteel[j]) == false){
    player.update1();
    }
    if(checkhit(player,arrSteel[j]) == true){
        e ++;
    }
    }



    if(d == arrBrick.length && c == arrWater.length && e == arrSteel.length){
    player.update();
    }
    
    if (countBullet!=0)
    for(var i = 1; i<=countBullet; i++){
        bullet[i].update();
    }
}


function gameDrawer(context){
    context.fillStyle = "black";
    context.fillRect(0,0,window.innerWidth, window.innerHeight);
    

    for(var i = 0;i < enemyTanks.length; i ++){
        enemyTanks[i].draw(context);
    }

    for(var i = 0;i < arrBrick.length;i ++){
        arrBrick[i].draw(context);
    }

    for(var i = 0;i < arrSteel.length;i ++){
        arrSteel[i].draw(context);
    }
    
    for(var i = 0;i < arrWater.length;i ++){
        arrWater[i].draw(context);
    }
    for(var i =0;i < arrForest.length;i ++){
        arrForest[i].draw(context);
    }
     if (countBullet!=0)
        for(var i = 1; i<=countBullet; i++){
            bullet[i].draw(context);
        }
    player.draw(context);
    for(var i = countBullet;i >= 1;i--){
    for(var j = 0;j < arrBrick.length;j ++){
        if(checkbullet(bullet[i],arrBrick[j]) == false){
        bullet.splice(i,1);
        arrBrick.splice(j,1);
        }
        }
    }
      
    for(var i = countBullet;i >= 1;i --){
    for(var j = 0;j < arrSteel.length;j ++){
        if(checkbullet(bullet[i],arrSteel[j]) == false){
        bullet.splice(i,1);
        }
        }
    }
}


window.onkeydown = function(e){
    switch (e.keyCode){
        case 38:
            player.move(1);
            break;
        case 39:
            player.move(4);
            break;
        case 40:
            player.move(2);
            break;
        case 37:
            player.move(3);
            break;
        case 65://a
            player.move(3);
            break;
        case 68: //d
            player.move(4);
            break;
        case 83: //s
            player.move(2);
            break;
        case 87://w
            player.move(1);
            break;
        case 32://spacebar
            countBullet +=1;
            bullet[countBullet].x = player.x;
            bullet[countBullet].y = player.y;
            bullet[countBullet].move(player.direction);
            break;
    }
}


window.onkeyup = function(e){
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68: //d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83: //s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;

        case 37://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 39: //d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 40: //s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 38://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
}
