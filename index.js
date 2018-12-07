var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function(){
	console.log(`listening to requests on' ${ PORT }`);
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('made socket connection', socket.id);

	socket.on('chat', function(data){
		//sockets refers to all sockets connected
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		//socket below refers to individual socket
		//sends to all sockets except the one it came from
		socket.broadcast.emit('typing', data);
	});
});
