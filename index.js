var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});

// Static files
app.use(express.static('../client'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('message', function(data){
        io.sockets.emit('message', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});