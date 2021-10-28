require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());

app.get('/', (_req, res) => {
  res.render('index');
});

http.listen(port, () => console.log(`Rodando na porta ${port}`));
