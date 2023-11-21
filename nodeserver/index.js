const io = require('socket.io')(8000);
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('new-user-joined', (name) => {
        console.log('New user joined:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        console.log('Message received:', message);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', (message) => {
        // console.log('Message received:', message);
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });

});

