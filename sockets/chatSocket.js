const { nowDateFormatted } = require('../utils');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const message = `${nowDateFormatted()} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});
