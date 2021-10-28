require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

const { chatController } = require('./controllers');

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.get('/', chatController);

http.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
