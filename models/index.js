const { getAllMessages } = require('./chatModel');
const { insertMessage } = require('./chatModel');
const { excludeAllMessages } = require('./chatModel');

module.exports = { getAllMessages, insertMessage, excludeAllMessages };
