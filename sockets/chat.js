module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('serverMessage', { nickname, chatMessage });
  });
});
