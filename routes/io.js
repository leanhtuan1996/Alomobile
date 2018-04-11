var io = require('socket.io')();

var users = [];

/**
 * Index
 */

var updateUser = (uid) => {
    if (users.length == 0) { 
        users.push(uid);
        return
    }

    if (!users.find(id => {
        return id == uid
    })) {
        users.push(uid)
    }
}

var removeUser = (uid) => {
    if (users.length == 0) { return }
    var index = users.findIndex(user => {
        return user == uid
    });

    if (!index || index == -1) {
        return
    }

    users.splice(index, 1);
}

io.of('/').on('connection', (socket) => {
    console.log('/index: ' + socket.id + " connected!");
    updateUser(socket.id)

    socket.on('disconnect', () => {        
        console.log('/index: ' + socket.id + " disconnected!");
        removeUser(socket.id)
        socket.emit('update-current-user', users);
    });

    socket.emit('update-current-user', users);
});

module.exports = io;