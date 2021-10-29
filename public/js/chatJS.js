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
