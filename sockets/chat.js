module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', ({ nickname, chatMessage }) => {
    io.emit('serverMessage', { nickname, chatMessage });
  });
});