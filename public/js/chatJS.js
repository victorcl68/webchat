const socket = window.io();

const sendMessageButton = document.querySelector('.sendMessageButton');
const nicknameSaveButton = document.querySelector('.nicknameSaveButton');
const excludeAllMessagesButton = document.querySelector('.excludeAllMessagesButton');
const messageInput = document.querySelector('.messageInput');
const nicknameInput = document.querySelector('.nicknameInput');

const dataTestid = 'data-testid';
let nickname = '';

const createUsers = (users) => {
  const usersNicknames = Object.values(users);
  const onlineUsers = document.querySelector('.onlineUsers');
  const onlineUser = document.querySelector('.onlineUser');
  const onlineUserValue = onlineUser.innerHTML;

  onlineUsers.innerHTML = '';

  usersNicknames.forEach((eachNickname) => {
    if (onlineUserValue !== eachNickname) {
      const newUser = document.createElement('li');

      newUser.innerHTML = eachNickname;
      newUser.setAttribute(dataTestid, 'online-user');

      onlineUsers.appendChild(newUser);
    }
  });
  return false;
};

const randomNickname = (length) => {
  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
  // inspiration by:
  // https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
};

const createNickname = () => {
  const h1 = document.createElement('h1');
  const titleSection = document.querySelector('.titleSection');

  h1.className = 'onlineUser';
  h1.innerText = `Usuário Atual: ${nickname}`;
  h1.setAttribute(dataTestid, 'online-user');

  sessionStorage.setItem('nickname', nickname);

  titleSection.appendChild(h1);
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
  li.setAttribute(dataTestid, 'message');

  messagesUl.appendChild(li);
  return false;
};

nicknameSaveButton.addEventListener('click', () => {
  nickname = nicknameInput.value;
  nicknameInput.value = '';

  deleteLastNickname();
  createNickname();

  socket.emit('updateNickname', nickname);

  return false;
});

sendMessageButton.addEventListener('click', () => {
  const onlineUser = sessionStorage.getItem('nickname');

  let messageInputValue = messageInput.value;
  messageInput.value = ''

  const timestamp = new Date();
  
  socket.emit('message', 
    { chatMessage: messageInputValue, nickname: onlineUser });

  socket.emit('messageInfo', 
    { message: messageInputValue, nickname: onlineUser, timestamp });
  
  messageInputValue = '';
  nicknameInput.value = '';

  return false;
});

excludeAllMessagesButton.addEventListener('click', () => {
  socket.emit('excludeAllMessages')
  window.location.reload()

  return false;
});

socket.on('message', (message) => createMessage(message));
socket.on('users', (users) => createUsers(users));
socket.on('excludeAllMessages', () => {window.location.reload()});

window.onload = () => {
  nickname = randomNickname(16);
  createNickname();

  socket.emit('connection', { nickname });
};
