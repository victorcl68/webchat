const { currentDateFormatted } = require('../utils');
const { insertMessage } = require('../models');

const users = {};
// after many attempts I found this way to solve the problem of relating the socket id with the nickname 
// of Marcos Leandro PR: https://github.com/tryber/sd-010-b-project-webchat/pull/61/

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('connection', ({ nickname }) => {
    users[socket.id] = nickname;
    io.emit('users', users);
  });
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = `${currentDateFormatted()} - ${nickname}: ${chatMessage}`;
    await insertMessage(message);
    io.emit('message', message);
  });
  socket.on('updateNickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('users', users);
  });
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', users);
  });
});
