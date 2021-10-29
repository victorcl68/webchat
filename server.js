require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chatSocket')(io);

const { chatRouter } = require('./routers');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use('/', chatRouter);

http.listen(port, () => console.log(`Rodando na porta ${port}`));
