
var port 	= 8080;

var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io 		= require('socket.io').listen(server);


app.use(express.static(__dirname + '/public'));

//listen of incoming connections..
server.listen(port);
console.log('\t :: Express :: Listening on port: ' + port);

//express routing
// send client to index.html...
app.get('/', function(req,res) {
	res.sendfile(__dirname + '/index.html')
});



io.sockets.on('connection', function (socket) {

	//listen for mouse move events
	socket.on('mousemove', function(data){

		//send mouse movement to clients
		socket.broadcast.emit('movement', data);

	});

});

