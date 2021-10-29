const { nowDateFormatted } = require('../utils');
const { insertMessage } = require('../models');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const message = `${nowDateFormatted()} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
  socket.on('messageInfo', async ({ message, nickname, timestamp }) => {
    const timestampNow = nowDateFormatted(timestamp);
    await insertMessage(message, nickname, timestampNow);
  });
});
