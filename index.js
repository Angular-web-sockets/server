let express = require('express');
let socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});

// Static files
app.use(express.static('../client'));

// Socket setup
let io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);

    socket.on('message', function(data){
        io.sockets.emit('message', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});