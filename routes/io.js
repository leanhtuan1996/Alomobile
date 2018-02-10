var io = require('socket.io')();

/**
 * Index
 */

io.of('/').on('connection', (socket) => {
    console.log('/index: ' + socket.id + " connected!");

    socket.on('disconnect', () => {
        console.log('/index: ' + socket.id + " disconnected!");
    });
});

module.exports = io;