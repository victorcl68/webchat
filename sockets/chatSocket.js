const { nowDateFormatted } = require('../utils');
const { insertMessage } = require('../models');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = `${nowDateFormatted()} - ${nickname}: ${chatMessage}`;
    await insertMessage(message);
    io.emit('message', message);
  });
});
