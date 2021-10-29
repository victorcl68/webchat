const socket = window.io();

const sendButton = document.querySelector('.sendButton');
const nicknameSaveButton = document.querySelector('.nicknameSaveButton');
const chatMessageValue = document.querySelector('.messageInput');
const nicknameValue = document.querySelector('.nicknameInput');

let nickname = '';

const randomNickname = (length) => {
  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const createNickname = () => {
  const h1 = document.createElement('h1');
  const titleDiv = document.querySelector('.titleDiv');

  h1.setAttribute('data-testid', 'online-user');
  h1.className = 'onlineUser';
  h1.innerText = nickname;

  sessionStorage.setItem('nickname', nickname);

  titleDiv.appendChild(h1);
  return false;
};

const deleteLastNickname = () => {
  const onlineUser = document.querySelector('.onlineUser');
  onlineUser.remove();
  return false;
};

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');

  li.innerText = message;
  li.setAttribute('data-testid', 'message');

  messagesUl.appendChild(li);
  return false;
};

nicknameSaveButton.addEventListener('click', () => {
  nickname = nicknameValue.value;
  nicknameValue.value = '';

  deleteLastNickname();
  createNickname();
  return false;
});

sendButton.addEventListener('click', () => {
  const onlineUser = sessionStorage.getItem('nickname');
  const timestamp = new Date();
  
  socket.emit('message', 
    { chatMessage: chatMessageValue.value, nickname: onlineUser });

  socket.emit('messageInfo', 
    { message: chatMessageValue.value, nickname: onlineUser, timestamp });
  
  chatMessageValue.value = '';
  nicknameValue.value = '';
  return false;
});

socket.on('message', (message) => createMessage(message));

window.onload = () => {
  nickname = randomNickname(16);
  createNickname();
};
