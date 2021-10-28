const socket = window.io();

const form = document.querySelector('form');
const chatMessageValue = document.querySelector('.messageInput');
const nicknameValue = document.querySelector('.nicknameInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', 
    { chatMessage: chatMessageValue.value, nickname: nicknameValue.value });
  chatMessageValue.value = '';
  nicknameValue.value = '';
  return false;
});

const nowDateFormatted = () => {
  const data = new Date();

  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  const hours = data.getHours() % 12 || 12;
  const minutes = data.getMinutes();
  const seconds = data.getSeconds();
  const AMPM = hours >= 0 && hours < 12 ? 'AM' : 'PM';
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${AMPM}`;
};

const createMessage = (nickname, chatMessage) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${nowDateFormatted()} - ${nickname}: ${chatMessage} `;
  messagesUl.appendChild(li);
};

socket.on('serverMessage', ({ nickname, chatMessage }) => createMessage(nickname, chatMessage));