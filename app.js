var express = require("express");
var app = express();
app.use(express.static(__dirname));

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function (req,res){
	res.sendFile('index.html');
});

http.listen(3000,function(){
	console.log('listenning on : 3000');
	
});

var id = 0;
io.on('connection',function (socket){
	//console.log('a user connected');
	socket.on('player_created',function (data){
		id ++;
		console.log("new player : ",data.x + " - " + data.y)
		socket.emit('player_id',{id : id});
		socket.broadcast.emit('new_player_connected',{id:id, x : data.x , y : data.y }); //gửi thông điệp đến tất cả các client khác 
	});
});