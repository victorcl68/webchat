const connection = require('./connection');

const getAllMessages = async () => connection()
  .then((db) => db.collection('messages').find().toArray());

const insertMessage = async (message, nickname, timestamp) => connection()
  .then((db) => db.collection('messages').insertOne({ message, nickname, timestamp }));

const excludeAllMessages = async () => connection()
  .then((db) => db.collection('messages').drop());

module.exports = { getAllMessages, insertMessage, excludeAllMessages };
