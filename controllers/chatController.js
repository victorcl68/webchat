const { getAllMessages } = require('../models');

const chatController = async (_req, res) => {
  const allMessages = await getAllMessages();
  return res.status(200).render('index', { allMessages });
};

module.exports = { chatController };
