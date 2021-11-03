const socket = window.io();

const sendButton = document.querySelector('.sendButton');
const nicknameSaveButton = document.querySelector('.nicknameSaveButton');
const chatMessageValue = document.querySelector('.messageInput');
const nicknameValue = document.querySelector('.nicknameInput');

const dataTestid = 'data-testid';
let nickname = '';

const createUsers = (users) => {
  const usersNicknames = Object.values(users);
  const onlineUsers = document.querySelector('.onlineUsers');
  const onlineUser = document.querySelector('.onlineUser').innerHTML;

  onlineUsers.innerHTML = '';

  usersNicknames.forEach((eachNickname) => {
    if (onlineUser !== eachNickname) {
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
};

const createNickname = () => {
  const h1 = document.createElement('h1');
  const titleDiv = document.querySelector('.titleDiv');

  h1.className = 'onlineUser';
  h1.innerText = nickname;
  h1.setAttribute(dataTestid, 'online-user');

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
  li.setAttribute(dataTestid, 'message');

  messagesUl.appendChild(li);
  return false;
};

nicknameSaveButton.addEventListener('click', () => {
  nickname = nicknameValue.value;
  nicknameValue.value = '';

  deleteLastNickname();
  createNickname();
  socket.emit('att', nickname);
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
socket.on('users', (users) => createUsers(users));

window.onload = () => {
  nickname = randomNickname(16);
  createNickname();
  socket.emit('connection', { nickname: sessionStorage.getItem('nickname') });
};
